require('dotenv').config();

const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URL;
const express = require('express');

// creating the app
const app = express();
const port = 5000;

// using cors
const cors = require('cors')
app.use(cors())


// connecting with the database
mongoose
    .connect(mongoURI)
    .then(() => {
    console.log('Connected to MongoDB');
    })
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    });

app.use(express.json())

//defining the route for the page.
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);   
});

