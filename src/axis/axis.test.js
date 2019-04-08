import React from 'react';
import { shallow, configure } from 'enzyme';
import Axis from "./axis";
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});
it('creates card correctly', () => {

    const axis  = shallow(
        <Axis/>,
    );

    axis.instance().appendChild = jest.fn();

    const button = axis.find('#add-card-button');
    button.simulate('click');

    expect(axis.instance().appendChild).toHaveBeenCalledTimes(1);

});
