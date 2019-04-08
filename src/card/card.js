import React, { Component } from 'react';
import Draggable from 'react-draggable';

const deleteFeature = false;

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
                    {deleteFeature ? <button className={"delete-icon"}>x</button> : null}
                </div>
            </Draggable>
        );
    }
}


export default Card;