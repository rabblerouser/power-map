import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from "./components/nav/container";
import { Route } from 'react-router-dom';


export default function App () {
    return(
        <div>
            <Router>
                <Route path='/' exact component={Container} />
                <Route path='/power-map/:id?' component={Container} />
            </Router>
    </div>
    )
}