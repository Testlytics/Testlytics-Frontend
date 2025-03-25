import React, { useState } from "react";
import Dropdown from "./Dropdown";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
};

const Template = (args) => {
  const [selectedOption, setSelectedOption] = useState(args.defaultValue);

  const handleChange = (value) => {
    setSelectedOption(value);
  };

  return (
    <Dropdown {...args} selectedOption={selectedOption} onChange={handleChange} />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Select an Option",
  options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  defaultValue: "Option 1",
};

export const CustomLabel = Template.bind({});
CustomLabel.args = {
  label: "Choose a Category",
  options: ["Category A", "Category B", "Category C"],
  defaultValue: "Category A",
};
