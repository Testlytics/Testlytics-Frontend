import React from "react";
import { RecoilRoot } from "recoil";
import ManageUsersTableLayout from "./ManageUsersTableLayout";

export default {
  title: "Layouts/ManageUsersTableLayout",
  component: ManageUsersTableLayout,
};

const sampleStudents = [
  { id: 1, name: "John Doe", modifiedAt: "2025-03-25" },
  { id: 2, name: "Jane Smith", modifiedAt: "2025-03-24" },
];

const sampleAdmins = [
  { id: 1, name: "Alice Brown", modifiedAt: "2025-03-23" },
  { id: 2, name: "Bob Johnson", modifiedAt: "2025-03-22" },
];

const Template = (args) => (
  <RecoilRoot>
    <ManageUsersTableLayout {...args} />
  </RecoilRoot>
);

export const Default = Template.bind({});
Default.args = {
  students: sampleStudents,
  admins: sampleAdmins,
};
