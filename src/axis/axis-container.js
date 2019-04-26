import React from 'react';
import  { withFirebase } from '../component/Firebase';
import Axis from "./axis";

const AxisContainer = ({ firebase, powerMapID }) => (
  <Axis firebase={firebase} powerMapID={powerMapID} />
);

export default withFirebase(AxisContainer);
