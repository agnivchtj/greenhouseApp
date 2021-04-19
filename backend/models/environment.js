// import mongoose from 'mongoose';

const mongoose = require('mongoose');

const environmentSchema = mongoose.Schema({
    time: Number,
    sensorId: String,
    data: {
        light_intensity: Number,
        relative_humidity: Number,
        temperature: Number
    }
}, { versionKey: false });

module.exports = mongoose.model('Environment', environmentSchema, 'environment');

// export default Environment;