import React, {Component} from 'react';
import Card from "../card/card";
import AxisDrawer from "./component/axis-drawer";
import '../axis/axis.css';

class Axis extends Component {
    constructor(props) {
        super(props);

        this.state = {
            children: [],
        }

    }

    componentDidMount() {

        this.props.firebase.database()
            .ref(`power-map-${this.props.powerMapID}`)
            .on('value', snapshot => {
                const cards = snapshot.val()["cards"];

                if(Object.keys(cards).length < this.state.children.length)
                    return;

                const mappedCards = Object.keys(cards).map(key => {
                    return this.mapToChild(key, cards[key]["card_name"],
                        cards[key]["card_x_pos"], cards[key]["card_y_pos"])
                });

                this.setState({
                  children: mappedCards
                });
            })

        this.props.firebase
            .database()
            .ref(`power-map-${this.props.powerMapID}/cards`).on('child_removed', snapshot => {
                const cards = snapshot.val();
                this.filterChild(cards["card_id"])
            })

    }

    mapToChild(id, name, x_pos, y_pos) {
        return {
            name: name,
            id: id,
            x: x_pos,
            y: y_pos,
        };
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
