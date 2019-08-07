import React from 'react';
import { authentication } from './authentication'

describe('Update localstorage when user login/logout', () => {
  it('set localstorage when user login', () => {
    const uid =  "1111111";
    const email = "xxxx@gmail.com";
    const user = {
      uid,
      email
    };
    authentication.login(user);

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    expect(currentUser.uid).toBe(uid);
    expect(currentUser.email).toBe(email);
  });

  it('localstorage is clear when user logs out', () => {
    const uid =  "1111111";
    const email = "xxxx@gmail.com";
    const user = {
      uid,
      email
    };
    authentication.logout(user);

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    expect(currentUser).toBe(null);
  });
});