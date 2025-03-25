import LeftList from "./LeftList";

export default {
  title: "Layout/LeftList",
  component: LeftList,
  argTypes: {
    title: { control: "text" },
  },
};

const Template = (args) => <LeftList {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Student List",
};
