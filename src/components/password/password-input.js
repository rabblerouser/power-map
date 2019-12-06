import React, {useState} from 'react';
import {withFirebaseUpdateHooks} from "../../database/Firebase/context";
import './password-input.css'; 

function PasswordInput(props) {
    const [input, setInput] = useState('');
    const [incorrect, setIncorrect] = useState('')

    const handleClick = () => {
        props.validatePassword(input);  
        setIncorrect('Try again');
      };
    
    const handleKeyboard = (event) => {
        setInput(event.target.value)
        setIncorrect('')
    }

    return (
        <div id='password-input-section'>
                <h2>This Powermap is protected!</h2>
                <label>Please enter password for {props.powerMapId}:</label>
                <input
                    className='password'
                    type='password'
                    label="Password"
                    onChange={handleKeyboard}
                />
                <button id='submit-button' onClick={handleClick} color="primary">
                    Submit
                </button>
                <p>{incorrect}</p>
        </div>
    );

}

export default withFirebaseUpdateHooks(PasswordInput);