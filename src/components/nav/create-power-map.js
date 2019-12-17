import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import './create-power-map.css';

const CreatePowerMap = ({ compressHeader, firebase, history }) => {
  const [showForm, setShowForm] = useState(false);
  const [newPowerMapId, setNewPowerMapId] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const showInputForm = () => {
    setShowForm(true);
    setNewPowerMapId("");
    setNewPassword("");
  };

  const submitCreatePowerMap = () => {
    setShowForm(false);
    compressHeader();

    firebase
      .database()
      .ref(`power-map-${newPowerMapId}`)
      .set({
        id: newPowerMapId,
        password: Boolean(newPassword) ? newPassword : null
      });

    history.push({
      pathname: `/power-map/${newPowerMapId}`,
      search: '',
      hash: ''
    });
  };

  if (!showForm) {
    return (
      <button id='showForm' type='button' onClick={() => showInputForm()}>
        Create New Power Map
      </button>
    );
  }

  return (
    <div>
      <h2>Create New Power Map</h2>
      <div className='input'> 
        <div>
          <label>Power Map ID</label>
          <input
            type='text'
            id='newPowerMapId'
            value={newPowerMapId}
            onChange={e => setNewPowerMapId(e.target.value)}
          />
          </div>
          <div>
          <label>Password (optional)</label>
          <input
            type='password'
            id='password'
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          /> 
        </div>         
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
