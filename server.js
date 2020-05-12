const express = require('express');
const bodyParser = require("body-parser");

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to RentVroom Car Booking Web!!"});
});

// app.use(express.static('public'))

app.listen(process.env.PORT || 8080, () => console.log("ALL OK!!!"))