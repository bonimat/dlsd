const LocalStrategy = require('passport-local').Strategy;
const { pool } = require('./dbConfig');
const bcrypt = require('bcrypt');
const models = require('../models');
const User = models.User;

// eslint-disable-next-line require-jsdoc
function initialize(passport) {
    const autenticateUser = (email, password, done) => {
        /* pool.query(
            `SELECT * FROM users WHERE email = $1`,
            [email],
            (err, results) => {
                if (err) {
                    throw err;
                }

                console.log(results.rows);

                if (results.rows.length > 0) {
                    const user = results.rows[0];

                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) {
                            throw err;
                        }

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, {
                                message: 'Password is not correct.',
                            });
                        }
                    });
                } else {
                    return done(null, false, {
                        message: 'Email is not registered.',
                    });
                }
            }
        );*/
        User.findOne({ where: { email } }).then((user) => {
            if (user) {
                console.log('user.pass: ' + user.password);
                console.log('pass: ' + password);
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        throw err;
                    }
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {
                            message: 'Password is not correct.',
                        });
                    }
                });
            } else {
                return done(null, false, {
                    message: 'Email is not registered.',
                });
            }
        });

        passport.serializeUser((user, done) => done(null, user.id));
        passport.deserializeUser((id, done) => {
            pool.query(
                `SELECT * FROM users WHERE id = $1`,
                [id],
                (err, results) => {
                    if (err) {
                        throw err;
                    }
                    return done(null, results.rows[0]);
                }
            );
        });
    };

    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
            },
            autenticateUser
        )
    );
}

module.exports = initialize;
