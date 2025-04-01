import React from 'react';
import TestName from './TestName';

export default {
  title: 'Components/TestName',
  component: TestName,
};

const Template = (args) => <TestName {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Sample Test',
};