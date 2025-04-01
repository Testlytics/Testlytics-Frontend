import React from "react";
import TableLayout from "./TableLayout";

export default {
  title: "Layouts/TableLayout",
  component: TableLayout,
};

const Template = (args) => <TableLayout {...args} />;

// ✅ Default Layout
export const DefaultTableLayout = Template.bind({});
DefaultTableLayout.args = {};
