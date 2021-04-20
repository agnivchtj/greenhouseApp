import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SoilEntry = (props) => (
    <tr>
        <td>{props.soil_entry.time}</td>
        <td>{props.soil_entry.sensorId}</td>
        <td>{ (props.soil_entry.data && props.soil_entry.data.moisture) ? props.soil_entry.data.moisture : 'n/a' }</td>
        <td>{ (props.soil_entry.data && props.soil_entry.data.pH) ? props.soil_entry.data.pH : 'n/a' }</td>
        <td>
            <Link to={"/edit_soil/" + props.soil_entry._id}>Update</Link>
            | <a href="#" onClick={() => { props.removeSoilEntry(props.soil_entry._id) }}>Remove</a>
        </td>
    </tr>
)

export default class soilDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.removeSoil = this.removeSoil.bind(this);

        this.state = {
            soil: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/soil')
            .then(res => {
                this.setState({
                    soil: res.data
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    removeSoil(id) {
        axios.delete('http://localhost:5000/api/soil/' + id)
            .then(res => console.log(res.data));
        this.setState({
            soil: this.state.soil.filter(e => e._id !== id)
        });
    }

    soilList() {
        return this.state.soil.map(entry => {
            return (
                <SoilEntry soil_entry={entry} removeSoilEntry={this.removeSoil} key={entry._id} />
            );
        });
    }

    render() {
        return (
            <div>
                <h1>Soil Data</h1>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Time</th>
                            <th>Sensor ID</th>
                            <th>Moisture</th>
                            <th>pH</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.soilList() }
                    </tbody>
                </table>
            </div>
        );
    }
}
