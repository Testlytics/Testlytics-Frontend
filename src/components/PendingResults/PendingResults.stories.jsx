import React from "react";
import PendingResults from "./PendingResults";

export default {
  title: "Components/PendingResults",
  component: PendingResults,
  argTypes: {},
};

const Template = (args) => <PendingResults {...args} />;

export const Default = Template.bind({});
Default.args = {
  results: [
    { testName: "Mathematics Final Exam", conductedDate: "March 20, 2025" },
    { testName: "Physics Test", conductedDate: "April 5, 2025" },
    { testName: "Chemistry Test", conductedDate: "April 10, 2025" },
  ],
};

export const NoResults = Template.bind({});
NoResults.args = {
  results: [],
};
