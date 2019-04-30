import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AxisContainer from '../axis/axis-container';
import './navbar.css';
import PowerMapChooser from './power-map-chooser';

const createPowerMapToggle = true;
const findPowerMapToggle = true;

class Navbar extends Component {
  renderAxis = powerMapID => {
    return <AxisContainer />;
  };

  createPowerMap = () => {
    return <Link to='/power-map'>Create a new power map</Link>;
  };

  render() {
    return (
      <>
        <h1>Power Mapping Tool</h1>

        {findPowerMapToggle ? <PowerMapChooser /> : null}

        {createPowerMapToggle ? this.createPowerMap() : null}
      </>
    );
  }
}

export default Navbar;
