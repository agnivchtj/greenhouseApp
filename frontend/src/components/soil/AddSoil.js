import React from 'react';
import axios from 'axios';

export default class AddSoil extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeTime = this.onChangeTime.bind(this);
        this.onChangeSensorId = this.onChangeSensorId.bind(this);
        this.onChangeMoisture = this.onChangeMoisture.bind(this);
        this.onChange_pH = this.onChange_pH.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            time: 0, 
            sensorId: '', 
            data: {
                moisture: 0, 
                pH: 0
            }
        };
    }

    componentDidMount() {
        this.setState({
            time: 1591907330000,
            sensorId: 'uuid0100',
            data: {
                moisture: 0,
                pH: 0
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

    onChangeMoisture(e) {
        this.setState({
            data: {...this.state.data, moisture: e.target.value }
        });
    }

    onChange_pH(e) {
        this.setState({
            data: {...this.state.data, pH: e.target.value }
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
        axios.post('http://localhost:5000/api/soil/add', entry)
            .then(res => console.log(res.data));
        
        window.location = '/soil';
    }

    render() {
        return (
            <div>
                <h3>Create New Soil Entry</h3>

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
                        <label>Moisture: </label>
                        <input 
                            type="text" required
                            className="form-control"
                            value={this.state.data.moisture}
                            onChange={this.onChangeMoisture}
                        />
                    </div>

                    <div className="form-group">
                        <label>pH: </label>
                        <input 
                                type="text" required
                                className="form-control"
                                value={this.state.data.pH}
                                onChange={this.onChange_pH}
                        />
                    </div>

                    <div className="form-group">
                        <input 
                                type="submit" 
                                value="Create Soil Entry" 
                                className="btn btn-primary" 
                        />
                    </div>
                </form>
            </div>
        );
    }
}
