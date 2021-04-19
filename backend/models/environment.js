import mongoose from 'mongoose';

const environmentSchema = mongoose.Schema({
    time: Number,
    sensorId: String,
    data: {
        light_intensity: Number,
        relative_humidity: Number,
        temperature: Number
    }
}, { versionKey: false });

const Environment = mongoose.model('Environment', environmentSchema, 'environment');

export default Environment;