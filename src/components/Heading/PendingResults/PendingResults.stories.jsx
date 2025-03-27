import React from "react";
import PendingResults from "./PendingResults";

export default {
  title: "Components/PendingResults",
  component: PendingResults,
  argTypes: {
    testName: { control: "text" },
    conductedDate: { control: "text" },
  },
};

const Template = (args) => <PendingResults {...args} />;

export const Default = Template.bind({});
Default.args = {
  testName: "Mathematics Final Exam",
  conductedDate: "March 20, 2025",
};

export const ScienceTest = Template.bind({});
ScienceTest.args = {
  testName: "Physics Test",
  conductedDate: "April 5, 2025",
};
