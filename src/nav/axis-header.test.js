import React from 'react';
import { shallow, mount } from 'enzyme';
import AxisHeader from './axis-header';
import { mocksdk } from '../component/test/firebase-mock-setup';
import uuid from 'uuid/v4';
import { MemoryRouter } from 'react-router-dom';

jest.mock('uuid/v4');

describe('Axis Header test', () => {
  let mountAxisHeader = (props) => mount(
    <MemoryRouter>
      <AxisHeader {...props} firebase={mocksdk} />
    </MemoryRouter>
  );

  it('expands header correctly', () => {
    const wrapper = mountAxisHeader();

    const headerElement = wrapper.find('.axis-header').at(0);
    const formElement = wrapper.find('.navbar').at(0);

    expect(headerElement.props().style.width).toBe('10vw');
    expect(formElement.props().style.display).toBe('none');

    const burgerIcon = wrapper.find('.hamburger-icon').at(0);
    burgerIcon.simulate('click');

    wrapper.instance().forceUpdate();
    wrapper.update();

    const updatedHeaderElement = wrapper.find('.axis-header').at(0);
    const updatedFormElement = wrapper.find('.navbar').at(0);

    expect(updatedHeaderElement.props().style.width).toBe('40vw');
    expect(updatedFormElement.props().style.display).toBe('flex');
  });

  it('calls card creation function correctly', () => {
    const callAppendChildFromParent = jest.fn();
    const appendChildInHeader = jest.fn(() => {
      callAppendChildFromParent();
    });

    const axis = shallow(
      <AxisHeader appendChild={callAppendChildFromParent} />
    );

    axis.instance().appendChild = appendChildInHeader;

    const button = axis.find('#add-card-button');
    button.simulate('click');

    expect(callAppendChildFromParent).toBeCalled();
  });

  it('does not allow empty card', () => {
    const wrapper = mountAxisHeader();

    const button = wrapper.find('#add-card-button');
    button.simulate('click');

    wrapper.instance().forceUpdate();
    wrapper.update();

    expect(
      wrapper
        .find('.error-message')
        .at(0)
        .props().hidden
    ).toBe(false);
  });

  it('creates card correctly', () => {
    const powerMapID = '1000';
    const cardID = 'my-uuid';
    const wrapper = mountAxisHeader({
      powerMapID
    });

    uuid.mockImplementation(() => {
      return cardID;
    });

    const textField = wrapper.find('#add-card-text');
    textField.getDOMNode().value = 'figure';

    const button = wrapper.find('#add-card-button');
    button.simulate('click');

    wrapper.instance().forceUpdate();
    wrapper.update();

    expect(
      mocksdk.database().ref(`power-map-${powerMapID}/cards/${cardID}`)
    ).toBeTruthy();
  });

  it('pressing Enter adds a card', () => {
    const callAppendChildFromParent = jest.fn();
    const appendChildInHeader = jest.fn(() => {
      callAppendChildFromParent();
    });

    const axis = shallow(
      <AxisHeader appendChild={callAppendChildFromParent} />
    );

    axis.instance().appendChild = appendChildInHeader;

    const textField = axis.find('#add-card-text');
    textField.simulate('keypress', { key: 'Enter' });

    expect(callAppendChildFromParent).toBeCalled();
  });
});
