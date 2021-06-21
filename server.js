const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const cookieParser = require('cookie-parser');
const multer = require("multer");

const productsRoutes = require("./routes/products");
const loginRoutes = require("./routes/login");
const mainRoutes = require("./routes/main");

const app = express();

const mongoConnect = require("./util/database").mongoConnect;
mongoConnect();



app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}));

const store = new MongoDBStore({
    uri: "mongodb+srv://HarisHambasic:h1h2h3h4h5@cluster0.jth3e.mongodb.net/Products?w=majority", // removed the retry writes in this URI
    collection: "sessions"
});

app.use(session({
    secret: "haris",
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use(express.static(path.join(__dirname, "public")));
app.use('/cali', express.static(path.join(__dirname, "cali")));
        // first argument just cataches the route request below

// Multer
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./cali") // which folder in your local repository to use to store the image
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname)
    }
});

const upload = multer({
    storage: fileStorageEngine
});

// added before all routes are initialized
const csrfProtection = csrf({cookie: true});
app.use(csrfProtection);
app.use((req, res, next) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
});

app.use('/haris', upload.single('vehicleImageFINAL'), productsRoutes.Router);
// vehicleImageFINAL has to match the value of the 'name' attribute in the <input /> tag which is being used to select/upload the file

app.use('/login', loginRoutes.Router);
app.use(mainRoutes);

app.listen(8080);
