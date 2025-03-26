import { RecoilRoot } from "recoil";
import ManageUsersPage from "./ManageUsersPage";

export default {
  title: "Pages/ManageUsersPage",
  component: ManageUsersPage,
};

const Template = (args) => (
  <RecoilRoot>
    <ManageUsersPage {...args} />
  </RecoilRoot>
);

export const Default = Template.bind({});
Default.args = {};
