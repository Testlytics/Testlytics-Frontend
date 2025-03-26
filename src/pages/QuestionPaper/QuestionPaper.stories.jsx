// src/pages/QPandQuestionsPage.stories.jsx
import React from "react";
import QuestionPaper from "./QuestionPaper";
import { RecoilRoot } from "recoil";

// Story Metadata
export default {
  title: "Pages/QuestionPaper",
  component: QuestionPaper,
  decorators: [
            (Story) => (
              <RecoilRoot>
                <Story />
              </RecoilRoot>
            ),
   ],
  parameters: {
    layout: "fullscreen",
  },
};

// Template to render the component
const Template = (args) => <QuestionPaper {...args} />;

// Default View
export const DefaultView = Template.bind({});
DefaultView.args = {};

// Variant with Custom Data
export const CustomView = Template.bind({});
CustomView.args = {};
