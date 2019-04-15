import React, { Component } from 'react';
import Draggable from 'react-draggable';
import '../card/card.css'

class Card extends Component {

    constructor(props){
        super(props);
    }

    deleteCard() {
        this.props.filter(this.props.id);
    }

    render() {
        return (
            <Draggable bounds="parent">
                <div className={"figure-card"}>
                    <h3>{this.props.name}</h3>
                    <button className={"delete-icon"} onClick={() => this.deleteCard()}>x</button>
                </div>
            </Draggable>
        );
    }
}


export default Card;