import React from 'react';
import {shallow, configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Card from "./card";
import {mocksdk} from "../component/test/firebase-mock-setup";



configure({adapter: new Adapter()});
it('calls delete function', () => {
    const card = mount(
        <Card name={"name"} key={0} firebase={mocksdk} />,
    );

    card.instance().deleteCard = jest.fn();

    card.find('.delete-icon').at(0).simulate('click');

    expect(card.instance().deleteCard).toHaveBeenCalledTimes(1);

});

it('updates location state after drag', () => {
    const card = mount(
        <Card name={"name"} key={0} firebase={mocksdk}
            x={0} y={0}
        />,
    );

    expect(card.instance().state.position).toEqual({x:0, y:0});

    card.simulate("mousedown");

    mouseMove(0, 0);
    mouseMove(500, 500);
    mouseMove(100, 100);

    expect(card.instance().state.position).toEqual({x:100, y:100});


});


function mouseMove(x, y, node) {
    const event = document.createEvent('MouseEvents');
    event.initMouseEvent("mousemove", true, true, window, 0, 0,
        0, x, y, false, false, false, false, 0, null );
    document.dispatchEvent(event);
    return event;

}