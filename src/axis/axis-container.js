import React from 'react';
import  { withFirebase } from '../component/Firebase';
import Axis from "./axis";

const AxisContainer = ({ cards, firebase, powerMapID }) => (
  <Axis cards={cards} firebase={firebase} powerMapID={powerMapID} />
);

export default withFirebase(AxisContainer);
