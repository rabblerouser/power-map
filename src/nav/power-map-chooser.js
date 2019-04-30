import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

const PowerMapChooser = ({ history }) => {
  const [powerMapID, setPowerMapID] = useState('');

  const routeToPowerMap = () => {
    history.push({
      pathname: `/power-map/${powerMapID}`,
      search: '',
      hash: ''
    });
  };

  return (
    <div>
      <h2>Select Power Map</h2>
      <div>
        <label>Power Map ID</label>
        <input
          type='text'
          id='powerMapID'
          value={powerMapID}
          onChange={e => setPowerMapID(e.target.value)}
        />
      </div>
      <button id='openPowerMap' onClick={() => routeToPowerMap()}>
        Open Power Map
      </button>
    </div>
  );
}

export default withRouter(PowerMapChooser);
