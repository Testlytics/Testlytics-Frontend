import React from "react";
import { RecoilRoot } from "recoil";
import ManageUsersLayout from "./ManageUsersLayout";

export default {
  title: "Layouts/ManageUsersLayout",
  component: ManageUsersLayout,
  args: {
    mainHeading: "Manage Users",
    subHeading: "Add User",
  },
};

const Template = (args) => (
  <RecoilRoot>
    <ManageUsersLayout {...args} />
  </RecoilRoot>
);

export const Default = Template.bind({});
Default.args = {};
