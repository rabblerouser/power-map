import React from 'react';
import AxisHeaderContainer from './axis-header-container';
import AxisContainer from '../axis/axis-container';
import Firebase, {FirebaseContext} from "../component/Firebase";

const defaultPowerMapID = "1000";

const Container = ({match}) => {
  const powerMapID = match.params.id || defaultPowerMapID;
  
  const onDeleteObject = async (reference) => {
    await Firebase
      .database()
      .ref(reference)
      .remove();
  };
  
  const onSaveObject = async (reference, card) => {
    await Firebase
      .database()
      .ref(reference)
      .set(card);
  };

  return (
    <div className='axis-container'>
      <FirebaseContext.Provider value={{
        store: Firebase,
        onDeleteObject: onDeleteObject,
        onSaveObject: onSaveObject
      }}>
        <AxisHeaderContainer powerMapID={powerMapID}/>
        <AxisContainer powerMapID={powerMapID}/>
      </FirebaseContext.Provider>
    </div>
  );
};

export default Container;
