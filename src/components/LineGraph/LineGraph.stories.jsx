import React from "react";
import LineGraph from "./LineGraph";

export default {
  title: "Components/LineGraph",
  component: LineGraph,
};

const sampleData = [
  { label: "Jan", value: 10 },
  { label: "Feb", value: 25 },
  { label: "Mar", value: 18 },
  { label: "Apr", value: 30 },
  { label: "May", value: 40 },
];

export const Default = (args) => <LineGraph {...args} />;
Default.args = {
  data: sampleData,
  lines: [{ dataKey: "value", color: "#5A643C" }],
  fillColor: "#5A643C",
};

export const CustomFill = (args) => <LineGraph {...args} />;
CustomFill.args = {
  data: sampleData,
  lines: [{ dataKey: "value", color: "#B6CA7A" }],
  fillColor: "#B6CA7A",
};
