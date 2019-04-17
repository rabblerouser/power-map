import React, { Component } from 'react';
import Draggable from 'react-draggable';
import '../card/card.css'
import {withFirebase} from "../component/Firebase";

class Card extends Component {

    constructor(props){
        super(props);

        this.state = {
            position:{
                x: props.x,
                y: props.y,
            }
        }

        this.deleteCard = this.deleteCard.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
    }

    deleteCard() {
        this.props.firebase
            .db
            .ref(`power-map-1000/cards/${this.props.id}`)
            .remove();
        this.props.filterCard(this.props.id)
        console.log("DELETE");
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

    savePositionToDB = () => {
        this.props.firebase
            .db
            .ref(`power-map-1000/cards/${this.props.id}`)
            .set({
                card_name: this.props.name,
                card_x_pos: this.state.position.x,
                card_y_pos: this.state.position.y,
            })
    }

    render() {
        return (
            <Draggable bounds="parent"
                       defaultPosition={{x: this.state.position.x, y: this.state.position.y}}
                       onDrag={this.updatePosition}
                       onStop={this.savePositionToDB}>
                <div className={"figure-card"}>
                    <h3>{this.props.name}</h3>
                    <button className={"delete-icon"} onClick={() => this.deleteCard()}>x</button>
                </div>
            </Draggable>
        );
    }
}


export default withFirebase(Card);