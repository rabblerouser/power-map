import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AxisContainer from "../axis/axis-container";
import "./navbar.css"

const createPowerMapToggle = false;
const findPowerMapToggle = false;

class Navbar extends Component {

    renderAxis = (powerMapID) => {

        return <AxisContainer />

    }

    findPowerMap = () => {
        return(
          <div>
              <h2>Enter power map ID</h2>
              <input type={"text"}/>
              <button>Open</button>
          </div>
        );
    }

    createPowerMap = () => {
      return <Link to="/power-map">Create a new power map</Link>;
    }

    render() {
        return(
            <Router>
                <h1>Power Mapping Tool</h1>

                {findPowerMapToggle ? this.findPowerMap() : null}

                {createPowerMapToggle ? this.createPowerMap() : null}

                <Route path="/power-map" />

            </Router>
        );
    }



}

export default Navbar;
