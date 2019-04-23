import React, {Component} from 'react';

import  { withFirebase } from '../component/Firebase';
import Axis from "./axis";

class AxisContainer extends Component {

    render() {

        return (
            <Axis firebase={this.props.firebase} powerMapID={"1000"}/>
        );


    }

}

export default withFirebase(AxisContainer);
