import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

const PowerMapChooser = ({ history }) => {
  const [showChooser, setShowChooser] = useState(false);
  const [powerMapId, setPowerMapId] = useState('');

  const routeToPowerMap = () => {
    setShowChooser(false);

    history.push({
      pathname: `/power-map/${powerMapId}`,
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
        Change Power Map
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
          id='powerMapId'
          value={powerMapId}
          onChange={e => setPowerMapId(e.target.value)}
        />
      </div>
      <button id='openPowerMap' type='button' onClick={() => routeToPowerMap()}>
        Open Power Map
      </button>
    </div>
  );
};

export default withRouter(PowerMapChooser);
