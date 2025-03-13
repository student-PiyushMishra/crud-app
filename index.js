const express = require('express');
const ejs = require('ejs');
const path = require('path');
const router = require('./router')
require('dotenv').config()


const app = express();

const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));

app.use(router)

app.listen(PORT, (err) => {
    if (err) console.error(err)
    else console.log(`Server is up and running on PORT: ${PORT}`)
})