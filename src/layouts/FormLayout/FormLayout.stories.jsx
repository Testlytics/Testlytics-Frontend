import React from 'react';
import { RecoilRoot } from 'recoil';
import FormLayout from './FormLayout';

export default {
  title: 'Layouts/FormLayout',
  component: FormLayout,
};

export const Default = () => (
  <RecoilRoot>
    <FormLayout />
  </RecoilRoot>
);
