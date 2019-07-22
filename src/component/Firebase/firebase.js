import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "power-mapping-tool.firebaseapp.com",
    databaseURL: "https://power-mapping-tool.firebaseio.com/",
    projectId: "power-mapping-tool",
    storageBucket: "gs://power-mapping-tool.appspot.com",
    messagingSenderId: "428137662094",
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.db = app.database();
    this.auth = app.auth();
  }

  database = () => {
    return this.db;
  }

  signInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

}

export default Firebase;
