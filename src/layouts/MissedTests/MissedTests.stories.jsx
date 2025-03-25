import React from 'react';
import MissedTests from './MissedTests';

export default {
  title: 'Layouts/MissedTests',
  component: MissedTests,
};

const Template = (args) => <MissedTests {...args} />;

export const Default = Template.bind({});
Default.args = {
  testData: [
    { date: '2025-03-01', testName: 'Mathematics - Algebra' },
    { date: '2025-03-05', testName: 'Physics - Motion' },
    { date: '2025-03-10', testName: 'Chemistry - Organic' },
  ],
};
