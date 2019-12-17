import React, { Component } from 'react';
import PowerMapChooser from './power-map-chooser';
import CreatePowerMapContainer from './create-power-map-container';
import './navbar.css';

const createPowerMapToggle = true;
const findPowerMapToggle = true;

class Navbar extends Component {
  render() {
    return (
      <>
        <h1>Power Mapping Tool</h1>

        {findPowerMapToggle ? <PowerMapChooser compressHeader={this.props.compressHeader}/> : null}

        {createPowerMapToggle ? <CreatePowerMapContainer compressHeader={this.props.compressHeader}/> : null}
      </>
    );
  }
}

export default Navbar;
