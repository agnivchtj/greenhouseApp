const mongoose = require('mongoose');

const productionSchema = mongoose.Schema({
    name: String, 
    harvest_date: Number, 
    num_plants: Number, 
    weight: Number
}, { versionKey: false });

module.exports = mongoose.model('Production', productionSchema, 'production');