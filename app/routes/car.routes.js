module.exports = (app) => {
    const cars = require('../controllers/car.controller');
    const express = require('express')
    const router = new express.Router()

    // Add a new car
    app.post('/cars', cars.create);

    // Retrieve all cars by params
    app.get('/cars', cars.findAll);

    // Retrieve a single car with carId
    app.get('/cars/:carId', cars.findOne);

    // Update a car with carId
    app.put('/cars/:carId', cars.update);

    // Delete a car with carId
    app.delete('/cars/:carId', cars.delete);

    // Delete all cars
    app.delete("/cars", cars.deleteAll);

    app.get('/car-details', cars.getDetails);

    // router.get("/cars/search", cars.searchBy);
}