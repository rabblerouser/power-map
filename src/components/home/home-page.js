import React from 'react';
import {withFirebaseUpdateHooks} from "../../database/Firebase/context";
import PowerMapChooser from '../power-map-chooser/power-map-chooser';
import CreatePowerMapContainer from '../create-power-map/create-power-map-container';
import './home-page.css';

function HomePage() {
    return (
        <div className="home-page">

        <h1>Power Mapping Tool</h1>
        <div className="home-body">
        <PowerMapChooser />

        <CreatePowerMapContainer /> 
        </div>

       
    </div>
    );
}

export default withFirebaseUpdateHooks(HomePage);
