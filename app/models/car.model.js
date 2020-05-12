const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
    model: String,
    name: String,
    color: String,
    seater: String,
    rent: Number,
    booked: Boolean,
    vehicle_number: String,
    fuel_type: String,
    about: String,
    description: String,
    booking_details: Object
}, {
    timestamps: true
});

module.exports = mongoose.model('Car', CarSchema);