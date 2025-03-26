// src/layouts/ClickableList/ClickableList.stories.jsx
import React from "react";
import QPList from "./QPList";

export default {
  title: "Layouts/QPList",
  component: QPList,
  argTypes: {
    title: { control: "text" },
    items: { control: "array" },
  },
};

// Template to render the component
const Template = (args) => <QPList {...args} />;

// ✅ Default Variant
export const DefaultQPList = Template.bind({});
DefaultQPList.args = {
  title: "QP List",
  items: ["Measurements", "Organic", "Algebra"],
};
DefaultQPList.storyName = "Default QP List"; // Custom name in Storybook

// ✅ Custom List Variant
export const CustomAnswerSheets = Template.bind({});
CustomAnswerSheets.args = {
  title: "Answer Sheets",
  items: ["Measurements", "Organic", "Algebra"],
};
CustomAnswerSheets.storyName = "Custom Answer Sheets List"; // Custom name in Storybook
