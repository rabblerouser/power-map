import React from 'react';
import { mount } from 'enzyme';
import PowerMapChooser from './power-map-chooser';

jest.mock('react-router-dom', () => {
  return {
    withRouter: component => {
      component.defaultProps = {
        ...component.defaultProps,
        history: {
          push: jest.fn()
        }
      };
      return component;
    }
  }
});

describe('Power Map Chooser', () => {
  let mountPowerMapChooser = props =>
    mount(
      <PowerMapChooser {...props} />
    );

  it('Open power map ID redirects to chosen ID', () => {
    const powerMapId = '100';
    const wrapper = mountPowerMapChooser();
    const powerMapChooser = wrapper.find('PowerMapChooser');

    wrapper.find('#showChooser').simulate('click');
    wrapper
      .find('#powerMapId')
      .simulate('change', { target: { value: powerMapId } });
    wrapper.find('#openPowerMap').simulate('click');

    expect(powerMapChooser.props().history.push).toHaveBeenCalledWith({
      pathname: `/power-map/${powerMapId}`,
      search: '',
      hash: ''
    });
  });
});
