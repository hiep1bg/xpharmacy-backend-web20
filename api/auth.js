const session = require('express-session');

module.exports = (app, userModel) => {
    app.use(session({
        secret: "xpharmacy",
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
}