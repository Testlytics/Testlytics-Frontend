import Button from "./Button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    text: { control: "text" },
    variant: { control: "select", options: ["primary", "secondary"] },
  },
};

export const Primary = (args) => <Button {...args} />;
Primary.args = {
  text: "Click Me",
  variant: "primary",
};
