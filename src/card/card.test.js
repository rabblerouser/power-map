import React from 'react';
import Card from './card';
import {mount} from 'enzyme';
import {mocksdk} from '../component/test/firebase-mock-setup';
import {MemoryRouter} from 'react-router-dom';

describe('Card', () => {
  let mountCard = props =>
    mount(
      <MemoryRouter>
        <div>
          <Card {...props} firebase={mocksdk}/>
        </div>
      </MemoryRouter>
    );

  it('calls delete function', () => {
    const wrapper = mountCard({
      name: 'name',
      key: 0,
      x: 0,
      y: 0
    });
    const card = wrapper.find('Card');

    card.instance().deleteCard = jest.fn();

    card
      .find('.delete-icon')
      .at(0)
      .simulate('click');

    expect(card.instance().deleteCard).toHaveBeenCalledTimes(1);
  });

  it('updates location state after drag', () => {
    const wrapper = mountCard({
      name: 'name',
      x: 0,
      y: 0
    });
    const card = wrapper.find('Card');

    expect(card.instance().state.position).toEqual({x: 0, y: -0});

    card.simulate('mousedown');

    mouseMove(0, 0);
    mouseMove(500, 500);
    mouseMove(100, 100);

    expect(card.instance().state.position).toEqual({x: 100, y: 100});
  });

  it('Recalculates scaled position on resize', () => {
    const axisBounds = {
      top: -200,
      right: 200
    };
    const cardPosition = {
      x: 100,
      y: -150
    };
    const wrapper = mountCard({
      name: 'name',
      x: cardPosition.x,
      y: cardPosition.y
    });
    const card = wrapper.find('Card');
    const cardInstance = card.instance();

    cardInstance.getAxisBounds = jest.fn(() => axisBounds);

    window.dispatchEvent(new Event('resize'));

    wrapper.instance().forceUpdate();
    wrapper.update();

    expect(cardInstance.state.position.x).toEqual(40);
    expect(cardInstance.state.position.y).toEqual(-60);
  });

  it('changes the colour of the card', () => {
    const wrapper = mountCard({
      name: 'name',
      x: 0,
      y: 0
    });

    const expectedColours = {
      red: "#FE0101",
      yellow: "#FEF601",
      green: "#01FE01",
      grey: "#797979"
    };
    
    const card = wrapper.find('Card');
    const cardInstance = card.instance();
    
    cardInstance.changeCardColour();
    
    console.log(`expected colours ${cardInstance.state.colour}`)
    
    expect(Object.values(expectedColours).includes(cardInstance.state.colour)).toEqual(true)
  });

  function mouseMove(x, y, node) {
    const event = document.createEvent('MouseEvents');
    event.initMouseEvent("mousemove", true, true, window, 0, 0,
      0, x, y, false, false, false, false, 0, null);
    document.dispatchEvent(event);
    return event;
  }
});
