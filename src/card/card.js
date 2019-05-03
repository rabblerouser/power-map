import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { getBounds } from './positionHelpers';
import '../card/card.css';

class Card extends Component {
  constructor(props) {
    super(props);

    this.axisFixedBounds = {
      top: -500,
      right: 500
    };

    this.originalPosition = {
      x: this.props.x,
      y: this.props.y
    };

    this.state = {
      position: {
        x: 0,
        y: 0
      }
    };

    this.cardRef = React.createRef();
  }

  componentDidMount() {
    this.props.firebase
      .database()
      .ref(`power-map-${this.props.powerMapID}/cards/`)
      .on('child_changed', (snapshot, prevSnapshot) => {
        const card = snapshot.val();

        if (card['card_id'] !== this.props.id) return;

        this.originalPosition = {
          x: card['card_x_pos'],
          y: card['card_y_pos']
        };

        this.updateScaledPosition();
      });

    this.updateScaledPosition();

    window.addEventListener("resize", this.updateScaledPosition);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScaledPosition);
  }

  deleteCard = () => {
    this.props.firebase
      .database()
      .ref(`power-map-${this.props.powerMapID}/cards/${this.props.id}`)
      .remove();
  };

  updatePosition = (e, ui) => {
    const { x, y } = this.state.position;
    this.setState({
      position: {
        x: x + ui.deltaX,
        y: y + ui.deltaY
      }
    });
  };

  updateScaledPosition = () => {
    const axisScale = this.getAxisScale();
    this.setState({
      position: {
        x: this.originalPosition.x * axisScale.x,
        y: this.originalPosition.y * axisScale.y
      }
    });
  };

  savePositionToDB = () => {
    const axisScale = this.getAxisScale();
    this.props.firebase
      .database()
      .ref(`power-map-${this.props.powerMapID}/cards/${this.props.id}`)
      .set({
        card_id: this.props.id,
        card_name: this.props.name,
        card_x_pos: this.state.position.x / axisScale.x,
        card_y_pos: this.state.position.y / axisScale.y
      });
  };

  getAxisScale = () => {
    const bounds = this.getAxisBounds();
    return {
      x: bounds.right / this.axisFixedBounds.right,
      y: bounds.top / this.axisFixedBounds.top
    };
  };

  getAxisBounds = () => getBounds(this.cardRef.current);

  render() {
    return (
      <Draggable
        bounds='parent'
        position={{ x: this.state.position.x, y: this.state.position.y }}
        onDrag={this.updatePosition}
        onStop={this.savePositionToDB}
      >
        <div ref={this.cardRef} className={'figure-card'}>
          <h3>{this.props.name}</h3>
          <button className={'delete-icon'} onClick={() => this.deleteCard()}>
            x
          </button>
        </div>
      </Draggable>
    );
  }
}

export default Card;
