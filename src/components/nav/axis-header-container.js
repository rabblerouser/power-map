import React from 'react';
import { withFirebase } from '../../database/Firebase';
import AxisHeader from './axis-header';

const AxisHeaderContainer = ({ firebase, powerMapId }) => (
  <AxisHeader firebase={firebase} powerMapId={powerMapId} />
);

export default withFirebase(AxisHeaderContainer);
