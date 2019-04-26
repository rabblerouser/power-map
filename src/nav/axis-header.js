import React, {Component} from 'react';
import ErrorMessage from "../component/error-message";
import Navbar from "./navbar";
import uuid from 'uuid/v4';
import "./axis-header.css"

class AxisHeader extends Component {

  constructor(props) {
    super(props);

    this.state = {
      expandHeader: false,
    }
  }

  appendChild = () => {

    const cardText = this.refs.CardText.value;

    if (!this.nameValidation(cardText))
        return false;

    this.refs.CardText.value = "";

    const newCardId = uuid();

    this.props.firebase
        .database()
        .ref(`power-map-${this.props.powerMapID}/cards/${newCardId}`)
        .set({
            card_id: newCardId,
            card_name: cardText,
            card_x_pos: 0,
            card_y_pos: 0,
        });

  }

  nameValidation(cardText) {
      const errorMessage = this.refs.ErrorMessage;

      if (cardText === "") {
          errorMessage.setHidden(false);
          return false;
      }

      errorMessage.setHidden(true);
      return true;

  }

  expandHeader = () => {

    this.setState({
      expandHeader: !this.state.expandHeader,
    });

  }

  render() {
    return (
      <header className="axis-header"
              style={ this.state.expandHeader ? {width: "40vw"} : {width: "10vw"}}>

          <img className={"hamburger-icon"} src={"/hamburger-icon.png"}
                onClick={() => {this.expandHeader()}}/>

          <div className={"navbar"}
               style={ this.state.expandHeader ? {display: "flex"} : {display: "none"}}  >
              <Navbar/>
          </div>

          <div id={"add-card-form"}>
              <ErrorMessage ref={"ErrorMessage"}/>
              <input type={"text"} id={"add-card-text"} ref={"CardText"} onKeyPress={(target) => {
                  if(target.key === 'Enter')
                      this.appendChild();
              }}/>
              <button id={"add-card-button"} onClick={() => this.appendChild()}>Add a Card</button>
          </div>
      </header>
    );
  }

}

export default AxisHeader;
