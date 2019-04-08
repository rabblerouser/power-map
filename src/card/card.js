import React, { Component } from 'react';
import Draggable from 'react-draggable';


class Card extends Component {

    constructor(){
        super();

        this.props = {
            name: "Enter name here"
        }
    }

    render() {
        return (
            <Draggable bounds="parent" >
                <div className={"figure-card"}>
                    <h3>{this.props.name}</h3>

                </div>
            </Draggable>
        );
    }
}


export default Card;