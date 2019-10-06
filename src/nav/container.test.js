import React from 'react';
import { mount } from 'enzyme';
import { mocksdk } from '../component/test/firebase-mock-setup';
import { shallow } from 'enzyme';
import Container from "./container";

describe('test container', function () {
  it('should call mapCardsToChildern with empty props when updateCardsOnSnapshot with null snapshot', function () {
    const container = shallow(
      <Container 
        match={{params: {id : 1}}}
      />
    )
    const mapCardsToChildrenSpy = jest.fn(snapshot => snapshot);
    container.instance().mapCardsToChildren = mapCardsToChildrenSpy;
    container.instance().updateCardsOnSnapshot({ val: () => null});
    
    expect(mapCardsToChildrenSpy).toBeCalledWith({});
  });
  
});