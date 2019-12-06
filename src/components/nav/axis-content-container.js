import React, { Component } from "react";
import AxisContainer from "../axis/axis-container";
import Firebase from "../../database/Firebase";
import PasswordInput from "../password/password-input";

export default class AxisContentContainer extends Component {
  constructor(props) {
    super(props);

    this.handleValidatePassword = this.handleValidatePassword.bind(this);

    this.state = {
      loading: false,
      authRequired: true,
      authenticated: false
    };
  }

  handleValidatePassword(password) {
    const firebaseDatabase = Firebase.database();

    firebaseDatabase
      .ref(`power-map-${this.props.powerMapId}/password`)
      .on("value", snapshot => {
        this.setState({
          authenticated: password === snapshot.val()
        });
      });

    return this.state.authenticated;
  }

  setAuthRequired() {
    const firebaseDatabase = Firebase.database();

    firebaseDatabase
      .ref(`power-map-${this.props.powerMapId}`)
      .on("value", snapshot => {
        this.setState({
          authRequired: snapshot.hasChild("password"),
          loading: true
        });
      });
  }

  componentWillMount = () => {
    this.setAuthRequired();
  };

  componentDidUpdate(prevProps) {
    if (this.props.powerMapId !== prevProps.powerMapId) {
    
      this.setState({
        loading: false,
        authRequired: true,
        authenticated: false
      });
      this.setAuthRequired();
    }
  }

  render() {
    return (
      <div>
        {this.state.loading &&
          this.state.authRequired &&
          !this.state.authenticated && (
            <PasswordInput
              validatePassword={this.handleValidatePassword}
              powerMapId={this.props.powerMapId}
            />
          )}
        {this.state.loading &&
          (!this.state.authRequired || this.state.authenticated) && (
            <AxisContainer
              cards={this.props.cards}
              powerMapId={this.props.powerMapId}
            />
          )}
      </div>
    );
  }
}
