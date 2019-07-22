import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import PowerMapChooser from './power-map-chooser';
import CreatePowerMapContainer from './create-power-map-container';
import { authentication } from "../service/authentication";
import './navbar.css';

const createPowerMapToggle = true;
const findPowerMapToggle = true;

class Navbar extends Component {
  handleLogOutClick = () => {
    authentication.logout()
    this.props.history.push('/login')
  };

  render() {
    return (
      <>
        <h1>Power Mapping Tool</h1>

        {findPowerMapToggle ? <PowerMapChooser /> : null}

        {createPowerMapToggle ? <CreatePowerMapContainer /> : null}

        <button
          type='button'
          onClick={this.handleLogOutClick}
        >
          Log out
        </button>
      </>
    );
  }
}

export default withRouter(Navbar);
