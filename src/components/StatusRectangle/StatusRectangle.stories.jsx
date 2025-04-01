import React from 'react';
import StatusRectangle from './StatusRectangle';

export default {
  title: 'Components/StatusRectangle',
  component: StatusRectangle,
  argTypes: {
    text: { control: 'text' },
    status: {
      control: {
        type: 'select',
        options: ['completed', 'ongoing', 'scheduled', 'default'],
      },
    },
  },
};

const Template = (args) => <StatusRectangle {...args} />;

// Default Story
export const Default = Template.bind({});
Default.args = {
  text: 'Status Text',
  status: 'default',
};

// Completed Status
export const Completed = Template.bind({});
Completed.args = {
  text: 'Completed',
  status: 'completed',
};

// Ongoing Status
export const Ongoing = Template.bind({});
Ongoing.args = {
  text: 'Ongoing',
  status: 'ongoing',
};

// Scheduled Status
export const Scheduled = Template.bind({});
Scheduled.args = {
  text: 'Scheduled',
  status: 'scheduled',
};