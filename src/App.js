import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from "./components/nav/container";
import { Route } from 'react-router-dom';
import HomePage from "./components/home/home-page";
import Firebase, { FirebaseContext } from "./database/Firebase";


export default function App () {
    const onDeleteObject = async (reference) => {
        await Firebase
          .database()
          .ref(reference)
          .remove();
      };
    
      const onSaveObject = async (reference, object) => {
        await Firebase
          .database()
          .ref(reference)
          .set(object);
      };

    return(
        <div>
        <FirebaseContext.Provider value={{
          store: Firebase,
          onDeleteObject: onDeleteObject,
          onSaveObject: onSaveObject
        }}>
            <Router>
                <Route path='/' exact component={ HomePage } />
                <Route path='/power-map/:id?' component={Container} />
            </Router>
        </FirebaseContext.Provider>    
    </div>
    )
}