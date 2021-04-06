require('dotenv').config();
const express = require('express');
const router = new express.Router();

const models = require('../../models');
const User = models.User;
const Role = models.Role;
const Op = models.Sequelize.Op;

const {
    checkAuthenticated,
    checkNotAuthenticated,
} = require('../checkAuthenticated');

const { mailer } = require('../mailer');
const bcrypt = require('bcrypt');
const passport = require('passport');

const crypto = require('crypto');

router.route('/users/login').get(checkAuthenticated, (req, res) => {
    res.render('login');
});

router.route('/users/register').get(checkAuthenticated, (req, res) => {
    res.render('register');
});

router.route('/users/dashboard').get(checkNotAuthenticated, (req, res) => {
    res.render('dashboard', { user: req.user.firstname });
});

router.route('/users/logout').get((req, res) => {
    req.logOut();
    req.flash('success_msg', 'You have logged out');
    res.redirect('/users/login');
});

router.route('/users/register').post(async (req, res) => {
    const {
        username,
        firstname,
        lastname,
        email,
        password,
        password2,
    } = req.body;

    console.log({
        username,
        firstname,
        lastname,
        email,
        password,
        password2,
    });

    const errors = [];

    if (
        !username ||
        !firstname ||
        !lastname ||
        !email ||
        !password ||
        !password2
    ) {
        errors.push({ message: 'Please enter all fields.' });
    }
    if (password.length < 6) {
        errors.push({ message: 'Password should be al least 6 characters.' });
    }

    if (password != password2) {
        errors.push({ message: 'Passwords do not match.' });
    }

    if (username.length < 6) {
        errors.push({ message: 'Username should be al least 8 characters.' });
    }

    if (errors.length > 0) {
        res.render('register', { errors });
    } else {
        // For validation has passed
        const hashadPassword = await bcrypt.hash(password, 10);
        console.log(hashadPassword);
        console.log(username);
        console.log(email);

        const role = await Role.findOne({ where: { rolename: 'user' } });
        console.log(role.id);

        const [user, created] = await User.findOrCreate({
            attributes: ['email', 'username'],
            where: {
                [Op.or]: [{ username: username }, { email: email }],
            },
            defaults: {
                username: username,
                email: email,
                firstname: firstname,
                lastname: lastname,
                password: hashadPassword,
                roleid: role.id,
            },
        });
        if (created) {
            req.flash('success_msg', 'You are now registered. Please log in');
            res.redirect('/users/login');
        } else {
            if (user[0].username == username) {
                errors.push({ message: 'Username already registerd' });
                res.render('register', { errors });
            } else {
                errors.push({ message: 'Email already registerd' });
                res.render('register', { errors });
            }
        }
    }
});

router.route('/users/login').post(
    passport.authenticate('local', {
        successRedirect: '/users/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true,
    })
);

router.route('/users/forgot').get((req, res) => {
    res.render('forgot');
});
// https://www.youtube.com/watch?v=UV9FvlTySGg&t=273s
// http://sahatyalkabov.com/how-to-implement-password-reset-in-nodejs/
router.route('/users/forgot').post(async (req, res) => {
    const { email } = req.body;
    console.log(email);

    User.findOne({ where: { email: email } }).then((user) => {
        if (!user) {
            req.flash('error', "Email account doesn't found");
        } else {
            req.flash(
                'success_msg',
                'An email will be sent to reset your password'
            );
            const buf = crypto.randomBytes(20);
            const token = buf.toString('hex');
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour time expire
            user.save();
            const text =
                'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' +
                req.headers.host +
                '/users/reset/' +
                token +
                '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n';
            mailer('Reset Password', text, email).then((info) => {
                console.log('Mail sended');
            });
        }
        return res.redirect('/users/forgot');
    });
});

router.route('/users/reset/:token').get((req, res) => {
    console.log(req.params.token);
    console.log(Date.now() + 3600000);
    console.log(Date.now());
    User.findOne({
        where: {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { [Op.gt]: Date.now() },
        },
    })
        .then((user) => {
            if (!user) {
                req.flash(
                    'error',
                    'Password reset token is invalid or has expired.'
                );
                return res.redirect('/users/forgot');
            }
            res.render('reset', {
                user: req.user,
            });
        })
        .catch((err) => {
            console.log('Some error: ' + err);
        });
});

router.route('/users/reset/:token').post(async (req, res) => {
    const user = await User.findOne({
        where: {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { [Op.gt]: Date.now() },
        },
    });
    if (!user) {
        req.flash('error', 'Password reset token is invalid or has expired.');
        return res.redirect('/users/forgot');
    }
    const { password, password2 } = req.body;

    console.log({
        password,
        password2,
    });

    const errors = [];

    if (!password || !password2) {
        errors.push({ message: 'Please enter all fields.' });
    }

    if (password.length < 6) {
        errors.push({
            message: 'Password should be al least 6 characters.',
        });
    }

    if (password != password2) {
        errors.push({ message: 'Passwords do not match.' });
    }

    if (errors.length > 0) {
        res.render('reset', { errors });
    } else {
        // For validation has passed
        const hashadPassword = await bcrypt.hash(password, 10);
        console.log(hashadPassword);
        user.password = hashadPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        user.save();
        req.flash('success_msg', 'Success! Your password has been changed.');
        res.redirect('/users/login');
    }
});

module.exports = router;
