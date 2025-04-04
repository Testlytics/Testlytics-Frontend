import React from "react";
import QnA from "./QnA";

export default {
  title: "Components/QnA",
  component: QnA,
  argTypes: {
    question: { control: "text" },
    options: { control: "array" },
    image: { control: "text" },
    variant: {
      control: {
        type: "select",
        options: [
          "default",
          "selectable",
          "highlighted",
          "marked",
          "editable", // ✅ Editable variant included
        ],
      },
    },
    correctOption: { control: "number" }, // Correct option index
    selectedOption: { control: "number" }, // Selected option for marking
    onEdit: { action: "edit clicked" }, // ✅ Added onEdit action
    onDelete: { action: "delete clicked" }, // ✅ Added onDelete action
  },
};

// Template to render the component
const Template = (args) => <QnA {...args} />;

// Default Story with labels
export const Default = Template.bind({});
Default.args = {
  question: "What is the capital of France?",
  options: ["Berlin", "Madrid", "Paris", "Rome"],
  image: "images/girl2.jpeg", // Optional image
  questionNumber: 1,
  variant: "default",
};

// With Selectable Options (radio buttons)
export const WithSelectableOptions = Template.bind({});
WithSelectableOptions.args = {
  question: "What is the capital of France?",
  options: ["Berlin", "Madrid", "Paris", "Rome"],
  image: null, // Optional image
  questionNumber: 2,
  variant: "selectable",
};

// Highlight Correct Option
export const WithCorrectOption = Template.bind({});
WithCorrectOption.args = {
  question: "What is the capital of France?",
  options: ["Berlin", "Madrid", "Paris", "Rome"],
  image: null,
  questionNumber: 3,
  variant: "highlighted",
  correctOption: 2, // Highlight Einstein
};

// Marked Option with Selected and Correct
export const WithMarkedOption = Template.bind({});
WithMarkedOption.args = {
  question: "What is the capital of France?",
  options: ["Berlin", "Madrid", "Paris", "Rome"],
  image: null,            
  questionNumber: 4,
  variant: "marked",
  selectedOption: 2, // Selected option (4)
  correctOption: 2, // Correct option (4)
};

// Marked with Incorrect Option
export const WithIncorrectMarkedOption = Template.bind({});
WithIncorrectMarkedOption.args = {
  question: "What is the capital of France?",
  options: ["Berlin", "Madrid", "Paris", "Rome"],
  image: null,
  questionNumber: 5,
  variant: "marked",
  selectedOption: 1, // Selected option (Mars)
  correctOption: 2, // Correct option (Jupiter)
};

// ✅ New Variant: Editable with Icons and Correct Highlighting
export const WithEditAndDeleteIcons = Template.bind({});
WithEditAndDeleteIcons.args = {
  question: "What is the capital of France?",
  options: ["Berlin", "Madrid", "Paris", "Rome"],
  image: "images/girl2.jpeg",
  questionNumber: 6,
  variant: "editable",
  correctOption: 2, // ✅ Correct option (first option)
  onEdit: () => alert("Edit clicked!"), // ✅ Dummy function for editing
  onDelete: () => alert("Delete clicked!"), // ✅ Dummy function for deleting
};
