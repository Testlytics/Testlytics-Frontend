import React from 'react';
import MissednUpcoming from './MissednUpcoming';
import { RecoilRoot } from "recoil";

export default {
  title: 'Pages/MissednUpcoming',
  component: MissednUpcoming,
  decorators: [
          (Story) => (
            <RecoilRoot>
              <Story />
            </RecoilRoot>
          ),
 ],
};

const Template = (args) => <MissednUpcoming {...args} />;

// Default Story
export const Default = Template.bind({});
Default.args = {};
