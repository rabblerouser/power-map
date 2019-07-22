import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../component/Firebase';
import { authentication } from '../service/authentication'
import './login.css'

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: {}
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleEmailLogin = event => {
    event.preventDefault();

    const { email, password } = this.state;
    this.props.firebase
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        authentication.login({ email });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';

    return (
      <div id='login-page'>
        <form onSubmit={this.handleEmailLogin}>
          <input
            name='email'
            value={email}
            onChange={this.handleChange}
            type='text'
            placeholder='Email Address'
          />

          <input
            name='password'
            value={password}
            onChange={this.handleChange}
            type='password'
            placeholder='Password'
          />

          <button disabled={isInvalid} type='submit'>
            Login with E-mail
          </button>

          {error && <p>{error.message}</p>}
        </form>
      </div>
    )
  }
}

export default withRouter(withFirebase(Login));
