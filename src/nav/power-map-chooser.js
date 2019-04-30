import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

const PowerMapChooser = ({ history }) => {
  const [showChooser, setShowChooser] = useState(false);
  const [powerMapID, setPowerMapID] = useState('');

  const routeToPowerMap = () => {
    setShowChooser(false);
    
    history.push({
      pathname: `/power-map/${powerMapID}`,
      search: '',
      hash: ''
    });
  };

  if (!showChooser) {
    return (
      <button
        id='showChooser'
        type='button'
        onClick={() => setShowChooser(true)}
      >
        Show Chooser
      </button>
    );
  }

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
      <button id='openPowerMap' type='button' onClick={() => routeToPowerMap()}>
        Open Power Map
      </button>
    </div>
  );
};

export default withRouter(PowerMapChooser);
