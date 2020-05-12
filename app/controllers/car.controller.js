const Car = require('../models/car.model');

// Create and Save a new car
// exports.create = (req, res) => {
//     // Validate request
//     if(!req.body.content) {
//         return res.status(400).send({
//             message: "Car details can not be empty"
//         });
//     }

//     // Add a Car
//     const car = new Car({
//         model: req.body.model,
//         // name: req.body.name,
//         // color: req.body.color,
//         // seater: req.body.seater,
//         // rent: req.body.rent,
//         // booked: req.body.booked,
//         // vehicle_number: req.body.vehicle_number,
//         // fuel_type: req.body.fuel_type,
//         // about: req.body.about,
//         // description: req.body.description,
//         // booking_details: req.body.booking_details
//     });

//     // Save Car in the database
//     car.save()
//     .then(data => {
//         res.send(data);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while adding the Car."
//         });
//     });
// };

// Add a new car
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

// Retrieve and return all cars from the database. {Seach by model supported}

exports.findAll = (req, res) => {

    if (req) {
        const model = req.query.model;
        var condition = model ? { model: { $regex: new RegExp(model), $options: "i" } } : {};

    }
    Car.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving cars."
            });
        });
};
// exports.findAll = (req, res) => {
//     Car.find()
//         .then(cars => {
//             res.send(cars);
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving list of cars."
//             });
//         });

// };

// Find a single car with a carId
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

// Update a car identified by the carId in the request
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

// exports.searchBy = (req, res) => {
//     Car.find(req.params)
//         .then(data => {
//             console.log(req.params)
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving cars."
//             });
//         });
// };