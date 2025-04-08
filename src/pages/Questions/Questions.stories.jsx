import React from 'react';
import Questions from './Questions';
import { RecoilRoot } from "recoil";

export default {
  title: 'Pages/Questions',
  component: Questions,
  decorators: [
      (Story) => (
        <RecoilRoot>
          <Story />
        </RecoilRoot>
      ),
    ],
};

const Template = (args) => <Questions {...args} />;

// Default Story
export const Default = Template.bind({});
Default.args = {};
