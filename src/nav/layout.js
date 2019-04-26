import React from 'react';
import AxisHeaderContainer from './axis-header-container';
import AxisContainer from '../axis/axis-container';

const defaultPowerMapID = "1000";

const Layout = () => (
  <div className='axis-container'>
    <AxisHeaderContainer powerMapID={defaultPowerMapID} />
    
    <AxisContainer powerMapID={defaultPowerMapID} />
  </div>
);

export default Layout;
