import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem('currentUser'))
);

const login = (user) => {
  // set user into local storage
  localStorage.setItem('currentUser', JSON.stringify(user));
  currentUserSubject.next(user);
};

const logout = () => {
  // remove user from local storage
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);
};

export const authentication = {
  login,
  logout,
  get currentUserValue() {
    return currentUserSubject.value
  }
};