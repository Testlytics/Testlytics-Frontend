import Rectangle from "./Rectangle";

export default {
  title: "Components/Rectangle",
  component: Rectangle,
  argTypes: {
    leftText: { control: "text" },
    rightText: { control: "text" },
  },
};

const Template = (args) => <Rectangle {...args} />;

export const Default = Template.bind({});
Default.args = {
  leftText: "Attendance",
  rightText: "Right",
};

export const Custom = Template.bind({});
Custom.args = {
  leftText: "Score",
  rightText: "100",
};
