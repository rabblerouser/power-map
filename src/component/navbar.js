import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Axis from "../axis/axis";
import AxisContainer from "../axis/axis-container";
import "./navbar.css"


class Navbar extends Component {

    renderAxis = (powerMapID) => {

        return <AxisContainer />

    }


    render() {
        return(
            <Router>
                <div className={"navbar"}>
                    <h1>Power Mapping Tool</h1>

                    <div>
                        <h2>Enter power map ID</h2>
                        <input type={"text"}/>
                        <button>Open</button>
                    </div>

                    <Link to="/power-map">Create a new power map</Link>

                    <Route path="/power-map" component={this.renderAxis}/>


                </div>
            </Router>
        );
    }



}

export default Navbar;
