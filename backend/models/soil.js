// import mongoose from 'mongoose';

const mongoose = require('mongoose');

const soilSchema = mongoose.Schema({
    time: Number,
    sensorId: String,
    data: {
        moisture: Number,
        pH: Number
    }
}, { versionKey: false });

module.exports = mongoose.model('Soil', soilSchema, 'soil');

// export default Soil;