import StudentDetails from "./StudentDetails";

export default {
  title: "Components/StudentDetails",
  component: StudentDetails,
  argTypes: {
    firstName: { control: "text" },
    id: { control: "text" },
    rank: { control: "text" },
  },
};

const Template = (args) => <StudentDetails {...args} />;

export const Default = Template.bind({});
Default.args = {
  firstName: "John Doe",
  id: "1001",
  rank: "1",
};

export const AnotherStudent = Template.bind({});
AnotherStudent.args = {
  firstName: "Jane Smith",
  id: "1002",
  rank: "2",
};
