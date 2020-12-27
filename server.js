require('dotenv').config;
const express = require('express');
const app = express();
// const { pool } = require('./dbConfig');
// const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const logger = require('morgan');

/* changing structure */
const usersRouter = require('./router/users.js');

const initializePassport = require('./passportConfig');
// eslint-disable-next-line max-len

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
app.use(logger('dev'));

app.use(flash());

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/', usersRouter);

if (!module.parent) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
module.exports = app;
