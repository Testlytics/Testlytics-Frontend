import React, { useState } from "react";
import ConfirmationModal from "./DeleteConfirmationModal";

export default {
  title: "Components/ConfirmationModal",
  component: ConfirmationModal,
  tags: ["autodocs"],
};

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleConfirm = () => {
    alert("Confirmed!");
    setIsOpen(false);
  };

  const handleCancel = () => {
    alert("Cancelled.");
    setIsOpen(false);
  };

  return (
    <ConfirmationModal
      {...args}
      isOpen={isOpen}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  title: "Delete User",
  message: "Are you sure you want to delete this user?",
  confirmText: "Delete",
  cancelText: "Cancel",
};

export const Warning = Template.bind({});
Warning.args = {
  title: "Permanently Remove Data",
  message: "This action cannot be undone. Continue?",
  confirmText: "Yes, Delete",
  cancelText: "Go Back",
};

export const LongMessage = Template.bind({});
LongMessage.args = {
  title: "Heads Up!",
  message:
    "You're about to perform a critical action. Please confirm you have saved all your changes before proceeding. This step is irreversible and may cause data loss.",
  confirmText: "Proceed",
  cancelText: "Cancel",
};
