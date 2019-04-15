import React from 'react';
import {shallow, configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Card from "./card";



configure({adapter: new Adapter()});
it('calls delete function', () => {
    const card = mount(
        <Card name={"name"} key={0} />,
    );

    card.instance().deleteCard = jest.fn();

    card.find('.delete-icon').at(0).simulate('click');

    expect(card.instance().deleteCard).toHaveBeenCalledTimes(1);

});
