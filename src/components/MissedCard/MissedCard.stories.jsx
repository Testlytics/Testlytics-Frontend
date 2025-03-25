import React from 'react';
import MissedCard from './MissedCard';

export default {
  title: 'Components/MissedCard',
  component: MissedCard,
};

const Template = (args) => <MissedCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  date: '18/06/2024',
  testName: 'Measurements',
  onViewClick: () => alert('Viewing test details...'),
};
