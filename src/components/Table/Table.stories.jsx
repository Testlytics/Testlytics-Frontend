import Table from "./Table";

export default {
  title: "Components/Table",
  component: Table,
  args: {
    columns: ["Name", "Age", "Score"], // Default column names
    data: [
      { Name: "Alice", Age: 22, Score: 85 },
      { Name: "Bob", Age: 24, Score: 92 },
      { Name: "Charlie", Age: 21, Score: 78 },
    ],
  },
};

const Template = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
  columns: ["Name", "Age", "Score"],
  data: [
    { Name: "Alice", Age: 22, Score: 85 },
    { Name: "Bob", Age: 24, Score: 92 },
    { Name: "Charlie", Age: 21, Score: 78 },
  ],
};

export const EmptyTable = Template.bind({});
EmptyTable.args = {
  columns: [],
  data: [],
};
