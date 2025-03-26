import Table from "./Table";

export default {
  title: "Components/Table",
  component: Table,
  argTypes: {
    columns: { control: "object" },
    data: { control: "object" },
  },
};

const Template = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
  columns: ["ID", "Name", "Score"],
  data: [
    ["101", "John Doe", "85"],
    ["102", "Jane Smith", "92"],
    ["103", "Michael Brown", "78"],
  ],
};