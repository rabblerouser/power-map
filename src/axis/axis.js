import React, { Component } from 'react';

import Card from "../card/card";


class Axis extends Component {
    constructor(){
            super();

            this.state = {
                children: []
            }
    }

    appendChild() {
        this.setState({
            children: [
                ...this.state.children,
                <Card/>
            ]
        });
    }

    render() {

        return (
            <div className="axis">
                <svg className='line'>
                    <line x1={"50%"} y1={"0"} x2={"50%"} y2={"100%"} markerEnd={ 'url(#markerArrow)' }  style={{ stroke: 'red', strokeWidth: 2 }} />
                </svg>

                <svg className='line'>
                    <line x1={"0"} y1={"50%"} x2={"100%"} y2={"50%"} markerEnd={ 'url(#markerArrow)' }  style={{ stroke: 'red', strokeWidth: 2 }} />
                </svg>

                {this.state.children.map(child => child)}

                <button id={"add-button"} onClick={() => this.appendChild()}>Add a Card</button>



            </div>

        );


    }

}

export default Axis;