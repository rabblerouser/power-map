import React from 'react';
import Axis from './axis';
import { mount } from 'enzyme';
import { mocksdk } from '../../database/test/firebase-mock-setup';
import { MemoryRouter } from 'react-router-dom';
import {FirebaseContext} from "../../database/Firebase";

describe('Card creation test', function() {
  const powerMapId = '1000';
  const card = {
    id: 'card-id',
    name: 'name',
    x: 100,
    y: 100
  };
  let mountAxis = () =>
    mount(
      <MemoryRouter>
        <FirebaseContext.Provider value={{
          store: mocksdk,
          onDeleteObject: () => {},
          onSaveObject: () => {}
        }}>
          <Axis cards={[card]} firebase={mocksdk} powerMapId={powerMapId} />
        </FirebaseContext.Provider>
      </MemoryRouter>
    );

  it('renders card correctly', () => {
    const wrapper = mountAxis();

    const cardComponent = wrapper.find('Card');
    const cardProps = cardComponent.props();
    expect(cardComponent).toHaveLength(1);
    expect(cardProps.id).toEqual(card.id);
    expect(cardProps.name).toEqual(card.name);
    expect(cardProps.x).toEqual(card.x);
    expect(cardProps.y).toEqual(card.y);
  });
});
