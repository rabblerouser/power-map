import React from 'react';
import { mount } from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import {FirebaseContext} from "../../database/Firebase";
import { mocksdk } from '../../database/test/firebase-mock-setup';
import PasswordInput from './password-input';

describe('PasswordInput Component', function () {
    let mountPasswordInput = props =>
    mount (
        <MemoryRouter>
            <FirebaseContext.Provider value ={{
                store: mocksdk,
                onDeleteObject: () => {},
                onSaveObject: () => {}
            }}>
                <PasswordInput {...props} />
            </FirebaseContext.Provider>
        </MemoryRouter>
    );
    
    //if you make the password validator a prop then it can be interchanged
    it('click activates validate password function', () => {
        const props = {
            PowerMapId: "test",
            validatePassword: jest.fn()
        }
        const wrapper = mountPasswordInput(props);
        const PasswordInputInstance = wrapper.find('PasswordInput');
        
        wrapper
            .find('#submit-button')
            .simulate('click');
        expect(PasswordInputInstance.props().validatePassword).toHaveBeenCalled();
    });

});