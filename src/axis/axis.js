import React, {Component} from 'react';

import Card from "../card/card";
import ErrorMessage from "../component/error-message";
import '../axis/axis.css';
import '../axis/App.css';



class Axis extends Component {
    constructor(props) {
        super(props);

        this.state = {
            children: [],
            idCounter: 1,
        }

    }

    componentDidMount() {

        this.props.firebase.database()
            .ref('power-map-1000')
            .on('value', snapshot => {
                const cards = snapshot.val()["cards"];

                if(Object.keys(cards).length < this.state.children.length)
                    return;

                Object.keys(cards).map(key => {
                    return this.appendChildFromDB(key, cards[key]["card_name"],
                        cards[key]["card_x_pos"], cards[key]["card_y_pos"])
                });
            })

        this.props.firebase
            .database()
            .ref('power-map-1000/cards').on('child_removed', snapshot => {
                const cards = snapshot.val();
                this.filterChild(cards["card_id"])
            })

    }

    appendChildFromDB(id, name, x_pos, y_pos) {

        let children = [...this.state.children];
        const existingIndex = children.findIndex(x => {
            return x.id == id;
        });

        if(existingIndex !== -1) {
            let newItem = {
                ...children[existingIndex],
                id: id,
                name: name,
                x: x_pos,
                y: y_pos,
            };

            children[existingIndex] = newItem;

            this.setState({
                children: [...children]
            })
        } else {
            this.setState({
                children: [
                    ...children,
                    {
                        name: name,
                        id: id,
                        x: x_pos,
                        y: y_pos,
                    }
                ],
            });
            if(id >= this.state.idCounter) {
                this.setState({
                    idCounter: parseInt(id) + 1,
                })
            }
        }

    }

    appendChild= () => {

        const cardText = this.refs.CardText.value;

        if (!this.nameValidation(cardText))
            return false;

        this.props.firebase
            .database()
            .ref(`power-map-1000/cards/${this.state.idCounter}`)
            .set({
                card_id: this.state.idCounter,
                card_name: cardText,
                card_x_pos: 0,
                card_y_pos: 0,
            })

        this.setState({
            children: [
                ...this.state.children,
                {
                    name: cardText,
                    id: this.state.idCounter,
                    x: 0,
                    y: 0,
                }
            ],
            idCounter: this.state.idCounter + 1
        });

        this.refs.CardText.value = "";

    }

    filterChild = (id) => {
        const children = this.state.children.filter(child =>
            child.id !== id
        );
        this.setState({
            children: children,
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

    render() {

        return (
            <div className="App">

                <header className="App-header">
                    <div id={"add-card-form"}>
                        <ErrorMessage ref={"ErrorMessage"}/>
                        <input type={"text"} id={"add-card-text"} ref={"CardText"} onKeyPress={(target) => {
                            if(target.key === 'Enter')
                                this.appendChild();
                        }}/>
                        <button id={"add-card-button"} onClick={() => this.appendChild()}>Add a Card</button>
                    </div>
                </header>

                <div className="axis">
                    <svg className='line'>
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3"
                                orient="auto-start-reverse" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="#f00"/>
                        </marker>
                        <line x1={"50%"} y1={"0"} x2={"50%"} y2={"100%"}
                              markerEnd={'url(#arrow)'} markerStart={' url(#arrow) '}
                              style={{stroke: 'red', strokeWidth: 2}}/>
                    </svg>

                    <svg className='line'>
                        <line x1={"0"} y1={"50%"} x2={"100%"} y2={"50%"}
                              markerEnd={'url(#arrow)'} markerStart={' url(#arrow) '}
                              style={{stroke: 'red', strokeWidth: 2}}/>
                    </svg>

                    {this.state.children.map(child =>

                        <Card filter={this.filterChild} name={child.name}
                              key={child.id}
                              id={child.id}
                              x={child.x} y={child.y}
                              firebase={this.props.firebase}
                        />
                    )}

                    <h3 className={"axis-title top-title"}>Powerful</h3>
                    <h3 className={"axis-title left-title"}>Strongly Disagree</h3>
                    <h3 className={"axis-title right-title"}>Strongly Agree</h3>
                    <h3 className={"axis-title bottom-title"}>Less Powerful</h3>

                </div>
            </div>

        );


    }

}

export default Axis;