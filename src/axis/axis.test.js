import React from 'react';
import Axis from './axis';
import { mount } from 'enzyme';
import { mocksdk } from '../component/test/firebase-mock-setup';
import { MemoryRouter } from 'react-router-dom';

describe('Card creation test', function() {
  let mountAxis = () => mount(
    <MemoryRouter>
      <Axis firebase={mocksdk} />
    </MemoryRouter>
  );

  it('deletes card correctly', () => {
    const cardID = 'card-id';
    const wrapper = mountAxis();
    const axis = wrapper.find('Axis');
    
    axis.setState({
      children: [
        {
          name: 'name',
          id: 'card-id',
          x: 100,
          y: 100
        }
      ]
    });

    wrapper.instance().forceUpdate();
    wrapper.update();

    expect(wrapper.find('.figure-card')).toHaveLength(1);

    const card = wrapper.find('.figure-card').at(0);
    const deleteIcon = card.find('.delete-icon').at(0);
    deleteIcon.simulate('click');

    // TODO: supposedly from the on child_removed
    axis.instance().filterChild(cardID);

    wrapper.instance().forceUpdate();
    wrapper.update();

    expect(wrapper.find('.figure-card')).toHaveLength(0);
  });

  it('adds card with pre-determined value', () => {
    const wrapper = mountAxis();
    const axis = wrapper.find('Axis');
    
    axis.setState({
      children: [
        {
          name: 'name',
          id: 'card-id',
          x: 100,
          y: 100
        }
      ]
    });

    wrapper.instance().forceUpdate();
    wrapper.update();

    expect(wrapper.find('.figure-card')).toHaveLength(1);
  });
});
