require('dotenv').config;
const express = require('express');
const app = express();
const { pool } = require('./dbConfig');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const logger = require('morgan');

const initializePassport = require('./passportConfig');
// eslint-disable-next-line max-len
const {
    checkAuthenticated,
    checkNotAuthenticated,
} = require('./checkAuthenticated');

initializePassport(passport);

const PORT = process.env.PORT || 4000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());
//app.use(logger('dev'));

app.use(flash());

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/users/register', checkAuthenticated, (req, res) => {
    res.render('register');
});

app.get('/users/login', checkAuthenticated, (req, res) => {
    res.render('login');
});

app.get('/users/dashboard', checkNotAuthenticated, (req, res) => {
    res.render('dashboard', { user: req.user.firstname });
});

app.get('/users/logout', (req, res) => {
    req.logOut();
    req.flash('success_msg', 'You have logged out');
    res.redirect('/users/login');
});

app.post('/users/register', async (req, res) => {
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
        console.log(email);

        pool.query(
            // eslint-disable-next-line max-len
            `SELECT username, email FROM users WHERE email = $1 OR username= $2`,
            [email, username],
            (err, results) => {
                if (err) {
                    console.log(err.message);
                    console.log(pool);
                    throw err;
                }
                console.log('result ' + results.rows);
                if (results.rows.length > 0) {
                    if (results.rows.email == email) {
                        errors.push({ message: 'Email already registerd' });
                        res.render('register', { errors });
                    } else {
                        errors.push({ message: 'Username already registerd' });
                        res.render('register', { errors });
                    }
                } else {
                    pool.query(
                        // eslint-disable-next-line max-len
                        `INSERT INTO users (username, firstname, lastname, email, password,0)
                        VALUES ($1, $2, $3, $4, $5) 
                        RETURNING id, password`,
                        [username, firstname, lastname, email, hashadPassword],
                        (err, results) => {
                            if (err) {
                                throw err;
                            }
                            console.log(results.rows);
                            // eslint-disable-next-line max-len
                            req.flash(
                                'success_msg',
                                'You are now registered. Please log in'
                            );
                            res.redirect('/users/login');
                        }
                    );
                }
            }
        );
    }
});

app.post(
    '/users/login',
    passport.authenticate('local', {
        successRedirect: '/users/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true,
    })
);

if (!module.parent) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
module.exports = app;
