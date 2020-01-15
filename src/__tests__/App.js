import React from "react";
import { render, mount, shallow } from "enzyme";
import App from "../components/App";

// Exempel test
test("renders the app", () => {
  render(<App />);
});

// test("componentDidMount", () => {
//   const wrapper = shallow(<App />);
// });

test("should have a button", () => {
  const wrapper = mount(<App />);
  expect(wrapper.find("button")).toHaveLength(1);
});

test("should have a dropDown", () => {
  const wrapper = mount(<App />);
  expect(wrapper.find("select")).toHaveLength(1);
});

test("currentPage in state updates when button click", () => {
  const wrapper = mount(<App />);
  expect(wrapper.state().currentPage).toBe("home");
  wrapper.find("button").simulate("click");
  expect(wrapper.state().currentPage).toBe("bot");
  wrapper.find("button").simulate("click");
  expect(wrapper.state().currentPage).toBe("home");
});

// integration test
test("currentPersona in state updates when select an option", () => {
  const wrapper = mount(<App />);
  expect(wrapper.state().currentPersona).toBe("Zac");
  wrapper.find("select").simulate("change", {
    target: {name: "currentPersona", value: "Esmeralda"}
  });
  expect(wrapper.state().currentPersona).toBe("Esmeralda");
  wrapper.find("select").simulate("change", {
    target: {name: "currentPersona", value: "Morgana"}
  });
  expect(wrapper.state().currentPersona).toBe("Morgana");
});
