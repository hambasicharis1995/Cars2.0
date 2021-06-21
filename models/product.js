const fs = require("fs");
const mongodb = require("mongodb");
const path = require("path");

const getDB = require("../util/database").getDB;

module.exports = class Product {
    constructor(productName, countryOfOrigin, yearFounded, description, image, video, price, id) {
        this.name = productName;
        this.countryOfOrigin = countryOfOrigin;
        this.yearFounded = yearFounded;
        this.description = description;
        this.vehicleImage = image;
        this.link = video;
        this.price = price;
        this.id = id;
    };

    static getProductName = (id) => {
        const db = getDB();
        return db.collection("Menards").find({ _id: new mongodb.ObjectID(id) }).toArray()
            .then(car => {
                return car[0];
            });
    };

    static saveProduct = (productToSave) => {
        const db = getDB();
        db.collection("Menards").insertOne(productToSave);
    };

    static getProducts = () => {
        const db = getDB(); 
        let numberItemsPerPage = 2;
        return db.collection("Menards")
            .find({})
            // .skip((9 - 1) * numberItemsPerPage) // where the literal 6 is the page you want to be on and the expression is 6-1 b/c you're skipping the first 6-1 pages which is the first 5 pages and landing on the 6th page
            // .limit(2)
            .toArray();
    };

    static getProduct = (id) => {
        const db = getDB();
        return db.collection("Menards").find({ _id: new mongodb.ObjectID(id) }).toArray();
            // .then(cars => {
            //     return cars; // if you return from a then(), you return a Promise object itself
            // });
            // when you return from a promise handler then() method, you're returning another Promise object that needs to be handled with the then() method itself as well
    };

    static updateProduct = (newProductName, productID) => {
        let products = fs.readFileSync(path.join(__dirname, "../", "data", "products.txt"));
        products = JSON.parse(products);
        const productIndex = products.findIndex(product => product.id == productID);
        products[productIndex] = {
            productName: newProductName,
            id: productID
        };
        fs.writeFileSync(path.join(__dirname, "../", "data", "products.txt"), JSON.stringify(products));
    };

    static deleteProduct = (productID) => {
        const db = getDB();
        productID = productID.slice(1);
        db.collection(`Menards`).deleteOne({ _id: new mongodb.ObjectID(productID) });
    };
};
