import React from 'react';
import  { withFirebase } from '../../database/Firebase';
import Axis from "./axis";

const AxisContainer = ({ cards, firebase, powerMapId }) => (
  <Axis cards={cards} firebase={firebase} powerMapId={powerMapId} />
);

export default withFirebase(AxisContainer);
