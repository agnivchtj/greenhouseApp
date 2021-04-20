import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EnvironmentEntry = (props) => (
    <tr>
        <td>{props.env_entry.time}</td>
        <td>{props.env_entry.sensorId}</td>
        <td>{ (props.env_entry.data && props.env_entry.data.light_intensity) ? props.env_entry.data.light_intensity : 'n/a' }</td>
        <td>{ (props.env_entry.data && props.env_entry.data.relative_humidity) ? props.env_entry.data.relative_humidity : 'n/a' }</td>
        <td>{ (props.env_entry.data && props.env_entry.data.temperature) ? props.env_entry.data.temperature : 'n/a' }</td>
        <td>
            <Link to={"/edit_environment/" + props.env_entry._id}>Update</Link>
            | <a href="#" onClick={() => { props.removeEnvEntry(props.env_entry._id) }}>Remove</a>
        </td>
    </tr>
)

export default class environmentDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.removeEnvironment = this.removeEnvironment.bind(this);

        this.state = {
            environment: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/environment')
            .then(res => {
                this.setState({
                    environment: res.data
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    removeEnvironment(id) {
        axios.delete('http://localhost:5000/api/environment/' + id)
            .then(res => console.log(res.data));
        this.setState({
            environment: this.state.environment.filter(e => e._id !== id)
        });
    }

    environmentList() {
        return this.state.environment.map(entry => {
            return (
                <EnvironmentEntry env_entry={entry} removeEnvEntry={this.removeEnvironment} key={entry._id} />
            );
        });
    }

    render() {
        return (
            <div>
                <h1>Environment Data</h1>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Time</th>
                            <th>Sensor ID</th>
                            <th>Light intensity</th>
                            <th>Rel. humidity</th>
                            <th>Temperature</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.environmentList() }
                    </tbody>
                </table>
            </div>
        );
    }
}