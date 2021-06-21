const path = require("path");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const Product = require("../models/product");

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: "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"
    }
}));

const getDB = require("../util/database").getDB;

exports.setCSRFToken = (req, res) => {
    // const csurfToken = req.headers["cookie"].split(";")[1].split("=")[1];
    // res.send({token: csurfToken});
    res.send({ token: req.csrfToken() });
};

exports.addProductsPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../", "views", "add-products.html"));
};

exports.productAddedConfirmation = (req, res) => {
    const name = req.body.name;
    const countryOfOrigin = req.body.countryOfOrigin;
    const yearFounded = req.body.yearFounded;
    const price = req.body.price;
    const description = req.body.description;
    const _image_Path = req.file.path; // this represents the image path in your program --> uploads/whatever...

    const video = req.body.video;
    const product = new Product(name, countryOfOrigin, yearFounded, description, _image_Path, video, price, Math.random())
    Product.saveProduct(product);
    res.redirect(`/haris/shop`);
};

exports.shopPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../", "views", "shop.html")); // this is OK because there are not more res commands after res.sendFile()
    // return transporter.sendMail({
    //     to: "harishambasic.isu@gmail.com",
    //     from: "harishambasic.isu@gmail.com",
    //     subject: "Login to your account detected",
    //     html: "<h1>You successfully signed in! Thanks much!</h1>"
    // });
};

exports.getProducts = (req, res) => {
    Product.getProducts()
        .then(prods => {
            req.session.h ? console.log(req.session.h) : console.log(`Cookie in session does NOT exist`);
            res.send(prods);
        });
};

exports.detailsPage = (req, res) => {
    Product.getProductName(req.params.id)
        .then(car => {
            res.send(`Successfully in products page. The name of the product with the ID of <i>${car._id}</i> is <b>${car.name}</b>.`);
        });
};

exports.editPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../", "views", "edit.html"));
};

exports.getProduct = (req, res) => {
    const id = req.params.id;
    Product.getProduct(id)
        .then(data => {
            // let cookieValue = req.get('Cookie').split(`;`);
            // cookieValue = cookieValue.map(cookie => {
            //     const p = cookie.split("=");
            //     const p1 = p[0];
            //     const p2 = p[1];
            //     return [
            //         p1,
            //         p2
            //     ];
            // });
            // console.log(`Hola`, cookieValue);
            req.session.h = "hambasic"; // the session is initialized in server.js but it not "created" until you actually use it
            res.send(data); //res.send() from within the then()
        });
};

exports.updateProducts = (req, res) => {
    const newProductName = req.body.productName;
    const productID = req.body.id;
    Product.updateProduct(newProductName, productID);
    res.redirect("/haris/shop");
};

exports.deleteProduct = (req, res) => {
    Product.deleteProduct(req.params.id);
    res.redirect(`/haris/shop`);
};

exports.learnMore = (req, res) => {
    res.sendFile(path.join(__dirname, `../`, `views`, `learn-more.html`));
};
