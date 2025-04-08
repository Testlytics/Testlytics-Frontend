import React from "react";
import AreaChartComponent from "./AreaChartComponent";

export default {
  title: "Charts/AreaChart",
  component: AreaChartComponent,
};

const Template = (args) => <AreaChartComponent {...args} />;

export const Default = Template.bind({});
Default.args = {};
