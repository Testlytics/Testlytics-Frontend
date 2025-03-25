import { RecoilRoot } from "recoil"; // ✅ Import RecoilRoot for state management
import StudentPage from "./StudentPage";
import Navbar from "../../components/Navbar/Navbar";
import students from "./students"; // ✅ Import student data

export default {
  title: "Pages/StudentPage",
  component: StudentPage,
  decorators: [(Story) => <RecoilRoot><Story /></RecoilRoot>], // ✅ Wrap stories with RecoilRoot
};

const Template = (args) => <StudentPage {...args} />;

export const Default = Template.bind({});

Default.args = {
  navbar: <Navbar />,  // ✅ Pass Navbar component
  studentList: students, // ✅ Pass student data
};
