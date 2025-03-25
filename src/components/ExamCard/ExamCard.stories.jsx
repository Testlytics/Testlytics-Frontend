import React from 'react';
import ExamCard from './ExamCard';

export default {
  title: 'Components/ExamCard',
  component: ExamCard,
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
   
    value: { control: 'number' },
    fetchData: { control: 'function' },
    onButtonClick: { action: 'button clicked' },
  },
};

// Template for all stories
const Template = (args) => <ExamCard {...args} />;


export const Default = Template.bind({});
Default.args = {
  text: 'Sample ',
 
};