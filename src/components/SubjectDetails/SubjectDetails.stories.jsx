import React from 'react';
import SubjectDetails from './SubjectDetails';

export default {
  title: 'Components/SubjectDetails',
  component: SubjectDetails,
  args: {
    subject: 'Mathematics',
    totalExams: 12,
  },
};

const Template = (args) => <SubjectDetails {...args} />;

export const Default = Template.bind({});
Default.args = {
  subject: 'Mathematics',
  totalExams: 12,
};

export const ScienceSubject = Template.bind({});
ScienceSubject.args = {
  subject: 'Science',
  totalExams: 8,
};

export const HistorySubject = Template.bind({});
HistorySubject.args = {
  subject: 'History',
  totalExams: 5,
};
