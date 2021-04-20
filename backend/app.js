const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const Environment = require('./models/environment');
const Soil = require('./models/soil');
const Tomato = require('./models/tomato');
const Production = require('./models/production');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to database'));


// Routes
const router = express.Router();

app.use(cors());
app.use('/api', router);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('Yes this works!');
    res.json({ message: 'Homepage' });
});




// CRUD: Environment data
// Getting all data
app.get('/api/environment', async (req, res) => {
    try {
        const environmentData = await Environment.find();
        console.log(environmentData);
        res.status(200).json(environmentData);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Creating a new data entry
app.post('/api/environment/add', async (req, res) => {
    const body = req.body;
    const newEntry = new Environment({
        time: body.time, 
        sensorId: body.sensorId, 
        data: {
            light_intensity: body.data.light_intensity, 
            relative_humidity: body.data.relative_humidity, 
            temperature: body.data.temperature
        }
    });
    console.log(newEntry);

    try {
        await newEntry.save();
        res.status(200).json(newEntry);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Getting entry by id
app.get('/api/environment/:environment_id', async (req, res) => {
    try {
        const environmentEntry = await Environment.findOne({ _id: req.params.environment_id });
        console.log(environmentEntry);
        res.status(200).json(environmentEntry);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Updating entry by id
app.patch('/api/environment/add/:environment_id', async (req, res) => {
    try {
        const updated_EnvEntry = await Environment.updateOne(
            { _id: req.params.environment_id }, 
            {
                $set: {
                    time: req.body.time, 
                    sensorId: req.body.sensorId,   
                    data: {
                        light_intensity: req.body.data.light_intensity, 
                        relative_humidity: req.body.data.relative_humidity, 
                        temperature: req.body.data.temperature
                    }
                }
            }
        );

        console.log(updated_EnvEntry);
        res.status(200).json(updated_EnvEntry);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Removing entry by id
app.delete('/api/environment/:environment_id', async (req, res) => {
    try {
        const removed_EnvEntry = await Environment.remove({ _id: req.params.environment_id });

        console.log(removed_EnvEntry);
        res.status(200).json(removed_EnvEntry);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Getting entries by date
app.get('/api/environment/time/:date', async (req, res) => {
    try {
        const environmentEntries = await Environment.find({ time: req.params.date });
        console.log(environmentEntries);
        res.status(200).json(environmentEntries);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Getting entries by sensor
app.get('/api/environment/sensorId/:sensor_id', async (req, res) => {
    try {
        const environmentEntries = await Environment.find({ sensorId: req.params.sensor_id });
        console.log(environmentEntries);
        res.status(200).json(environmentEntries);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});







// CRUD: Soil
// Getting all data
app.get('/api/soil', async (req, res) => {
    try {
        const soilData = await Soil.find();
        console.log(soilData);
        res.status(200).json(soilData);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Creating a new data entry
app.post('/api/soil/add', async (req, res) => {
    const body = req.body;
    const newEntry = new Soil({
        time: body.time, 
        sensorId: body.sensorId, 
        data: {
            moisture: body.data.moisture, 
            pH: body.data.pH
        }
    });
    console.log(newEntry);

    try {
        await newEntry.save();
        res.status(200).json(newEntry);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Getting entry by id
app.get('/api/soil/:soil_id', async (req, res) => {
    try {
        const soilEntry = await Soil.findOne({ _id: req.params.soil_id });
        console.log(soilEntry);
        res.status(200).json(soilEntry);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Updating entry by id
app.patch('/api/soil/add/:soil_id', async (req, res) => {
    try {
        const updated_SoilEntry = await Soil.updateOne(
            { _id: req.params.soil_id }, 
            {
                $set: {
                    time: req.body.time, 
                    sensorId: req.body.sensorId,  
                    data: {
                        moisture: req.body.data.moisture, 
                        pH: req.body.data.pH
                    }
                }
            }
        );

        console.log(updated_SoilEntry);
        res.status(200).json(updated_SoilEntry);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Removing entry by id
app.delete('/api/soil/:soil_id', async (req, res) => {
    try {
        const removed_SoilEntry = await Soil.remove({ _id: req.params.soil_id });

        console.log(removed_SoilEntry);
        res.status(200).json(removed_SoilEntry);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Getting entries by date
app.get('/api/soil/time/:date', async (req, res) => {
    try {
        const soilEntries = await Soil.find({ time: req.params.date });
        console.log(soilEntries);
        res.status(200).json(soilEntries);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Getting entries by sensor
app.get('/api/soil/sensorId/:sensor_id', async (req, res) => {
    try {
        const soilEntries = await Soil.find({ sensorId: req.params.sensor_id });
        console.log(soilEntries);
        res.status(200).json(soilEntries);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});






// CRUD: Tomatoes data
// Getting all data
app.get('/api/tomatoes', async (req, res) => {
    try {
        const tomatoData = await Tomato.find();
        console.log(tomatoData);
        res.status(200).json(tomatoData);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Creating a new data entry
app.post('/api/tomatoes/add', async (req, res) => {
    const body = req.body;
    const newEntry = new Tomato({
        name: body.name, 
        harvest_per_year: body.harvest_per_year, 
        num_plants: body.num_plants, 
        env_condition: {
            light_intensity: {
                low: body.env_condition.light_intensity.low, 
                high: body.env_condition.light_intensity.high, 
                unit: body.env_condition.light_intensity.unit
            }, 
            relative_humidity: {
                low: body.env_condition.relative_humidity.low, 
                high: body.env_condition.relative_humidity.high, 
                unit: body.env_condition.relative_humidity.unit
            }, 
            temperature: {
                daytime: {
                    low: body.env_condition.temperature.daytime.low, 
                    high: body.env_condition.temperature.daytime.high, 
                    unit: body.env_condition.temperature.daytime.unit
                }, 
                nighttime: {
                    low: body.env_condition.temperature.nighttime.low, 
                    high: body.env_condition.temperature.nighttime.high, 
                    unit: body.env_condition.temperature.nighttime.unit
                }
            }
        }, 
        soil_condition: {
            moisture: {
                low: body.soil_condition.moisture.low, 
                high: body.soil_condition.moisture.high, 
                unit: body.soil_condition.moisture.unit
            }, 
            pH: {
                low: body.soil_condition.pH.low, 
                high: body.soil_condition.pH.high, 
                unit: body.soil_condition.pH.unit
            }
        }
    });
    console.log(newEntry);

    try {
        await newEntry.save();
        res.status(200).json(newEntry);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Getting entry by id
app.get('/api/tomatoes/:tomato_id', async (req, res) => {
    try {
        const tomato = await Tomato.findOne({ _id: req.params.tomato_id });
        console.log(tomato);
        res.status(200).json(tomato);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Updating entry by id
app.patch('/api/tomatoes/add/:tomato_id', async (req, res) => {
    try {
        const updated_tomato = await Tomato.updateOne(
            { _id: req.params.tomato_id }, 
            {
                $set: {
                    name: req.body.name, 
                    harvest_per_year: req.body.harvest_per_year, 
                    num_plants: req.body.num_plants, 
                    env_condition: {
                        light_intensity: {
                            low: req.body.env_condition.light_intensity.low, 
                            high: req.body.env_condition.light_intensity.high, 
                            unit: req.body.env_condition.light_intensity.unit
                        }, 
                        relative_humidity: {
                            low: req.body.env_condition.relative_humidity.low, 
                            high: req.body.env_condition.relative_humidity.high, 
                            unit: req.body.env_condition.relative_humidity.unit
                        }, 
                        temperature: {
                            daytime: {
                                low: req.body.env_condition.temperature.daytime.low, 
                                high: req.body.env_condition.temperature.daytime.high, 
                                unit: req.body.env_condition.temperature.daytime.unit
                            }, 
                            nighttime: {
                                low: req.body.env_condition.temperature.nighttime.low, 
                                high: req.body.env_condition.temperature.nighttime.high, 
                                unit: req.body.env_condition.temperature.nighttime.unit
                            }
                        }
                    }, 
                    soil_condition: {
                        moisture: {
                            low: req.body.soil_condition.moisture.low, 
                            high: req.body.soil_condition.moisture.high, 
                            unit: req.body.soil_condition.moisture.unit
                        }, 
                        pH: {
                            low: req.body.soil_condition.pH.low, 
                            high: req.body.soil_condition.pH.high, 
                            unit: req.body.soil_condition.pH.unit
                        }
                    }
                }
            }
        );

        console.log(updated_tomato);
        res.status(200).json(updated_tomato);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Removing entry by id
app.delete('/api/tomatoes/:tomato_id', async (req, res) => {
    try {
        const removed_tomato = await Tomato.remove({ _id: req.params.tomato_id });

        console.log(removed_tomato);
        res.status(200).json(removed_tomato);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});







// CRUD: Production
// Getting all data
app.get('/api/production', async (req, res) => {
    try {
        const productionData = await Production.find();
        console.log(productionData);
        res.status(200).json(productionData);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Creating a new data entry
app.post('/api/production/add', async (req, res) => {
    const body = req.body;
    const newEntry = new Production({
        name: body.name, 
        harvest_date: body.harvest_date, 
        num_plants: body.num_plants, 
        weight: body.weight
    });
    console.log(newEntry);

    try {
        await newEntry.save();
        res.status(200).json(newEntry);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Getting entry by id
app.get('/api/production/:tomato_id', async (req, res) => {
    try {
        const productionEntry = await Production.findOne({ _id: req.params.tomato_id });
        console.log(productionEntry);
        res.status(200).json(productionEntry);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Updating entry by id
app.patch('/api/production/add/:tomato_id', async (req, res) => {
    try {
        const updated_prodEntry = await Production.updateOne(
            { _id: req.params.tomato_id }, 
            {
                $set: {
                    name: req.body.name, 
                    harvest_date: req.body.harvest_date, 
                    num_plants: req.body.num_plants,  
                    weight: req.body.weight
                }
            }
        );

        console.log(updated_prodEntry);
        res.status(200).json(updated_prodEntry);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Removing entry by id
app.delete('/api/production/:tomato_id', async (req, res) => {
    try {
        const removed_prodEntry = await Production.remove({ _id: req.params.tomato_id });

        console.log(removed_prodEntry);
        res.status(200).json(removed_prodEntry);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});



// Listen
app.listen(PORT, () => console.log('Server started!'));