import React from 'react';
import Calendar from './Calendar';

export default {
  title: 'Components/Calendar',
  component: Calendar,
};

const Template = (args) => <Calendar {...args} />;

export const Default = Template.bind({});
Default.args = {
  upcomingDates: [
    new Date(2025, 2, 15),
    new Date(2025, 2, 20),
    new Date(2025, 2, 28),
  ],
};
