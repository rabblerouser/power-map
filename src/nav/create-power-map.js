import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

const CreatePowerMap = ({ firebase, history }) => {
  const [showForm, setShowForm] = useState(false);
  const [newPowerMapId, setNewPowerMapID] = useState('');

  const submitCreatePowerMap = () => {
    setShowForm(false);

    firebase
      .database()
      .ref(`power-map-${newPowerMapId}`)
      .set({
        id: newPowerMapId
      });

    history.push({
      pathname: `/power-map/${newPowerMapId}`,
      search: '',
      hash: ''
    });
  };

  if (!showForm) {
    return (
      <button id='showForm' type='button' onClick={() => setShowForm(true)}>
        Create New Power Map
      </button>
    );
  }

  return (
    <div>
      <h2>Create New Power Map</h2>
      <div>
        <label>Power Map ID</label>
        <input
          type='text'
          id='newPowerMapId'
          value={newPowerMapId}
          onChange={e => setNewPowerMapID(e.target.value)}
        />
      </div>
      <button
        id='createNewPowerMap'
        type='button'
        onClick={() => submitCreatePowerMap()}
      >
        Create Power Map
      </button>
    </div>
  );
};

export default withRouter(CreatePowerMap);
