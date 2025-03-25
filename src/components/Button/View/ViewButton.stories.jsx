import React from 'react';
import ViewButton from './ViewButton';

export default {
  title: 'Components/Button/View',
  component: ViewButton,
  argTypes: {
    text: { control: 'text' },
    onClick: { action: 'clicked' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'disabled'],
    },
  },
};

const Template = (args) => <ViewButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: 'View',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: 'View',
  variant: 'secondary',
};

export const Disabled = Template.bind({});
Disabled.args = {
  text: 'Disabled Button',
  variant: 'disabled',
  onClick: undefined,
};
