import React from 'react';
import { mount } from 'enzyme';
import { mocksdk } from '../../database/test/firebase-mock-setup';
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

  it('Stores password when password is provided', () => {
    const createPowerMap = mountCreatePowerMap();
    const newPowerMapId = 'newId';
    const newPassword = 'fakePassword';

    createPowerMap.find('#showForm').simulate('click');
    createPowerMap
      .find('#newPowerMapId')
      .simulate('change', { target: { value: newPowerMapId } });
    createPowerMap
      .find('#password')
      .simulate('change', { target: { value: newPassword } });  

    createPowerMap.find('#createNewPowerMap').simulate('click');

    expect(mocksdk.database().ref(`power-map-${newPowerMapId}/password`)).toBeTruthy();
    });
  });

