import React, {Component} from 'react';
import Draggable from 'react-draggable';
import {getBounds} from './positionHelpers';
import '../card/card.css';
import {COLOURS} from './enums/config';
import {withFirebaseUpdateHooks} from "../component/Firebase/context";

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
      },
      colour: ""
    };
    
    this.cardRef = React.createRef();
  }

  componentDidMount() {
    const firebaseDatabase = this.props.firebase.database();
    
    firebaseDatabase.ref(`power-map-${this.props.powerMapID}/cards/${this.props.id}`)
      .on('value', snapshot => {
        const snapshotValue = snapshot.val();
        if (snapshotValue !== null) {
          const snapshotColour = snapshotValue['card_colour'] !== undefined ? snapshot.val()['card_colour'] : "";
          this.setState({
            colour: snapshotColour
          });
        }
      });
    
    firebaseDatabase.ref(`power-map-${this.props.powerMapID}/cards/`)
      .on('child_changed', (snapshot, _) => {
        const card = snapshot.val();
        if (card['card_id'] !== this.props.id) return;

        this.originalPosition = {
          x: card['card_x_pos'],
          y: card['card_y_pos']
        };
      });
    
    this.updateScaledPosition();
    window.addEventListener("resize", this.updateScaledPosition);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScaledPosition);
  }

  deleteCard = async () => {
    await this.props.onDeleteObject(`power-map-${this.props.powerMapID}/cards/${this.props.id}`);
  };

  updatePosition = (e, ui) => {
    const {x, y} = this.state.position;
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

  saveCardStateToDB = async () => {
    const axisScale = this.getAxisScale();
    const card = {
      card_id: this.props.id,
      card_name: this.props.name,
      card_x_pos: this.state.position.x / axisScale.x,
      card_y_pos: this.state.position.y / axisScale.y,
      card_colour: this.state.colour
    };
    await this.props.onSaveObject(`power-map-${this.props.powerMapID}/cards/${this.props.id}`, card);
  };

  getAxisScale = () => {
    const bounds = this.getAxisBounds();
    return {
      x: bounds.right / this.axisFixedBounds.right,
      y: bounds.top / this.axisFixedBounds.top
    };
  };

  changeCardColour = () => {
    let colour;
    const currentColour = this.state.colour;
    const availableColours = Object.values(COLOURS);

    const currentIndexColour = this.getColourIndex(currentColour, availableColours);
    
    if (parseInt(currentIndexColour) <= availableColours.length) {
      const newColour = currentIndexColour + 1;
      if (newColour >= availableColours.length) {
        colour = availableColours[0]
      } else {
        colour = availableColours[newColour]
      }
    }
    this.setState( {
      colour
    }, () => this.saveCardStateToDB());
  };
  
  getColourIndex = (currentColour, availableColours) => {
    const colourIndex = availableColours.indexOf(currentColour);
    return colourIndex >= 0 ? colourIndex: 0;
  };

  getAxisBounds = () => getBounds(this.cardRef.current);

  render() {
    return (
      <Draggable
        bounds='parent'
        position={{x: this.state.position.x, y: this.state.position.y}}
        onDrag={this.updatePosition}
        onStop={this.saveCardStateToDB}
      >
        <div ref={this.cardRef} className={'figure-card'} style={{backgroundColor: this.state.colour}}>
          <h3>{this.props.name}</h3>
          <button className={'delete-icon'} onClick={() => this.deleteCard()}>
            x
          </button>
          <button className={'change-colour-icon'} onClick={this.changeCardColour}>
            <i className="fa fa-paint-brush"/>
          </button>
        </div>
      </Draggable>
    );
  }
}

export default withFirebaseUpdateHooks(Card);
