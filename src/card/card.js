import React, { Component } from 'react';
import Draggable from 'react-draggable';
import '../card/card.css'

class Card extends Component {

    constructor(props){
        super(props);

        this.state = {
            position:{
                x: 0,
                y: 0,
            }
        }

        this.deleteCard = this.deleteCard.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
    }

    deleteCard() {
        this.props.filter(this.props.id);
    }

    updatePosition(e, ui) {
        const {x, y} = this.state.position;
        this.setState({
            position: {
                x: x + ui.deltaX,
                y: y + ui.deltaY,
            }
        })

    }

    render() {
        return (
            <Draggable bounds="parent" onDrag={this.updatePosition}>
                <div className={"figure-card"}>
                    <h3>{this.props.name}</h3>
                    <button className={"delete-icon"} onClick={() => this.deleteCard()}>x</button>
                </div>
            </Draggable>
        );
    }
}


export default Card;