
import React from 'react';

const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase.store}  />}
    </FirebaseContext.Consumer>
);

export const withFirebaseUpdateHooks = Component => props => (
  <FirebaseContext.Consumer>
    {value => <Component {...props} firebase={value.store} onDeleteObject={value.onDeleteObject} onSaveObject={value.onSaveObject} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;