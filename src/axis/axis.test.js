import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Axis from "./axis";

it('creates card correctly', () => {
    const axis  = render(
        <Axis></Axis>
    );
    fireEvent.click(document.getElementById("add-button"))

    expect(axis.state.appendChild()).toHaveBeenCalledTimes(1);

});
