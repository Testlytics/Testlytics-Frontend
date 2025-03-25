import ListCard from "./ListCard";

export default {
  title: "Components/ListCard",
  component: ListCard,
  argTypes: {
    id: { control: "text" },
    name: { control: "text" },
    isSelected: { control: "boolean" },
  },
};

const Template = (args) => <ListCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: "1001",
  name: "John Doe",
  isSelected: false,
};

export const Selected = Template.bind({});
Selected.args = {
  id: "100  2",
  name: "Jane Doe",
  isSelected: true,
};
