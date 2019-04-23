import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Axis from "../axis/axis";
import AxisContainer from "../axis/axis-container";
import AxisDrawer from "../axis/component/axis-drawer"
import "./navbar.css"


class Navbar extends Component {

    renderAxis = () => {

        return <AxisDrawer/>

    }


    render() {
        return(
            <Router>
                <h1>Power Mapping Tool</h1>

                <div>
                    <h2>Enter power map ID</h2>
                    <input type={"text"}/>
                    <button>Open</button>
                </div>

                <Link to="/power-map">Create a new power map</Link>

                <Route path="/power-map/:id" />

            </Router>
        );
    }



}

export default Navbar;
