import React, { useState } from "react";
import InputField from "./InputField";

export default {
  title: "Components/InputField", // Storybook category
  component: InputField,         // Component to display
};

const Template = (args) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <InputField
      {...args}
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};

// Default story
export const Default = Template.bind({});
Default.args = {
  label: "Your Heading",
  placeholder: "Type here...",
};

// Example with different label
export const CustomLabel = Template.bind({});
CustomLabel.args = {
  label: "Custom Heading",
  placeholder: "Enter text...",
};
