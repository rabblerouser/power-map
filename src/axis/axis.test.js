import React from 'react';
import { mount } from 'enzyme';
import Axis from './axis';
import { mocksdk } from '../component/test/firebase-mock-setup';

describe('Card creation test', function() {
    it('deletes card correctly', () => {
        const axis  = mount(
            <Axis firebase={mocksdk}/>,
        );
        const cardID = 'card-id';

        axis.setState({
          children: [
            {
              name: 'name',
              id: cardID,
              x: 100,
              y: 100,
            }
          ]
        });

        axis.instance().forceUpdate();
        axis.update();

        expect(axis.find(".figure-card")).toHaveLength(1);

        const card = axis.find('.figure-card').at(0);
        const deleteIcon = card.find('.delete-icon').at(0);
        deleteIcon.simulate('click');

        // TODO: supposedly from the on child_removed
        axis.instance().filterChild(cardID);

        axis.instance().forceUpdate();
        axis.update();

        expect(axis.find(".figure-card")).toHaveLength(0);

    });

    it('adds card with pre-determined value', () => {
        const axis  = mount(
            <Axis firebase={mocksdk}/>,
        );

        axis.setState({
          children: [
            {
              name: 'name',
              id: 'card-id',
              x: 100,
              y: 100,
            }
          ]
        });

        axis.instance().forceUpdate();
        axis.update();

        expect(axis.find(".figure-card")).toHaveLength(1);
    });
}) ;
