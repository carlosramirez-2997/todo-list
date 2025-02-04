const bcrypt = require("bcrypt");

const User = require('../models/user');

exports.postLogin = (req, res, next) => {
    const { email, password } = req.body;

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                console.log('User not found');
                return res.redirect('/login');
            }

            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    console.log('User authenticated: ', email);
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    return req.session.save(err => {
                        res.redirect('/tasks');
                    });
                }
                console.log('Incorrect password');
                res.redirect('/login');
            });
        });
};

exports.getLogin = (req, res, next) => {
    res.render('./includes/login', {
        pageTitle: 'Login',
        path: '/home'
    });
}

exports.postSignUp = (req, res, next) => {
    const { email, password } = req.body;
    console.log(email);
    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                console.log("found!");
                req.flash(
                    'error',
                    'E-Mail exists already, please pick a different one.'
                );
                return res.redirect('/signup');
            }
            return bcrypt
                .hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                    email: email,
                    password: hashedPassword
                    });
                    return user.save();
                })
                .then(result => {
                    res.redirect('/login');
                })
                .catch(err => {
                    console.log(err);
                }
            );
        })
        .catch(err => {
            console.log(err);
        }
    );
};

exports.getSignUp = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }

    res.render('./includes/signup', {
        pageTitle: 'SignUp',
        path: '/signup',
        errorMessage: message
    });
};

exports.getLogout = (req, res, next) => {
    req.session.destroy((err) => {
        if (!err) {
            res.clearCookie('connect.sid');
        }
        res.redirect('/login');
    });
}

exports.getAbout = (req, res, next) => {
    res.render('./includes/about', {
        pageTitle: 'About',
        path: '/about'
    });
}

exports.getIndex = (req, res, next) => {
    res.redirect('/login');
};