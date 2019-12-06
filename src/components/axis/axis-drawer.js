import React, { Component } from 'react';

class AxisDrawer extends Component {

    render() {
        return (
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

            </div>


        );
    }

}

export default AxisDrawer;