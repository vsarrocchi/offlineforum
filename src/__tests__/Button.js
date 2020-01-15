import React from "react";
import { shallow } from "enzyme";
import Button from "../components/Button"

test("should change style", () => {
    const wrapper = shallow(<Button />);
    wrapper.find("button").simulate("click", {
        
    });
});