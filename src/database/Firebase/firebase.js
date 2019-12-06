import app from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "power-mapping-tool.firebaseapp.com",
    databaseURL: "https://power-mapping-tool.firebaseio.com/",
    projectId: "power-mapping-tool",
    storageBucket: "gs://power-mapping-tool.appspot.com",
    messagingSenderId: "428137662094",
};

const firebase = app.initializeApp(config);

export default firebase;


