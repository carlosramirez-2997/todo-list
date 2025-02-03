exports.getIndex = (req, res, next) => {
    res.redirect("/login");
};

exports.postLogin = (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);
    console.log(email, password);
};

exports.getLogin = (req, res, next) => {
    res.render('./includes/login', {
        pageTitle: 'Login',
        path: '/home'
    });
}