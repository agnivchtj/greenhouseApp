import React from 'react';
import axios from 'axios';

export default class AddProduction extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeNumPlants = this.onChangeNumPlants.bind(this);
        this.onChangeWeight = this.onChangeWeight.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            name: '', 
            harvest_date: 0, 
            num_plants: 0, 
            weight: 0
        };
    }

    componentDidMount() {
        this.setState({
            name: '',
            harvest_date: 1591907330000,
            num_plants: 0, 
            weight: 0
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeDate(e) {
        this.setState({
            harvest_date: e.target.value
        });
    }

    onChangeNumPlants(e) {
        this.setState({
            num_plants: e.target.value
        });
    }

    onChangeWeight(e) {
        this.setState({
            weight: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const entry = {
            name: this.state.name, 
            harvest_date: this.state.harvest_date, 
            num_plants: this.state.num_plants, 
            weight: this.state.weight
        }

        console.log(entry);
        axios.post('http://localhost:5000/api/production/add', entry)
            .then(res => console.log(res.data));

        window.location = '/production';
    }

    render() {
        return (
            <div>
                <h3>Create New Production Data Entry</h3>

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
                        <label>Harvest Date: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.harvest_date}
                                onChange={this.onChangeDate}
                        />
                    </div>

                    <div className="form-group">
                        <label>Number of Plants: </label>
                        <input 
                            type="text" required
                            className="form-control"
                            value={this.state.num_plants}
                            onChange={this.onChangeNumPlants}
                        />
                    </div>

                    <div className="form-group">
                        <label>Weight (in ton): </label>
                        <input 
                                type="text" required
                                className="form-control"
                                value={this.state.weight}
                                onChange={this.onChangeWeight}
                        />
                    </div>

                    <div className="form-group">
                        <input 
                                type="submit" 
                                value="Create Production Data Entry" 
                                className="btn btn-primary" 
                        />
                    </div>
                </form>
            </div>
        );
    }
}
