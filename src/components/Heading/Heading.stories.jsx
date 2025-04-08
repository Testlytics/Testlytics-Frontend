import React from "react";
import Heading from "./Heading";

export default {
  title: "Components/Heading",
  component: Heading,
  argTypes: {
    text: { control: "text" },
    size: { control: "text" },
    align: { control: { type: "radio", options: ["left", "center", "right"] } },
    weight: { control: { type: "radio", options: ["300", "400", "500", "600", "700"] } },
  },
};

const Template = (args) => <Heading {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "Live Exams",
  size: "24px",
  align: "left",
  weight: "600",
};

export const CenterAligned = Template.bind({});
CenterAligned.args = {
  text: "Upcoming Tests",
  size: "28px",
  align: "center",
  weight: "700",
};

export const RightAligned = Template.bind({});
RightAligned.args = {
  text: "Test Results",
  size: "22px",
  align: "right",
  weight: "500",
};
