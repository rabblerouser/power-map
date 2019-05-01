import React from 'react';
import { mount } from 'enzyme';
import { mocksdk } from '../component/test/firebase-mock-setup';
import CreatePowerMap from './create-power-map';

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

describe('Create Power Map', () => {
  let mountCreatePowerMap = props =>
    mount(<CreatePowerMap firebase={mocksdk} {...props} />);

  it('Creates and routes to new power map with chosen ID', () => {
    const createPowerMap = mountCreatePowerMap();
    const newPowerMapId = 'newId';

    createPowerMap.find('#showForm').simulate('click');
    createPowerMap
      .find('#newPowerMapId')
      .simulate('change', { target: { value: newPowerMapId } });

    createPowerMap.find('#createNewPowerMap').simulate('click');

    expect(mocksdk.database().ref(`power-map-${newPowerMapId}`)).toBeTruthy();
    expect(createPowerMap.props().history.push).toHaveBeenCalledWith({
      pathname: `/power-map/${newPowerMapId}`,
      search: '',
      hash: ''
    });
  });
});
