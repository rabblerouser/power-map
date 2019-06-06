import React, {Component} from 'react';
import Card from '../card/card';
import AxisDrawer from './component/axis-drawer';
import '../axis/axis.css';

class Axis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      children: []
    };
  }

  componentDidMount() {
    this.subscribeToPowerMap(this.props.powerMapID);
  }

  componentDidUpdate(prevProps) {
    if (this.props.powerMapID !== prevProps.powerMapID) {
      this.unsubscribeFromPowerMap();
      this.subscribeToPowerMap(this.props.powerMapID);
    }
  }

  subscribeToPowerMap(powerMapID) {
    this.cardsDbRef = this.props.firebase
      .database()
      .ref(`power-map-${powerMapID}`);

    this.onCardsUpdated = this.cardsDbRef.on('value', snapshot => {
      let cards;
      if (snapshot !== null && snapshot.val() !== null) {
        cards = snapshot.val()['cards'];
      } else {
        cards = {}
      }
      this.mapCardsToChildren(cards);
    });

    this.onCardsRemoved = this.cardsDbRef.child('cards').on('child_removed', snapshot => {
      const cardId = snapshot.val().card_id;

      const children = this.state.children.filter(child =>
        child.id !== cardId
      );

      this.setState({
        children: children,
      });
    });
  }

  unsubscribeFromPowerMap() {
    this.cardsDbRef.off('value', this.onCardsUpdated);
    this.cardsDbRef.off('child_removed', this.onCardsRemoved);
  }

  mapCardsToChildren(cards) {
    const mappedCards = Object.keys(cards).map(key => {
      const card = cards[key];
      return {
        id: key,
        name: card.card_name,
        x: card.card_x_pos,
        y: card.card_y_pos
      };
    });

    this.setState({
      children: mappedCards
    });
  }

  render() {
    return (
      <div className='axis'>
        <AxisDrawer/>

        {this.state.children.map(child => (
          <Card
            key={child.id}
            id={child.id}
            name={child.name}
            x={child.x}
            y={child.y}
            firebase={this.props.firebase}
            powerMapID={this.props.powerMapID}
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
