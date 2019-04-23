import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Axis from "../axis/axis";
import AxisContainer from "../axis/axis-container";
import AxisDrawer from "../axis/component/axis-drawer"
import "./navbar.css"

const createPowerMapToggle = false;
const findPowerMapToggle = false;

class Navbar extends Component {

    renderAxis = () => {

        return <AxisDrawer/>

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

                {findPowerMapToggle ? this.findPowerMap : null}

                {createPowerMapToggle ? this.createPowerMap : null}

                <Route path="/power-map/:id" />

            </Router>
        );
    }



}

export default Navbar;
