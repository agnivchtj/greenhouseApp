import React from 'react';
import axios from 'axios';

export default class AddEnvironment extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeTime = this.onChangeTime.bind(this);
        this.onChangeSensorId = this.onChangeSensorId.bind(this);
        this.onChangeLightIntensity = this.onChangeLightIntensity.bind(this);
        this.onChangeRelativeHumidity = this.onChangeRelativeHumidity.bind(this);
        this.onChangeTemperature = this.onChangeTemperature.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            time: 0, 
            sensorId: '', 
            data: {
                light_intensity: 0, 
                relative_humidity: 0, 
                temperature: 0
            }
        };
    }

    componentDidMount() {
        this.setState({
            time: 1582303500000,
            sensorId: 'uuid0128',
            data: {
                light_intensity: 5000,
                relative_humidity: 55,
                temperature: 24.3
            }
        });
    }

    onChangeTime(e) {
        this.setState({
            time: e.target.value
        });
    }

    onChangeSensorId(e) {
        this.setState({
            sensorId: e.target.value
        });
    }

    onChangeLightIntensity(e) {
        this.setState({
            data: {...this.state.data, light_intensity: e.target.value }
        });
    }

    onChangeRelativeHumidity(e) {
        this.setState({
            data: {...this.state.data, relative_humidity: e.target.value }
        });
    }

    onChangeTemperature(e) {
        this.setState({
            data: {...this.state.data, temperature: e.target.value }
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const entry = {
            time: this.state.time, 
            sensorId: this.state.sensorId, 
            data: {...this.state.data}
        }

        console.log(entry);
        axios.post('http://localhost:5000/api/environment/add', entry)
            .then(res => console.log(res.data));

        window.location = '/environment';
    }

    render() {
        return (
            <div>
                <h3>Create New Environment Entry</h3>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Time: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.time}
                                onChange={this.onChangeTime}
                        />
                    </div>

                    <div className="form-group"> 
                        <label>Sensor ID: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.sensorId}
                                onChange={this.onChangeSensorId}
                        />
                    </div>

                    <div className="form-group">
                        <label>Light Intensity: </label>
                        <input 
                            type="text" required
                            className="form-control"
                            value={this.state.data.light_intensity}
                            onChange={this.onChangeLightIntensity}
                        />
                    </div>

                    <div className="form-group">
                        <label>Rel. Humidity: </label>
                        <input 
                                type="text" required
                                className="form-control"
                                value={this.state.data.relative_humidity}
                                onChange={this.onChangeRelativeHumidity}
                        />
                    </div>

                    <div className="form-group">
                        <label>Temperature: </label>
                        <input 
                                type="text" required
                                className="form-control"
                                value={this.state.data.temperature}
                                onChange={this.onChangeTemperature}
                        />
                    </div>

                    <div className="form-group">
                        <input 
                                type="submit" 
                                value="Create Environment Entry" 
                                className="btn btn-primary" 
                        />
                    </div>
                </form>
            </div>
        );
    }
}
