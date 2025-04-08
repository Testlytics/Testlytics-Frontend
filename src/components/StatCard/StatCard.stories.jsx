import React from "react";
import StatCard from "./StatCard";
import { FaUserGraduate } from "react-icons/fa"; // Import an icon

export default {
  title: "Components/StatCard",
  component: StatCard,
};

const Template = (args) => <StatCard {...args} />;

// ✅ Default StatCard (without button)
export const TotalUsers = Template.bind({});
TotalUsers.args = {
  heading: "Check Your Class Grade",
  value: "A+",
  variant: "default",
};

// ✅ Default StatCard (without button)
export const ActiveUsers = Template.bind({});
ActiveUsers.args = {
  heading: "Active Users",
  value: "85",
  variant: "default",
};

// ✅ StatCard with Button
export const UsersWithButton = Template.bind({});
UsersWithButton.args = {
  heading: "New Signups",
  value: "50",
  variant: "withButton",
  buttonText: "View More",
  onButtonClick: () => alert("Button Clicked!"),
};

// ✅ StatCard with Icon
export const UsersWithIcon = Template.bind({});
UsersWithIcon.args = {
  heading: "Total Students",
  variant: "withIcon",
  icon: <FaUserGraduate size={80}  />,
};
