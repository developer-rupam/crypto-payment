/* Import dependencies */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

/* initializing vconstant variables */
const app = express();
const PORT = process.env.PORT || 9009;
const BASEURL = process.env.BASEURL;


app.get('/',(req, res) => {
    res.send('Hello World')
})


/* Setting up port for runing the server */
app.listen(PORT, () => {
    console.log(`Server Started at ${BASEURL}${PORT}`)
})