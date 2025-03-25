import BarGraph from "./BarGraph";

export default {
  title: "Components/BarGraph",
  component: BarGraph,
};

const Template = (args) => <BarGraph {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: [
    { label: "A", value: 40, value2: 30, value3: 20 },
    { label: "B", value: 60, value2: 50, value3: 30 },
    { label: "C", value: 80, value2: 70, value3: 50 },
  ],
};
