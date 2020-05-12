const Car = require('../models/car.model');


// 1. Add a new car
exports.create = (req, res) => {
    // Validate request

    if (!req.body.model || !req.body.name || !req.body.color || !req.body.seater || !req.body.rent || !req.body.vehicle_number || !req.body.fuel_type || !req.body.about || !req.body.description) {
        res.status(400).send({ message: "Car Details can not be empty!" });
        return;
    }

    // Adding a car
    const car = new Car({
        model: req.body.model,
        name: req.body.name,
        color: req.body.color,
        seater: req.body.seater,
        rent: req.body.rent,
        booked: req.body.booked == true ? true : false,
        vehicle_number: req.body.vehicle_number,
        fuel_type: req.body.fuel_type,
        about: req.body.about,
        description: req.body.description
    });

    // Save Car in the database
    car.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while saving the Car."
            });
        });
};



// 2. Retrieve and return all cars from the database.
exports.findAll = (req, res) => {

    Car.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving cars."
            });
        });
};



// 3. Find a single car with a carId
exports.findOne = (req, res) => {
    Car.findById(req.params.carId)
        .then(car => {
            if (!car) {
                return res.status(404).send({
                    message: "Car not found with id " + req.params.carId
                });
            }
            res.send(car);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Car not found with id " + req.params.carId
                });
            }
            return res.status(500).send({
                message: "Error retrieving car with id " + req.params.carId
            });
        });
};


// 4. Update a car identified by the carId in the request
exports.update = (req, res) => {

    // Find car and update it with the request body
    Car.findByIdAndUpdate(req.params.carId, {
        model: req.body.model,
        name: req.body.name,
        color: req.body.color,
        seater: req.body.seater,
        rent: req.body.rent,
        booked: req.body.booked == true ? true : false,
        vehicle_number: req.body.vehicle_number,
        fuel_type: req.body.fuel_type,
        about: req.body.about,
        description: req.body.description
    }, { new: true, useFindAndModify: false})
        .then(car => {
            if (!car) {
                return res.status(404).send({
                    message: "Car not found with id " + req.params.carId
                });
            }
            res.send(car);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Car not found with id " + req.params.carId
                });
            }
            return res.status(500).send({
                message: "Error updating car with id " + req.params.carId
            });
        });
};


// 5. Delete one car by ID
exports.delete = (req, res) => {
    const id = req.params.carId;

    Car.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Car with id=${id}. Maybe Car was not found!`
                });
            } else {
                res.send({
                    message: "Car was deleted successfully!"
                });
            }
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Car not found with id " + req.params.carId
                });
            }
            return res.status(500).send({
                message: "Could not delete car with id " + req.params.carId
            });
        });
};


// 6. Delete all cars in database
exports.deleteAll = (req, res) => {
    Car.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Cars were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all cars."
            });
        });
};


// 7. Get Car details by model 
exports.getDetails = (req, res) => {
    if (req) {
        const model = req.query.model;
        var condition = model ? { model: { $regex: new RegExp(model), $options: "i" } } : {};

    }
    Car.find(condition)
        .then(data => {
            res.send(data[0]);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving cars."
            });
        });
};