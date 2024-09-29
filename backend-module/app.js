const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const homeRoutes = require('./routes/home');
// const multerUpload = require('./middleware/multer');

const app = express();


app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST , PUT ,  PATCH ,  DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/home', homeRoutes);


mongoose.connect(
    "mongodb+srv://ayanashaat99:H6rUIq2elSKY63gs@cluster0.u4n9mhf.mongodb.net/media-platform"
).then(res => {
    app.listen(8000);
}).catch(err => {
    console.log("Database Connection Failure:\n", err);
})

