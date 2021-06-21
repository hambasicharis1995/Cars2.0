const path = require("path");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../", "views", "login.html"));
};

exports.isLoggedIn = (req, res, next) => {
    req.session.isLoggedIn ? res.redirect("/haris/shop") : next();
};

exports.login = (req, res) => {
    User.userExists(req.body.email)
        .then(user => {
            const username = req.body.username;
            const email = req.body.email;
            const password = req.body.password;
            if (user) {
                bcrypt.compare(password, user.password)
                    .then(isPasswordCorrect => { // isPasswordCorrect is a boolean representing whether the comparison returned a true for the password verification
                        // if the user has successfully logged in, you now want to create a session with that user's data
                        if (isPasswordCorrect) {
                            req.session.isLoggedIn = true;
                            req.session.save(() => {
                                console.log("logged in and redirecting...");
                                res.redirect(`/haris/shop`);
                            });
                        } else {
                            res.redirect("/");
                        };
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                bcrypt.hash(password, 12)
                    .then(hashedPassword => {
                        const newUser = new User(username, email, hashedPassword);
                        newUser.createUser();
                        console.log("created new user and redirecting...");
                        res.redirect("/login");
                    });
            };
        });
};
