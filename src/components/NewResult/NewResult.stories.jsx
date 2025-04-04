import React from 'react';
import NewResult from './NewResult';

export default {
  title: 'Components/NewResult',
  component: NewResult,
};

export const Default = () => (
  <NewResult
    subject="Mathematics"
    testName="Mid Term Test"
    publishedBy="Mr. John Doe"
    score="85%"
    grade="A"
    accuracy="92%"
    onViewResponsesClick={() => alert('Viewing Responses')}
  />
);
