/* Import dependencies */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');

/* initializing vconstant variables */
const app = express();
const PORT = process.env.PORT || 9009;
const BASEURL = process.env.BASEURL;
const routes = require('./routes/MerchantRoute')

/* Middlewares */
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

/* Middleware for session secret  */
app.use(session({
    secret : "Sush !! it's my secret key",
    saveUninitialized : true,
    resave : false,
}));

/* Middleware for storing session message */
app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

/* setting the template engine */
app.set('view engine', 'ejs');

/* Database connection */
mongoose.connect(process.env.DB_URI,{useNewUrlParser:true}).then(() => {
    console.log('Hurray !! Database is connected ')
}).catch((error)=>{
    console.log('Oh Fuck !! Failed to connect the database due to',error)
})

/* Setting up routes */
app.use("/api",routes);

/* app.get('/',(req, res) => {
    res.send('Hello World')
}) */


/* Setting up port for runing the server */
app.listen(PORT, () => {
    console.log(`Server Started at ${BASEURL}${PORT}`)
})