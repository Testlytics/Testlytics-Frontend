import React from 'react';
import Exams from './Exams';
import { RecoilRoot } from "recoil";

export default {
  title: 'Pages/Exams',
  component: Exams,
  decorators: [
        (Story) => (
          <RecoilRoot>
            <Story />
          </RecoilRoot>
        ),
      ],
};

const Template = (args) => <Exams {...args} />;

// Default Story
export const Default = Template.bind({});
Default.args = {};
