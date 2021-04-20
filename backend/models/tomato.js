const mongoose = require('mongoose');

const tomatoSchema = mongoose.Schema({
    name: String, 
    harvest_per_year: Number, 
    num_plants: Number, 
    env_condition: {
        light_intensity: {
            low: Number, high: Number, unit: String
        }, 
        relative_humidity: {
            low: Number, high: Number, unit: String
        }, 
        temperature: {
            daytime: {
                low: Number, high: Number, unit: String
            }, 
            nighttime: {
                low: Number, high: Number, unit: String
            }
        }
    }, 
    soil_condition: {
        moisture: {
            low: Number, high: Number, unit: String
        }, 
        pH: {
            low: Number, high: Number, unit: String
        }
    }
}, { versionKey: false });

module.exports = mongoose.model('Tomato', tomatoSchema, 'tomatoes');