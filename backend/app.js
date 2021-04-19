const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Environment = require('./models/environment');
const Soil = require('./models/soil');

const app = express();
const DATABASE_URL = 'mongodb://localhost:27017/greenhouse_db';
const PORT = process.env.PORT || 3000;

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to database'));


// Routes
const router = express.Router();

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
app.post('/api/environment', async (req, res) => {
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
app.patch('/api/environment/:environment_id', async (req, res) => {
    try {
        const updated_EnvEntry = await Environment.updateOne(
            { _id: req.params.environment_id }, 
            {
                $set: { 
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
app.post('/api/soil', async (req, res) => {
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
app.patch('/api/soil/:soil_id', async (req, res) => {
    try {
        const updated_SoilEntry = await Soil.updateOne(
            { _id: req.params.soil_id }, 
            {
                $set: { 
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



// Listen
app.listen(PORT, () => console.log('Server started!'));