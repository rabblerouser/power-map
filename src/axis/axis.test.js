import React from 'react';
import {shallow, configure, mount} from 'enzyme';
import Axis from "./axis";
import Adapter from 'enzyme-adapter-react-16';
import Card from "../card/card";

configure({adapter: new Adapter()});

describe('Card creation test', function() {
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

        axis.instance().forceUpdate();
        axis.update();

        expect(axis.contains(<Card name={""}/>)).toBe(false);
        expect(axis.find(".error-message").at(0).props().hidden).toBe(false);

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

        expect(axis.find(".figure-card")).toHaveLength(1);
        expect(textField.getDOMNode().value).toBe('');
        expect(axis.find(".error-message").at(0).props().hidden).toBe(true);
    });

    it('deletes card correctly', () => {
        const axis  = mount(
            <Axis/>,
        );

        const textField = axis.find('#add-card-text');
        textField.getDOMNode().value = "figure";

        const button = axis.find('#add-card-button');
        button.simulate('click');

        axis.instance().forceUpdate();
        axis.update();

        expect(axis.find(".figure-card")).toHaveLength(1);

        const card = axis.find('.figure-card').at(0);
        const deleteIcon = card.find('.delete-icon').at(0);
        deleteIcon.simulate('click');

        axis.instance().forceUpdate();
        axis.update();

        expect(axis.find(".figure-card")).toHaveLength(0);

    });

    it('pressing Enter adds a card', () => {
        const axis  = mount(
            <Axis/>,
        );

        const textField = axis.find('#add-card-text');
        textField.getDOMNode().value = "figure";
        textField.simulate('keypress', {key: 'Enter'});

        axis.instance().forceUpdate();
        axis.update();

        expect(axis.find(".figure-card")).toHaveLength(1);
        expect(textField.getDOMNode().value).toBe('');
        expect(axis.find(".error-message").at(0).props().hidden).toBe(true);

    });

    it('adds card with pre-determined value', () => {
        const axis  = mount(
            <Axis/>,
        );

        axis.instance().appendChildFromDB(1, "name", 100, 100);

        axis.instance().forceUpdate();
        axis.update();

        expect(axis.find(".figure-card")).toHaveLength(1);
        expect(textField.getDOMNode().value).toBe('');
        expect(axis.find(".error-message").at(0).props().hidden).toBe(true);


    });

}) ;
