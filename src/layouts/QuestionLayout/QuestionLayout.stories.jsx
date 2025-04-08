import React from 'react';
import { RecoilRoot } from 'recoil';
import QuestionLayout from './QuestionLayout';

export default {
  title: 'Layouts/QuestionLayout',
  component: QuestionLayout,
};

export const Default = () => (
  <RecoilRoot>
    <QuestionLayout />
  </RecoilRoot>
);
