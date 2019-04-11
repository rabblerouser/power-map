import React from 'react';
import {shallow, configure, mount} from 'enzyme';
import Axis from "./axis";
import Adapter from 'enzyme-adapter-react-16';
import Card from "../card/card";

configure({adapter: new Adapter()});
it('calls card creation function correctly', () => {
    const axis  = shallow(
        <Axis/>,
    );

    axis.instance().appendChild = jest.fn();

    const button = axis.find('#add-card-button');
    button.simulate('click');

    expect(axis.instance().appendChild).toHaveBeenCalledTimes(1);

});

it('does not allow empty card', () => {
    const axis  = mount(
        <Axis/>,
    );

    const button = axis.find('#add-card-button');
    button.simulate('click');

    expect(axis.contains(<Card name={""}/>)).toBe(false);
});

it('creates card correctly', () => {
    const axis  = mount(
        <Axis/>,
    );

    const textField = axis.find('#add-card-text');
    textField.getDOMNode().value = "figure";

    const button = axis.find('#add-card-button');
    button.simulate('click');

    axis.instance().forceUpdate();
    axis.update();

    expect(axis.contains(<Card name={"figure"}/>)).toBe(true);
    expect(textField.getDOMNode().value).toBe('');
});
