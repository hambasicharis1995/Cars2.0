const getDB = require("../util/database").getDB;

module.exports = class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    };

    static userExists = (email) => {
        const db = getDB();
        return db.collection("users").findOne({ email: email });
    };

    createUser = () => {
        const db = getDB();
        return db.collection("users").insertOne(this);
    };

    save = () => {
        const db = getDB();
        db.collection("users").insertOne(this);
    };
};
