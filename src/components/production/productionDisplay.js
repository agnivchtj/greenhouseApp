import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductionEntry = (props) => (
    <tr>
        <td>{props.prod_entry.name}</td>
        <td>{props.prod_entry.harvest_date}</td>
        <td>{props.prod_entry.num_plants }</td>
        <td>{props.prod_entry.weight}</td>
        <td>
            <Link to={"/edit_production/" + props.prod_entry._id}>Update</Link>
            | <a href="#" onClick={() => { props.removeProdEntry(props.prod_entry._id) }}>Remove</a>
        </td>
    </tr>
)

export default class productionDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.removeProduction = this.removeProduction.bind(this);

        this.state = {
            production: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/production')
            .then(res => {
                this.setState({
                    production: res.data
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    removeProduction(id) {
        axios.delete('http://localhost:5000/api/production/' + id)
            .then(res => console.log(res.data));
        this.setState({
            production: this.state.production.filter(e => e._id !== id)
        });
    }

    productionList() {
        return this.state.production.map(entry => {
            return (
                <ProductionEntry prod_entry={entry} removeProdEntry={this.removeProduction} key={entry._id} />
            );
        });
    }

    render() {
        return (
            <div>
                <h1>Production Data</h1>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Harvest Date</th>
                            <th>Num. of Plants</th>
                            <th>Weight (ton)</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.productionList() }
                    </tbody>
                </table>
            </div>
        );
    }
}
