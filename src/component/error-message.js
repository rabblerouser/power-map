import React, { Component } from 'react';
import '../component/error-message.css';

class ErrorMessage extends Component {

    constructor(props) {
        super(props);
        this.state = { hidden: true };
    }

    setHidden(booleanValue) {
        this.setState({
            hidden: booleanValue,
        });
    }

    render(){

        return(
            <div className={"error-message"} hidden={this.state.hidden}
                 style={ this.state.hidden ? {display: "none"}: {display: "block"} }
            >
                <p>Error! Please enter a card name</p>
            </div>
        );
    }
}

export default ErrorMessage;