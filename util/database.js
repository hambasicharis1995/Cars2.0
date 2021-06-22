const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = () => {
        MongoClient.connect("mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.jth3e.mongodb.net/Products?retryWrites=true&w=majority")
            .then(client => {
                console.log("Connected!");
                _db = client.db("Products"); // here you specify the exact database, which in this case is "Products"
            })
            .catch(err => {
                console.log(err);
            });
};

const getDB = () => {
    if (_db) {
        return _db;
    } else {
        throw `\n\nThere is no connection to the database...\n\n`;
    };
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
