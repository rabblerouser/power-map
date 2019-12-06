import React from "react";
import { mount } from "enzyme";
import { mocksdk } from "../../database/test/firebase-mock-setup";
import AxisContentContainer from "./axis-content-container";
import { MemoryRouter } from "react-router-dom";
import { FirebaseContext } from "../../database/Firebase";

describe("Password popup testing", function() {
  let mountAxisContentContainer = props =>
    mount(
      <MemoryRouter>
        <FirebaseContext.Provider
          value={{
            store: mocksdk,
            onDeleteObject: () => {},
            onSaveObject: () => {}
          }}
        >
          <AxisContentContainer {...props} auth={true} />
        </FirebaseContext.Provider>
      </MemoryRouter>
    );

  it("renders PasswordInput if authentication required, and AxisContainer does not render", () => {
    const props = {
      PowerMapId: "test",
      cards: []
    };
    const wrapper = mountAxisContentContainer(props);
    const AxisContentContainerInstance = wrapper.find("AxisContentContainer");
    AxisContentContainerInstance.setState({
      loading: true,
      authRequired: true,
      authenticated: false
    });

    expect(wrapper.find("PasswordInput")).toHaveLength(1);
    expect(wrapper.find("AxisContainer")).toHaveLength(0);
  });

  it("renders AxisContainer if authenticated, and PasswordInput does not render", () => {
    const props = {
      PowerMapId: "test",
      cards: []
    };
    const wrapper = mountAxisContentContainer(props);
    const AxisContentContainerInstance = wrapper.find("AxisContentContainer");
    AxisContentContainerInstance.setState({
      loading: true,
      authRequired: true,
      authenticated: true
    });

    expect(wrapper.find("AxisContainer")).toHaveLength(1);
    expect(wrapper.find("PasswordInput")).toHaveLength(0);
  });

  it("renders AxisContainer directly if authentication not required", () => {
    const props = {
      PowerMapId: "test",
      cards: []
    };
    const wrapper = mountAxisContentContainer(props);
    const AxisContentContainerInstance = wrapper.find("AxisContentContainer");
    AxisContentContainerInstance.setState({
      loading: true,
      authRequired: false,
      authenticated: false
    });

    expect(wrapper.find("AxisContainer")).toHaveLength(1);
    expect(wrapper.find("PasswordInput")).toHaveLength(0);
  });
});
