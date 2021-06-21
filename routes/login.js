const loginController = require("../controllers/login");

const express = require("express");
const Router = express.Router();

Router.use(`/enter`, loginController.login);
Router.use(`/logout`, (req, res, next) => {
    req.session.destroy((err) => {
        // res.clearCookie('connect.sid'); // may not need... tests seem to pass without it
        console.log(`\n\nSuccessfully Logged Out\n\n`);
        res.redirect("/");
      });
});
Router.use(`/`, loginController.getLoginPage);


exports.Router = Router;