import React from 'react';
import {shallow, configure, mount} from 'enzyme';
import Axis from "./axis";
import AxisHeader from "./component/axis-header"
import Adapter from 'enzyme-adapter-react-16';
import Card from "../card/card";
import { mocksdk } from '../component/test/firebase-mock-setup';

configure({adapter: new Adapter()});

describe('Axis Header test', function() {

    it('expands header correctly', () => {

        const axisHeader = mount(
          <AxisHeader />
        );

        const headerElement = axisHeader.find('.axis-header').at(0);
        const formElement = axisHeader.find('.navbar').at(0);

        expect(headerElement.props().style.width).toBe("10vw");
        expect(formElement.props().style.display).toBe("none");


        const burgerIcon = axisHeader.find('.hamburger-icon').at(0);
        burgerIcon.simulate('click');

        axisHeader.instance().forceUpdate();
        axisHeader.update();

        const updatedHeaderElement = axisHeader.find('.axis-header').at(0);
        const updatedFormElement = axisHeader.find('.navbar').at(0);

        expect(updatedHeaderElement.props().style.width).toBe("40vw");
        expect(updatedFormElement.props().style.display).toBe("flex");



    });

})

describe('Card creation test', function() {

    beforeAll(() => {


    });

    it('calls card creation function correctly', () => {

        const callAppendChildFromParent = jest.fn();
        const appendChildInHeader = jest.fn(() => {
             callAppendChildFromParent();
        });

        const axis  = shallow(
            <AxisHeader appendChild={callAppendChildFromParent}/>,
        );

        axis.instance().appendChild = appendChildInHeader;

        const button = axis.find('#add-card-button');
        button.simulate('click');

        expect(callAppendChildFromParent).toBeCalled();

    });

    it('does not allow empty card', () => {
        const axis  = mount(
            <Axis firebase={mocksdk}/>,
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
            <Axis firebase={mocksdk}/>,
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
            <Axis firebase={mocksdk}/>,
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

        // TODO: supposedly from the on child_removed
        axis.instance().filterChild(1);

        axis.instance().forceUpdate();
        axis.update();

        expect(axis.find(".figure-card")).toHaveLength(0);

    });

    it('pressing Enter adds a card', () => {
        const axis  = mount(
            <Axis firebase={mocksdk}/>,
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
            <Axis firebase={mocksdk}/>,
        );

        axis.instance().appendChildFromDB(1, "name", 100, 100);

        axis.instance().forceUpdate();
        axis.update();

        expect(axis.find(".figure-card")).toHaveLength(1);
        expect(axis.find(".error-message").at(0).props().hidden).toBe(true);


    });

}) ;
