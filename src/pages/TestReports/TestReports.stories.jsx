import React from "react";
import { RecoilRoot } from "recoil";
import TestReports from "./TestReports";

export default {
  title: "Pages/TestReports",
  component: TestReports,
  decorators: [(Story) => <RecoilRoot><Story /></RecoilRoot>], // ✅ Wrap with RecoilRoot
};

const Template = (args) => <TestReports {...args} />;

export const Default = Template.bind({});
Default.args = {};
