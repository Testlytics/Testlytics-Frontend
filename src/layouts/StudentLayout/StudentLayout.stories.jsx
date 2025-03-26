import StudentLayout from "./StudentLayout";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import StudentDetails from "../../components/StudentDetails/StudentDetails";
import Table from "../../components/Table/Table";
import BarGraph from "../../components/BarGraph/BarGraph";
import LineGraph from "../../components/LineGraph/LineGraph";
import Rectangle from "../../components/Rectangle/Rectangle";

export default {
  title: "Layouts/StudentLayout",
  component: StudentLayout,
};

const Template = (args) => <StudentLayout {...args} />;

export const Default = Template.bind({});
const tableData = {
  columns: ["Subjects", "Test 1", "Test 2", "Test 3"],
  data: [
    { Subjects: "Math", "Test 1": 85, "Test 2": 90, "Test 3": 88 },
    { Subjects: "Science", "Test 1": 78, "Test 2": 85, "Test 3": 80 },
    { Subjects: "History", "Test 1": 92, "Test 2": 88, "Test 3": 95 },
    { Subjects: "English", "Test 1": 88, "Test 2": 79, "Test 3": 84 },
  ],
};

Default.args = {
  profilePicture: (
    <ProfilePicture imageUrl="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
  ),
  studentDetails: (
    <StudentDetails firstName="John Doe" studentId="12345" rank="1" />
  ),
  tableData: tableData,
  barGraphData: [
    { label: "Math", value: 95 },
    { label: "Science", value: 88 },
    { label: "English", value: 92 },
  ],
  lineGraphData: [
    { label: "Week 1", marks: 80 },
    { label: "Week 2", marks: 85 },
    { label: "Week 3", marks: 60 },
    { label: "Week 4", marks: 95 },
  ],
  rectangleOneText: (
    <Rectangle leftText="Performance" rightText="85%" />
  ),
  rectangleTwoText: (
    <Rectangle leftText="Improvements" rightText="+5%" />
  ),
};
