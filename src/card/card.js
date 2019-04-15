import React, { Component } from 'react';
import Draggable from 'react-draggable';
import '../card/card.css'

const deleteFeature = false;

class Card extends Component {

    constructor(name, key){
        super();

        this.props = {
            name: name,
            key: key,
        }
    }

    deleteCard() {

    }

    render() {
        return (
            <Draggable bounds="parent" >
                <div className={"figure-card"}>
                    <h3>{this.props.name}</h3>
                    <button className={"delete-icon"} onClick={() => this.deleteCard()}>x</button>
                </div>
            </Draggable>
        );
    }
}


export default Card;