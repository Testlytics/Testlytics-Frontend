import React from "react";
import LiveExamDetails from "./LiveExamDetails";

export default {
  title: "Components/LiveExamDetails",
  component: LiveExamDetails,
};

const Template = (args) => <LiveExamDetails {...args} />;

export const Default = Template.bind({});
Default.args = {
  exams: [
    { name: "Midterm Math", subject: "Mathematics", duration: 60, time: "10:30 AM" },
    { name: "Physics Quiz", subject: "Physics", duration: 45, time: "12:00 PM" },
    { name: "Physics Quiz", subject: "Physics", duration: 45, time: "12:00 PM" }
  ],
};

export const SingleExam = Template.bind({});
SingleExam.args = {
  exams: [
    { name: "History Test", subject: "History", duration: 30, time: "2:00 PM" },
  ],
};

export const NoExams = Template.bind({});
NoExams.args = {
  exams: [],
};
