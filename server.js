require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';

import passport from 'passport';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express();
const PORT = process.env.PORT || 8080;

import db from './models';

require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(session({
    key: 'user_sid',
    secret: 'jsdoiOUUU81YIWIshshhuual801llakdk2',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require("./controllers/html-routes")(app, passport);
require("./controllers/account-controller")(app, passport);
require("./controllers/item-controller")(app, passport);
require("./controllers/search-controller")(app, passport);
require("./controllers/transactions-controller")(app, passport);


db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("Listening on localhost:" + PORT);
    })
});