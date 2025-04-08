// src/components/AttendQuestion/AttendQuestion.stories.jsx
import React, { useState } from "react";
import AttendQuestion from "./AttendQuestion";

export default {
  title: "Components/AttendQuestion",
  component: AttendQuestion,
  argTypes: {
    questionNumber: { control: "number" },
    isSelected: { control: "boolean" },
  },
};

// Template to render the component
const Template = (args) => {
  const [selected, setSelected] = useState(false);

  const handleClick = (number) => {
    setSelected(number);
  };

  return (
    <div>
      <AttendQuestion
        {...args}
        onClick={handleClick}
        isSelected={selected === args.questionNumber}
      />
    </div>
  );
};

// Default Story
export const Default = Template.bind({});
Default.args = {
  questionNumber: 1,
  isSelected: false,
};

// Selected Story
export const Selected = Template.bind({});
Selected.args = {
  questionNumber: 2,
  isSelected: true,
};
