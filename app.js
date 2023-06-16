var express = require('express');
var path = require('path');
var app = express();
//const {insert ,update} =  require('./src/Product/ProductController');
var bodyParser = require("body-parser");
const mongoose = require('mongoose');
const productModel = require('./src/Product/ProductModel');
const { MongoClient } = require('mongodb');
const indexRouter = require("./routes/index");
const session = require('express-session');
const productAPIRouter = require("./routes/api/ProductAPI");
const productCpanelRouter = require("./routes/cpanel/ProductCpanel");
const loginCpanel = require('./routes/cpanel/Login')
const registerCpanel = require('./routes/cpanel/Register')
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
//khai bao thong tin cua session
app.use(session({
    secret: 'iloveyou',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));
//http://localhost:3000/api/product
app.use('/api/product', productAPIRouter);
//http://localhost:3000/cpanel/product
app.use('/cpanel/product', productCpanelRouter);
//http://localhost:3000/login
app.use('/login', loginCpanel)
//http://localhost:3000/register
app.use('/register', registerCpanel)

//http://localhost:3000/
app.use('/', indexRouter);

async function connectDB() {
    const uri = "mongodb+srv://sa:m4maQWq9JpOX375a@cluster0.zldi7nh.mongodb.net/CP17307?retryWrites=true&w=majority";
    try {
        // const client = new MongoClient(uri);
        // await client.connect(); 
        mongoose.set('strictQuery', false);
        await mongoose.connect(uri);
        console.log("LUM LUA!");
    } catch (e) {
        console.error(e);
    }
}
connectDB();
app.listen('3000', () => {
    console.log("http://localhost:3000/");
})