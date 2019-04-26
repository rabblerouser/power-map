import React from 'react';
import { mount, shallow } from 'enzyme';
import AxisHeader from './axis-header';
import { mocksdk } from '../component/test/firebase-mock-setup';
import uuid from 'uuid/v4';

jest.mock('uuid/v4');

describe('Axis Header test', function() {
  it('expands header correctly', () => {
    const axisHeader = mount(<AxisHeader />);

    const headerElement = axisHeader.find('.axis-header').at(0);
    const formElement = axisHeader.find('.navbar').at(0);

    expect(headerElement.props().style.width).toBe('10vw');
    expect(formElement.props().style.display).toBe('none');

    const burgerIcon = axisHeader.find('.hamburger-icon').at(0);
    burgerIcon.simulate('click');

    axisHeader.instance().forceUpdate();
    axisHeader.update();

    const updatedHeaderElement = axisHeader.find('.axis-header').at(0);
    const updatedFormElement = axisHeader.find('.navbar').at(0);

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
    const axis = mount(<AxisHeader firebase={mocksdk} />);

    const button = axis.find('#add-card-button');
    button.simulate('click');

    axis.instance().forceUpdate();
    axis.update();

    expect(
      axis
        .find('.error-message')
        .at(0)
        .props().hidden
    ).toBe(false);
  });

  it('creates card correctly', () => {
    const powerMapID = '1000';
    const cardID = 'my-uuid';
    uuid.mockImplementation(() => {
      return cardID;
    });
    const axis = mount(
      <AxisHeader firebase={mocksdk} powerMapID={powerMapID} />
    );

    const textField = axis.find('#add-card-text');
    textField.getDOMNode().value = 'figure';

    const button = axis.find('#add-card-button');
    button.simulate('click');

    axis.instance().forceUpdate();
    axis.update();

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
