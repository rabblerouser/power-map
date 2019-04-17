import React, {Component} from 'react';
import app from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyAa8XjoRk5HQR7BvWrtRNDm1SGTRv5D0OY",
    authDomain: "power-mapping-tool.firebaseapp.com",
    databaseURL: "https://power-mapping-tool.firebaseio.com/",
    projectId: "power-mapping-tool",
    storageBucket: "gs://power-mapping-tool.appspot.com",
    messagingSenderId: "428137662094",
};

class FireStore {

    constructor() {
        app.initializeApp(config);

        this.db = app.database();
    }

    powerMaps = () => this.db.ref('power-map-1000');



}

export default FireStore;


