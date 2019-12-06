import React, {Component} from 'react';
import Card from '../card/card';
import AxisDrawer from '../axis/axis-drawer';
import './axis.css';

class Axis extends Component {

  render() {
    const { cards } = this.props;
    return (
      <div className='axis'>
        <AxisDrawer/>

        {cards.map(child => (
          <Card
            key={child.id}
            id={child.id}
            name={child.name}
            x={child.x}
            y={child.y}
            powerMapId={this.props.powerMapId}
          />
        ))}

        <h3 className={'axis-title top-title'}>Powerful</h3>
        <h3 className={'axis-title left-title'}>Strongly Disagree</h3>
        <h3 className={'axis-title right-title'}>Strongly Agree</h3>
        <h3 className={'axis-title bottom-title'}>Less Powerful</h3>
      </div>
    );
  }
}

export default Axis;
