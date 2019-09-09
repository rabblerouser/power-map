import React from 'react';
import Axis from './axis';
import { mount } from 'enzyme';
import { mocksdk } from '../component/test/firebase-mock-setup';
import { MemoryRouter } from 'react-router-dom';
import {FirebaseContext} from "../component/Firebase";

describe('Card creation test', function() {
  const powerMapID = '1000';
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
          <Axis cards={[card]} firebase={mocksdk} powerMapID={powerMapID} />
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
