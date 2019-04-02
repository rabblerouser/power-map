import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';
import Axis from "./axis";

it('creates card correctly', () => {
    const axis  = render(
        <Axis></Axis>
    );
    fireEvent.click(axis.baseElement.getElementById("add-button"))

    expect(axis.state.appendChild()).toHaveBeenCalledTimes(1);

});
