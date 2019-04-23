import React, {Component} from 'react';

import Card from "../card/card";
import ErrorMessage from "../component/error-message";
import '../axis/axis.css';
import AxisDrawer from "./component/axis-drawer";
import AxisHeader from "./component/axis-header"


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
            .ref(`power-map-${this.props.powerMapID}`)
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
            .ref(`power-map-${this.props.powerMapID}/cards`).on('child_removed', snapshot => {
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

    filterChild = (id) => {
        const children = this.state.children.filter(child =>
            child.id !== id
        );
        this.setState({
            children: children,
        });

    }

    render() {

        return (
            <div className="axis">
                <AxisDrawer/>

                {this.state.children.map(child =>

                    <Card filter={this.filterChild} name={child.name}
                          key={child.id}
                          id={child.id}
                          x={child.x} y={child.y}
                          firebase={this.props.firebase}
                          powerMapID={this.props.powerMapID}
                    />
                )}

                <h3 className={"axis-title top-title"}>Powerful</h3>
                <h3 className={"axis-title left-title"}>Strongly Disagree</h3>
                <h3 className={"axis-title right-title"}>Strongly Agree</h3>
                <h3 className={"axis-title bottom-title"}>Less Powerful</h3>

            </div>

        );


    }

}

export default Axis;
