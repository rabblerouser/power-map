import React, { Component } from 'react';
import {ArcherContainer, ArcherElement} from "react-archer";

const rootStyle = { display: 'flex', justifyContent: 'center' };
const rowStyle = { margin: '200px 0', display: 'flex', justifyContent: 'space-between', }
const boxStyle = { padding: '10px', border: '1px solid black', };

class Axis extends Component {
    render() {

        return (
            <div className="axis">
                <svg className='line'>
                    <line x1={"50%"} y1={"0"} x2={"50%"} y2={"100%"} markerEnd={ 'url(#markerArrow)' }  style={{ stroke: 'red', strokeWidth: 2 }} />
                </svg>

                <svg className='line'>
                    <line x1={"0"} y1={"50%"} x2={"100%"} y2={"50%"} markerEnd={ 'url(#markerArrow)' }  style={{ stroke: 'red', strokeWidth: 2 }} />
                </svg>
            </div>
        );


    }

}

export default Axis;