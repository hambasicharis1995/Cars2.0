const path = require("path");

const express = require("express");
const Router = express.Router();

const _404 = require("../controllers/404");
const getDB = require("../util/database").getDB;

// const db = getDB();

Router.use("/", (req, res,) => {

    // db.collection("Menards").find({"name":'Ferrari"'});

    res.sendFile(path.join(__dirname, "../", "views", "index.html"));
});

Router.use("*", _404.get404Page);

module.exports = Router;
