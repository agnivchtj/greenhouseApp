import mongoose from 'mongoose';

const soilSchema = mongoose.Schema({
    time: Number,
    sensorId: String,
    data: {
        moisture: Number,
        pH: Number
    }
}, { versionKey: false });

const Soil = mongoose.model('Soil', soilSchema, 'soil');

export default Soil;