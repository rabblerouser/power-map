import React, {Component} from 'react';

import Card from "../card/card";
import ErrorMessage from "../component/error-message";
import '../axis/axis.css';
import '../axis/App.css'


class Axis extends Component {
    constructor(props) {
        super(props);

        this.state = {
            children: [],
            idCounter: 0,
        }

        this.appendChild = this.appendChild.bind(this);
        this.filterChild = this.filterChild.bind(this);
    }

    appendChild() {

        const cardText = this.refs.CardText.value;

        if (!this.nameValidation(cardText))
            return false;

        this.setState({
            children: [
                ...this.state.children,
                <Card filter={this.filterChild} name={cardText}
                      key={this.state.idCounter}
                      id={this.state.idCounter}
                />
            ],
            idCounter: this.state.idCounter + 1
        });

        this.refs.CardText.value = "";

    }

    filterChild(id) {
        const children = this.state.children.filter(child =>
            child.props.id !== id
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
                        <input type={"text"} id={"add-card-text"} ref={"CardText"}/>
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

                    {this.state.children.map(child => child)}

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