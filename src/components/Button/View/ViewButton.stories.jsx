import React from 'react';
import ViewButton from './ViewButton';

export default {
  title: 'Components/Button/ViewButton', // This defines where it appears in Storybook sidebar
  component: ViewButton,
};

export const Primary = () => (
  <ViewButton text="View Responses" onClick={() => alert('Clicked!')} />
);

export const Secondary = () => (
  <ViewButton text="View" variant="secondary" onClick={() => alert('Secondary Clicked!')} />
);
