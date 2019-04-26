import React from 'react';
import { withFirebase } from '../component/Firebase';
import AxisHeader from './axis-header';

const AxisHeaderContainer = ({ firebase, powerMapID }) => (
  <AxisHeader firebase={firebase} powerMapID={powerMapID} />
);

export default withFirebase(AxisHeaderContainer);
