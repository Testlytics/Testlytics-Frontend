import React from 'react';
import SubmitModal from './SubmitModal';

export default {
  title: 'Components/SubmitModal',
  component: SubmitModal,
};

const Template = (args) => <SubmitModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  onConfirm: (query) => alert(`Submitted with query: ${query}`),
  onCancel: () => alert('Cancelled'),
};
