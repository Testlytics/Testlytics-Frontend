import React from 'react';
import UpcomingTests from './UpcomingTests';

export default {
  title: 'Layouts/UpcomingTests',
  component: UpcomingTests,
};

const Template = (args) => <UpcomingTests {...args} />;

// Default Story
export const Default = Template.bind({});
Default.args = {};
