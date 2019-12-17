import React from 'react';
import { withFirebase } from '../../database/Firebase';
import CreatePowerMap from './create-power-map';

const CreatePowerMapContainer = ({ compressHeader, firebase }) => (
  <CreatePowerMap compressHeader={compressHeader} firebase={firebase} />
);

export default withFirebase(CreatePowerMapContainer);
