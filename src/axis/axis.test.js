import React from 'react';
import Axis from './axis';
import { mount } from 'enzyme';
import { mocksdk } from '../component/test/firebase-mock-setup';
import { MemoryRouter } from 'react-router-dom';
import {FirebaseContext} from "../component/Firebase";

describe('Card creation test', function() {
  const powerMapID = '1000';
  let mountAxis = () =>
    mount(
      <MemoryRouter>
        <FirebaseContext.Provider value={{
          store: mocksdk,
          onDeleteObject: () => {},
          onSaveObject: () => {}
        }}>
          <Axis firebase={mocksdk} powerMapID={powerMapID} />
        </FirebaseContext.Provider>
      </MemoryRouter>
    );

  it('renders card correctly', () => {
    const wrapper = mountAxis();
    const axis = wrapper.find('Axis');
    const card = {
      id: 'card-id',
      name: 'name',
      x: 100,
      y: 100
    };

    axis.setState({
      children: [card]
    });

    wrapper.instance().forceUpdate();
    wrapper.update();

    const cardComponent = wrapper.find('Card');
    const cardProps = cardComponent.props();
    expect(cardComponent).toHaveLength(1);
    expect(cardProps.id).toEqual(card.id);
    expect(cardProps.name).toEqual(card.name);
    expect(cardProps.x).toEqual(card.x);
    expect(cardProps.y).toEqual(card.y);
  });

  it('maps card from database correctly', () => {
    const wrapper = mountAxis();
    const axis = wrapper.find('Axis');
    const axisInstance = axis.instance();
    const card = {
      card_name: 'card name',
      card_x_pos: 100,
      card_y_pos: 100
    };

    axisInstance.mapCardsToChildren({
      'card-id': card
    });
    
    expect(axisInstance.state.children).toHaveLength(1);
    
    const mappedCard = axisInstance.state.children[0];

    expect(mappedCard.name).toEqual(card.card_name);
    expect(mappedCard.x).toEqual(card.card_x_pos);
    expect(mappedCard.y).toEqual(card.card_y_pos);
  });

  it('should call unsubscribeFromPowerMap and call firebase db', () => {
    const wrapper = mountAxis();
    const axis = wrapper.find('Axis');
    const axisInstance = axis.instance();
    const mockCardsDbRefOff = jest.fn();
    
    axisInstance.unsubscribeFromPowerMap(mockCardsDbRefOff);
    expect(mockCardsDbRefOff).toHaveBeenCalledTimes(2);
    
  });
});
