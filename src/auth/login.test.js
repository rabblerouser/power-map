import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Login from './login'

jest.mock('../component/Firebase', () => {
  return {
    withFirebase: component => {
      component.defaultProps = {
        ...component.defaultProps,
        firebase: {
          signInWithGoogle: jest.fn(() => Promise.resolve()),
          signInWithEmailAndPassword: jest.fn(() => Promise.resolve())
        }
      };
      return component;
    }
  }
});

describe('Firebase Login', function () {
  let mountLogin = props =>
    mount(
      <MemoryRouter>
        <Login {...props}/>
      </MemoryRouter>
    );

  it('renders login page correctly', () => {
    const wrapper = mountLogin();

    const loginComponent = wrapper.find('Login');

    expect(loginComponent).toHaveLength(1);
  });

  describe('when input changed', () => {
    it('should change email in the state', () => {
      const wrapper = mountLogin();
      const login = wrapper.find('Login');

      wrapper.find('input[name="email"]').simulate(
        'change',
        { target: { name: 'email', value: 'test@test.com' } }
      );

      expect(login.state('email')).toEqual('test@test.com');
    });

    it('should change password in the state', () => {
      const wrapper = mountLogin();
      const login = wrapper.find('Login');

      wrapper.find('input[name="password"]').simulate(
        'change',
        { target: { name: 'password', value: '111111' } }
      );

      expect(login.state('password')).toEqual('111111');
    });
  });

  it('signInWithEmailAndPassword is called when email login button clicks', () => {
    const wrapper = mountLogin();
    const login = wrapper.find('Login');
    const loginProps = login.props();

    wrapper.setState({
      email: 'test@test.com',
      password: '111111'
    });

    wrapper.find('form').simulate('submit');
    expect(loginProps.firebase.signInWithEmailAndPassword).toHaveBeenCalled();
  });
});
