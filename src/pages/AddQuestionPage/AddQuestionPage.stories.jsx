import React from 'react';
import { RecoilRoot } from 'recoil';
import AddQuestionPage from './AddQuestionPage';

export default {
  title: 'Pages/AddQuestionPage',
  component: AddQuestionPage,
};

export const Default = () => (
  <RecoilRoot>
    <AddQuestionPage />
  </RecoilRoot>
);
