// src/layouts/QuestionsList/QuestionsList.stories.jsx
import React from "react";
import QuestionsList from "./QuestionsList";

export default {
  title: "Layouts/QuestionsList",
  component: QuestionsList,
  argTypes: {
    subjectName: { control: "text" },
    testName: { control: "text" },
    totalQuestions: { control: "number" },
    totalMarks: { control: "number" },
    duration: { control: "number" },
    questions: { control: "array" },
    isEditable: { control: "boolean" }, // Control for editable variant
    isEvaluated: { control: "boolean" }, // ✅ New control for evaluated variant
    selectedIndex: { control: "number" }, // ✅ Control for selectedIndex
  },
};

// Template to render the component
const Template = (args) => <QuestionsList {...args} />;

// Default Story
export const Default = Template.bind({});
Default.args = {
  subjectName: "Physics",
  testName: "Measurements",
  totalQuestions: 3,
  totalMarks: 30,
  duration: 15,
  questions: [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      image: "images/girl2.jpeg",
      correctOption: null, // ✅ No correct option in default
      selectedOption: null, // ✅ No selection in default
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Venus", "Jupiter"],
      image: null,
      correctOption: null,
      selectedOption: null,
    },
    {
      question: "Who developed the theory of relativity?",
      options: ["Newton", "Einstein", "Galileo", "Tesla"],
      image: null,
      correctOption: null,
      selectedOption: null,
    },
  ],
  isEditable: false, // Default is not editable
  isEvaluated: false, // Default not evaluated
  selectedIndex: 0, // ✅ Default selected index
};

// Editable Story
export const Editable = Template.bind({});
Editable.args = {
  ...Default.args,
  isEditable: true, // Enable editable variant
  selectedIndex: 1, // ✅ Highlight second question
  questions: [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      image: "images/girl2.jpeg",
      correctOption: 2, // ✅ Correct option (Paris)
      selectedOption: null,
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Venus", "Jupiter"],
      image: null,
      correctOption: 1,
      selectedOption: null,
    },
  ],
};

// ✅ New Evaluated Story - Highlights correct/incorrect options
export const Evaluated = Template.bind({});
Evaluated.args = {
  ...Default.args,
  isEvaluated: true, // Enable evaluated variant
  selectedIndex: 2, // ✅ Highlight third question
  questions: [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      image: "images/girl2.jpeg",
      correctOption: 2, // ✅ Correct option (Paris)
      selectedOption: 2, // ✅ Correctly selected (Paris)
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Venus", "Jupiter"],
      image: null,
      correctOption: 1, // ✅ Correct option (Mars)
      selectedOption: 0, // ❌ Incorrectly selected (Earth)
    },
    {
      question: "Who developed the theory of relativity?",
      options: ["Newton", "Einstein", "Galileo", "Tesla"],
      image: null,
      correctOption: 1, // ✅ Correct option (Einstein)
      selectedOption: 1, // ✅ Correctly selected (Einstein)
    },
  ],
};
