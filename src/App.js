import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';

import environmentDisplay from './components/environment/environmentDisplay';
import AddEnvironment from './components/environment/AddEnvironment';
import EditEnvironment from './components/environment/EditEnvironment';

import soilDisplay from './components/soil/soilDisplay';
import AddSoil from './components/soil/AddSoil';
import EditSoil from './components/soil/EditSoil';

import tomatoDisplay from './components/tomatoes/tomatoDisplay';
import AddTomato from './components/tomatoes/AddTomato';
import EditTomato from './components/tomatoes/EditTomato';

import productionDisplay from './components/production/productionDisplay';
import AddProduction from './components/production/AddProduction';
import EditProduction from './components/production/EditProduction';


function App() {
  return (
    <Router>
      <div className="container">
        <NavBar/>
        <br/>
        <Route path="/" exact component={environmentDisplay} />
        <Route path="/environment" component={environmentDisplay} />
        <Route path="/add_environment" component={AddEnvironment} />
        <Route path="/edit_environment/:id" component={EditEnvironment} />
        <Route path="/soil" component={soilDisplay} />
        <Route path="/add_soil" component={AddSoil} />
        <Route path="/edit_soil/:id" component={EditSoil} />
        <Route path="/tomatoes" component={tomatoDisplay} />
        <Route path="/add_tomatoes" component={AddTomato} />
        <Route path="/edit_tomatoes/:id" component={EditTomato} />
        <Route path="/production" component={productionDisplay} />
        <Route path="/add_production" component={AddProduction} />
        <Route path="/edit_production/:id" component={EditProduction} />
      </div>
    </Router>
  );
}

export default App;
