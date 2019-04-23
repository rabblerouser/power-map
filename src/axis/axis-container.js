import React, {Component} from 'react';

import  { withFirebase } from '../component/Firebase';
import Axis from "./axis";
import AxisHeader from "./component/axis-header"

class AxisContainer extends Component {

    render() {

        return (
          <div className="axis-container">
              <AxisHeader firebase={this.props.firebase}/>
              <Axis firebase={this.props.firebase} powerMapID={"1000"} />
          </div>
        );


    }

}

export default withFirebase(AxisContainer);
