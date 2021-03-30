require('dotenv').config;
const express = require('express');
const app = express();
const db = require('./models/index.js');
const sequelize = db.sequelize;

// const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const logger = require('morgan');

/* changing structure */
const usersRouter = require('./controller/router/users.js');

const initializePassport = require('./config/passportConfig');

// eslint-disable-next-line max-len

initializePassport(passport);
let PORT = process.env.PORT || 4000;
if (process.env.NODE_ENV === 'production') {
    PORT = 4080;
}

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
try {
    console.log('Initializing database module');
    console.log('Env ' + process.env.NODE_ENV);
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        });
} catch (err) {
    console.error(err);
    process.exit(1); // Non-zero failure code
}
db.Role.setup()
    .then(console.log('Setting done!'))
    .catch((err) => {
        console.log('Some error in setting role table!');
    });
module.exports = app;
