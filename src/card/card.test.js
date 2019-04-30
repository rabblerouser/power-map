import React from 'react';
import Card from "./card";
import { mount } from 'enzyme';
import { mocksdk } from '../component/test/firebase-mock-setup';
import { MemoryRouter } from 'react-router-dom';

describe('Card', () => {
  let mountCard = (props) => mount(
    <MemoryRouter>
      <Card {...props} firebase={mocksdk} />
    </MemoryRouter>
  );

  it('calls delete function', () => {
    const wrapper = mountCard({
      name: 'name',
      key: 0
    });
    const card = wrapper.find('Card');

    card.instance().deleteCard = jest.fn();

    card.find('.delete-icon').at(0).simulate('click');

    expect(card.instance().deleteCard).toHaveBeenCalledTimes(1);
  });

  it('updates location state after drag', () => {
    const wrapper = mountCard({
      name: 'name',
      key: 0,
      x: 0,
      y: 0
    });
    const card = wrapper.find('Card');

    expect(card.instance().state.position).toEqual({x:0, y:0});

    card.simulate("mousedown");

    mouseMove(0, 0);
    mouseMove(500, 500);
    mouseMove(100, 100);

    expect(card.instance().state.position).toEqual({x:100, y:100});
  });

  function mouseMove(x, y, node) {
    const event = document.createEvent('MouseEvents');
    event.initMouseEvent("mousemove", true, true, window, 0, 0,
        0, x, y, false, false, false, false, 0, null );
    document.dispatchEvent(event);
    return event;
  }
})