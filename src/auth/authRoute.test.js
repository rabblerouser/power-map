import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Redirect } from 'react-router-dom';

import AuthRoute from './AuthRoute';
import Container from '../nav/container';
import { authentication } from '../service/authentication';

jest.mock('../nav/container', () => () => 'Container');

describe('AuthRoute test', () => {
  describe('when route is not /login', () => {
    let wrapper;

    describe('when user login', () => {
      beforeEach(() => {
        jest.spyOn(authentication, 'currentUserValue', 'get').mockReturnValue(true)
        wrapper = mount(
          <MemoryRouter>
            <AuthRoute path='/' exact component={Container}/>
          </MemoryRouter>
        );
      });

      it('should show the requested ', () => {
        expect(wrapper.instance().history.location.pathname).toBe('/');
      });
    });

    describe('when user does not login', () => {
      beforeEach(() => {
        jest.spyOn(authentication, 'currentUserValue', 'get').mockReturnValue(false)
        wrapper = mount(
          <MemoryRouter>
            <AuthRoute path='/' exact component={Container}/>
          </MemoryRouter>
        );
      });

      it('should redirect to login page', () => {
        expect(wrapper.instance().history.location.pathname).toBe('/login');
      });
    });
  });
});