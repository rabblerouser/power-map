import React from 'react';
import { withFirebase } from '../component/Firebase';
import CreatePowerMap from './create-power-map';

const CreatePowerMapContainer = ({ firebase }) => (
  <CreatePowerMap firebase={firebase} />
);

export default withFirebase(CreatePowerMapContainer);
