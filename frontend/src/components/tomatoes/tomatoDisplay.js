import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TomatoEntry = (props) => (
    <tr>
        <td>{props.tomato_entry.name}</td>
        <td>{props.tomato_entry.harvest_per_year}</td>
        <td>{props.tomato_entry.num_plants}</td>
        <td>{props.tomato_entry.env_condition.light_intensity.low}</td>
        <td>{props.tomato_entry.env_condition.light_intensity.high}</td>
        <td>{props.tomato_entry.env_condition.relative_humidity.low}</td>
        <td>{props.tomato_entry.env_condition.relative_humidity.high}</td>
        <td>{props.tomato_entry.env_condition.temperature.daytime.low}</td>
        <td>{props.tomato_entry.env_condition.temperature.daytime.high}</td>
        <td>{props.tomato_entry.env_condition.temperature.nighttime.low}</td>
        <td>{props.tomato_entry.env_condition.temperature.nighttime.high}</td>
        <td>{props.tomato_entry.soil_condition.moisture.low}</td>
        <td>{props.tomato_entry.soil_condition.moisture.high}</td>
        <td>{props.tomato_entry.soil_condition.pH.low}</td>
        <td>{props.tomato_entry.soil_condition.pH.high}</td>
        <td>
            <Link to={"/edit_tomatoes/" + props.tomato_entry._id}>Update</Link>
            | <a href="#" onClick={() => { props.removeTomatoEntry(props.tomato_entry._id) }}>Remove</a>
        </td>
    </tr>
)

export default class tomatoDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.removeTomatoes = this.removeTomatoes.bind(this);

        this.state = {
            tomatoes: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/tomatoes')
            .then(res => {
                this.setState({
                    tomatoes: res.data
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    removeTomatoes(id) {
        axios.delete('http://localhost:5000/api/tomatoes/' + id)
            .then(res => console.log(res.data));
        this.setState({
            tomatoes: this.state.tomatoes.filter(e => e._id !== id)
        });
    }

    tomatoList() {
        return this.state.tomatoes.map(entry => {
            return (
                <TomatoEntry tomato_entry={entry} removeTomatoEntry={this.removeTomato} key={entry._id} />
            );
        });
    }

    render() {
        return (
            <div>
                <h1>Tomato Data</h1>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Harvests (yr)</th>
                            <th>Num. plants</th>
                            <th>Light intensity (Low)</th>
                            <th>Light intensity (High)</th>
                            <th>Relative humidity (Low)</th>
                            <th>Relative humidity (High)</th>
                            <th>Daytime Temp. (Low)</th>
                            <th>Daytime Temp. (High)</th>
                            <th>Nighttime Temp. (Low)</th>
                            <th>Nighttime Temp. (High)</th>
                            <th>Moisture (Low)</th>
                            <th>Moisture (High)</th>
                            <th>pH (Low)</th>
                            <th>pH (High)</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.tomatoList() }
                    </tbody>
                </table>
            </div>
        );
    }
}
