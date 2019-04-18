import React, { Component } from 'react';
import Draggable from 'react-draggable';
import '../card/card.css'

class Card extends Component {

    constructor(props){
        super(props);

        this.state = {
            position:{
                x: props.x,
                y: props.y,
            }
        };
    }

    componentDidMount() {
        this.props.firebase
            .database()
            .ref(`power-map-1000/cards/`)
            .on('child_changed', (snapshot, prevSnapshot) => {
                const card = snapshot.val();

                console.log("CURRENTY IN : " + this.props.id + ", NAME: " + this.props.name);
                console.log("UPDATE IN : " + card["card_id"] + ", NAME: " + card["card_name"]);

                if(card["card_id"] !== this.props.id)
                    return;

                console.log("CHANGING STATE IN : " + card["card_id"] + ", NAME: " + card["card_name"]);


                this.setState({
                    position: {
                        x: card["card_x_pos"],
                        y: card["card_y_pos"],
                    }
                });
            })

    }

    deleteCard = () => {
        this.props.firebase
            .database()
            .ref(`power-map-1000/cards/${this.props.id}`)
            .remove();
    }

    updatePosition = (e, ui) => {
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
            .database()
            .ref(`power-map-1000/cards/${this.props.id}`)
            .set({
                card_id: this.props.id,
                card_name: this.props.name,
                card_x_pos: this.state.position.x,
                card_y_pos: this.state.position.y,
            })
    }

    render() {
        return (
            <Draggable bounds="parent"
                       position={{x: this.state.position.x, y: this.state.position.y}}
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


export default Card;