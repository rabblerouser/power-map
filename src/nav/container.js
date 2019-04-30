import React from 'react';
import AxisHeaderContainer from './axis-header-container';
import AxisContainer from '../axis/axis-container';

const defaultPowerMapID = "1000";

const Container = ({ match }) => {
  const powerMapID = match.params.id || defaultPowerMapID;

  return (
    <div className='axis-container'>
      <AxisHeaderContainer powerMapID={powerMapID} />

      <AxisContainer powerMapID={powerMapID} />
    </div>
  );
};

export default Container;
