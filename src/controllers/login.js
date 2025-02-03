const bcrypt = require("bcrypt");

const User = require('../models/user');

exports.postLogin = (req, res, next) => {
    const { email, password } = req.body;

    console.log('User to be authenticated: ', email, password);

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                console.log('User not found');
                return res.redirect('/login');
            }

            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    console.log('User authenticated');
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

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.clearCookie("connect.sid");
        res.redirect('/login');
    });
}

exports.getIndex = (req, res, next) => {
    
};