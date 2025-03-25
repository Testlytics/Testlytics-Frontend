import React from 'react';
import { RecoilRoot } from "recoil";
import StartTest from './StartTest';

export default {
  title: 'Pages/StartTest',
  component: StartTest,
 decorators: [
      (Story) => (
        <RecoilRoot>
          <Story />
        </RecoilRoot>
      ),
    ],
};

const Template = (args) => <StartTest {...args} />;

export const Default = Template.bind({});
Default.args = {};
