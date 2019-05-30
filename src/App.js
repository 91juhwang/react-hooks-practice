import React from 'react';
import  { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min.js';
import './App.css';

import About from './pages/about';
import Home from './pages/home';
import NavBar from './components/NavBar'

function App() {
  return (
    <Router>
      <NavBar/>
      <div className="container">
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
      </div>
    </Router>
  );
}

export default App;
