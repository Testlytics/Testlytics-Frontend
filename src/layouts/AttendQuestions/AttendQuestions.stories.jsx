// src/layouts/AttendQuestions/AttendQuestions.stories.jsx
import React from "react";
import AttendQuestions from "./AttendQuestions";

export default {
  title: "Layouts/AttendQuestions",
  component: AttendQuestions,
  argTypes: {
    totalQuestions: { control: "number" },
  },
};

// Template to render the component
const Template = (args) => <AttendQuestions {...args} />;

// Default Story
export const Default = Template.bind({});
Default.args = {
  totalQuestions: 30, // You can control the number of questions
};
