import React, {Component} from 'react';
import ErrorMessage from "../../component/error-message"
import "./axis-header.css"

class AxisHeader extends Component {

  appendChild = () => {

    const cardText = this.refs.CardText.value;

    if (!this.nameValidation(cardText))
        return false;

    this.refs.CardText.value = "";
    this.props.appendChild(cardText);

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



  render() {
    return (
      <header className="axis-header">

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
