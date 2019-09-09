import React, {Component} from 'react';
import AxisHeaderContainer from './axis-header-container';
import AxisContainer from '../axis/axis-container';
import Firebase, {FirebaseContext} from "../component/Firebase";

const defaultPowerMapID = "1000";

class Container extends Component {
  constructor(props) {
    super(props);

    const powerMapId = props.match.params.id || defaultPowerMapID;

    this.state = {
      cards: [],
      children: [],
      powerMapId
    };
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.unsubscribeFromPowerMap();
      this.setState({
        powerMapId: this.props.match.params.id
      }, () => {
        this.subscribeToPowerMap();
      });
    }
  }
    

  onDeleteObject = async (reference) => {
    await Firebase
      .database()
      .ref(reference)
      .remove();
  };

  onSaveObject = async (reference, object) => {
    await Firebase
      .database()
      .ref(reference)
      .set(object);
  };

  componentDidMount = () => {
    this.subscribeToPowerMap();
  };

  subscribeToPowerMap = async () => {
    this.cardsDbReference = await Firebase
      .database()
      .ref(`power-map-${this.state.powerMapId}`);

    this.onCardsUpdated = this.cardsDbReference.on('value', snapshot => {
      let cards;

      cards = snapshot.val()['cards'] !== undefined ? snapshot.val()['cards'] : {};

      this.mapCardsToChildren(cards);
    });

    this.onCardsRemoved = this.cardsDbReference.child('cards').on('child_removed', snapshot => {
      const cardId = snapshot.val().card_id;

      const children = this.state.children.filter(child =>
        child.id !== cardId
      );

      this.setState({
        children: children,
      });
    });
  };
  
  unsubscribeFromPowerMap = () => {
    this.cardsDbReference.off('value', this.onCardsUpdated);
    this.cardsDbReference.off('child_removed', this.onCardsRemoved);
  };

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
      cards: mappedCards
    });
  }
  
  render = () => {
    const { cards, powerMapId } = this.state;
    return (
      <div className='axis-container'>
        <FirebaseContext.Provider value={{
          store: Firebase,
          onDeleteObject: this.onDeleteObject,
          onSaveObject: this.onSaveObject
        }}>
          <AxisHeaderContainer powerMapID={powerMapId}/>
          <AxisContainer cards={cards} powerMapID={powerMapId}/>
        </FirebaseContext.Provider>
      </div>)
  }
}

export default Container;
