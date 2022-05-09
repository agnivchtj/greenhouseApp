import React from 'react';
import axios from 'axios';

export default class AddTomato extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeYearlyHarvest = this.onChangeYearlyHarvest.bind(this);
        this.onChangeNumPlants = this.onChangeNumPlants.bind(this);
        this.onChangeLightIntensity_LOW = this.onChangeLightIntensity_LOW.bind(this);
        this.onChangeLightIntensity_HIGH = this.onChangeLightIntensity_HIGH.bind(this);
        this.onChangeRelativeHumidity_LOW = this.onChangeRelativeHumidity_LOW.bind(this);
        this.onChangeRelativeHumidity_HIGH = this.onChangeRelativeHumidity_HIGH.bind(this);
        this.onChangeDaytimeTemp_LOW = this.onChangeDaytimeTemp_LOW.bind(this);
        this.onChangeDaytimeTemp_HIGH = this.onChangeDaytimeTemp_HIGH.bind(this);
        this.onChangeNightTemp_LOW = this.onChangeNightTemp_LOW.bind(this);
        this.onChangeNightTemp_HIGH = this.onChangeNightTemp_HIGH.bind(this);
        this.onChangeMoisture_LOW = this.onChangeMoisture_LOW.bind(this);
        this.onChangeMoisture_HIGH = this.onChangeMoisture_HIGH.bind(this);
        this.onChange_pH_LOW = this.onChange_pH_LOW.bind(this);
        this.onChange_pH_HIGH = this.onChange_pH_HIGH.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            name: '', 
            harvest_per_year: 0, 
            num_plants: 0, 
            env_condition: {
                light_intensity: {
                    low: 0, high: 0, unit: 'lx'
                }, 
                relative_humidity: {
                    low: 0, high: 0, unit: '%'
                }, 
                temperature: {
                    daytime: {
                        low: 0, high: 0, unit: 'degree'
                    }, 
                    nighttime: {
                        low: 0, high: 0, unit: 'degree'
                    }
                }
            }, 
            soil_condition: {
                moisture: {
                    low: 0, high: 0, unit: '%'
                }, 
                pH: {
                    low: 0, high: 0, unit: 'pH'
                }
            }
        };
    }

    componentDidMount() {
        this.setState({
            name: '',
            harvest_per_year: 0,
            num_plants: 0, 
            env_condition: {
                light_intensity: {
                    low: 0, high: 0, unit: 'lx'
                }, 
                relative_humidity: {
                    low: 0, high: 0, unit: '%'
                }, 
                temperature: {
                    daytime: {
                        low: 0, high: 0, unit: 'degree'
                    }, 
                    nighttime: {
                        low: 0, high: 0, unit: 'degree'
                    }
                }
            }, 
            soil_condition: {
                moisture: {
                    low: 0, high: 0, unit: '%'
                }, 
                pH: {
                    low: 0, high: 0, unit: 'pH'
                }
            }
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeYearlyHarvest(e) {
        this.setState({
            harvest_per_year: e.target.value
        });
    }

    onChangeNumPlants(e) {
        this.setState({
            num_plants: e.target.value
        });
    }

    onChangeLightIntensity_LOW(e) {
        this.setState({
            env_condition: {
                ...this.state.env_condition, 
                light_intensity: {...this.state.env_condition.light_intensity, low: e.target.value}
            }
        });
    }

    onChangeLightIntensity_HIGH(e) {
        this.setState({
            env_condition: {
                ...this.state.env_condition, 
                light_intensity: {...this.state.env_condition.light_intensity, high: e.target.value}
            }
        });
    }

    onChangeRelativeHumidity_LOW(e) {
        this.setState({
            env_condition: {
                ...this.state.env_condition, 
                relative_humidity: {...this.state.env_condition.relative_humidity, low: e.target.value}
            }
        });
    }

    onChangeRelativeHumidity_HIGH(e) {
        this.setState({
            env_condition: {
                ...this.state.env_condition, 
                relative_humidity: {...this.state.env_condition.relative_humidity, high: e.target.value}
            }
        });
    }

    onChangeDaytimeTemp_LOW(e) {
        this.setState({
                env_condition: {
                    ...this.state.env_condition, 
                    temperature: {
                        ...this.state.env_condition.temperature, 
                        daytime: {
                            ...this.state.env_condition.temperature.daytime, low: e.target.value
                        }
                    }
                }
        });
    }

    onChangeDaytimeTemp_HIGH(e) {
        this.setState({
            env_condition: {
                ...this.state.env_condition, 
                temperature: {
                    ...this.state.env_condition.temperature, 
                    daytime: {
                        ...this.state.env_condition.temperature.daytime, high: e.target.value
                    }
                }
            }
        });
    }

    onChangeNightTemp_LOW(e) {
        this.setState({
                env_condition: {
                    ...this.state.env_condition, 
                    temperature: {
                        ...this.state.env_condition.temperature, 
                        nighttime: {
                            ...this.state.env_condition.temperature.nighttime, low: e.target.value
                        }
                    }
                }
        });
    }

    onChangeNightTemp_HIGH(e) {
        this.setState({
            env_condition: {
                ...this.state.env_condition, 
                temperature: {
                    ...this.state.env_condition.temperature, 
                    nighttime: {
                        ...this.state.env_condition.temperature.nighttime, high: e.target.value
                    }
                }
            }
        });
    }

    onChangeMoisture_LOW(e) {
        this.setState({
            soil_condition: {
                ...this.state.soil_condition, 
                moisture: {...this.state.soil_condition.moisture, low: e.target.value}
            }
        });
    }

    onChangeMoisture_HIGH(e) {
        this.setState({
            soil_condition: {
                ...this.state.soil_condition, 
                moisture: {...this.state.soil_condition.moisture, high: e.target.value}
            }
        });
    }

    onChange_pH_LOW(e) {
        this.setState({
            soil_condition: {
                ...this.state.soil_condition, 
                pH: {...this.state.soil_condition.pH, low: e.target.value}
            }
        });
    }

    onChange_pH_HIGH(e) {
        this.setState({
            soil_condition: {
                ...this.state.soil_condition, 
                pH: {...this.state.soil_condition.pH, high: e.target.value}
            }
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const entry = {
            name: this.state.name, 
            harvest_per_year: this.state.harvest_per_year, 
            num_plants: this.state.num_plants,
            env_condition: {...this.state.env_condition}, 
            soil_condition: {...this.state.soil_condition}
        }

        console.log(entry);
        axios.post('http://localhost:5000/api/tomatoes/add', entry)
            .then(res => console.log(res.data));

        window.location = '/tomatoes';
    }

    render() {
        return (
            <div>
                <h3>Create New Tomato Entry</h3>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeName}
                        />
                    </div>

                    <div className="form-group"> 
                        <label>Harvest per year: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.harvest_per_year}
                                onChange={this.onChangeYearlyHarvest}
                        />
                    </div>

                    <div className="form-group">
                        <label>Num. of Plants: </label>
                        <input 
                            type="text" required
                            className="form-control"
                            value={this.state.num_plants}
                            onChange={this.onChangeNumPlants}
                        />
                    </div>

                    <div className="form-group">
                        <label>Light Intensity: </label>
                        <input 
                                type="text" required
                                placeholder="Low..."
                                className="form-control"
                                value={this.state.env_condition.light_intensity.low}
                                onChange={this.onChangeLightIntensity_LOW}
                        />
                        <input 
                                type="text" required
                                placeholder="High..."
                                className="form-control"
                                value={this.state.env_condition.light_intensity.high}
                                onChange={this.onChangeLightIntensity_HIGH}
                        />
                    </div>

                    <div className="form-group">
                        <label>Rel. Humidity: </label>
                        <input 
                                type="text" required
                                placeholder="Low..."
                                className="form-control"
                                value={this.state.env_condition.relative_humidity.low}
                                onChange={this.onChangeRelativeHumidity_LOW}
                        />
                        <input 
                                type="text" required
                                placeholder="High..."
                                className="form-control"
                                value={this.state.env_condition.relative_humidity.high}
                                onChange={this.onChangeRelativeHumidity_HIGH}
                        />
                    </div>

                    <div className="form-group">
                        <label>Daytime Temp.: </label>
                        <input 
                                type="text" required
                                placeholder="Low..."
                                className="form-control"
                                value={this.state.env_condition.temperature.daytime.low}
                                onChange={this.onChangeDaytimeTemp_LOW}
                        />
                        <input 
                                type="text" required
                                placeholder="High..."
                                className="form-control"
                                value={this.state.env_condition.temperature.daytime.high}
                                onChange={this.onChangeDaytimeTemp_HIGH}
                        />
                    </div>

                    <div className="form-group">
                        <label>Nighttime Temp.: </label>
                        <input 
                                type="text" required
                                placeholder="Low..."
                                className="form-control"
                                value={this.state.env_condition.temperature.nighttime.low}
                                onChange={this.onChangeNightTemp_LOW}
                        />
                        <input 
                                type="text" required
                                placeholder="High..."
                                className="form-control"
                                value={this.state.env_condition.temperature.nighttime.high}
                                onChange={this.onChangeNightTemp_HIGH}
                        />
                    </div>

                    <div className="form-group">
                        <label>Moisture: </label>
                        <input 
                                type="text" required
                                placeholder="Low..."
                                className="form-control"
                                value={this.state.soil_condition.moisture.low}
                                onChange={this.onChangeMoisture_LOW}
                        />
                        <input 
                                type="text" required
                                placeholder="High..."
                                className="form-control"
                                value={this.state.soil_condition.moisture.high}
                                onChange={this.onChangeMoisture_HIGH}
                        />
                    </div>

                    <div className="form-group">
                        <label>pH: </label>
                        <input 
                                type="text" required
                                placeholder="Low..."
                                className="form-control"
                                value={this.state.soil_condition.pH.low}
                                onChange={this.onChange_pH_LOW}
                        />
                        <input 
                                type="text" required
                                placeholder="High..."
                                className="form-control"
                                value={this.state.soil_condition.pH.high}
                                onChange={this.onChange_pH_HIGH}
                        />
                    </div>

                    <div className="form-group">
                        <input 
                                type="submit" 
                                value="Create Tomato Entry" 
                                className="btn btn-primary" 
                        />
                    </div>
                </form>
            </div>
        );
    }
}
