import React from 'react';
import UpcomingCard from './UpcomingCard';

export default {
  title: 'Components/UpcomingCard',
  component: UpcomingCard,
};

const Template = (args) => <UpcomingCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  date: '30/03/2025',
  testName: 'Physics - Laws of Motion',
  time: '10:00 to 12:30',
  score: '50',
  onViewClick: () => alert('View button clicked!'),
};
