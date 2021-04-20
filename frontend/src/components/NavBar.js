import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <div className="navbar-brand">Greenhouse App</div>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/environment" className="nav-link">Environment</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/add_environment" className="nav-link">Add Environment</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/soil" className="nav-link">Soil</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/add_soil" className="nav-link">Add Soil</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/tomatoes" className="nav-link">Tomatoes</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/add_tomatoes" className="nav-link">Add Tomatoes</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/production" className="nav-link">Production</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/add_production" className="nav-link">Add Production</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
