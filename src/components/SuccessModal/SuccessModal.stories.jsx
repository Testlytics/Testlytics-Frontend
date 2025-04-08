import React, { useState } from "react";
import SuccessModal from "./SuccessModal";
import FailureModal from "./FailureModal";

export default {
  title: "Components/SuccessModal",
  component: SuccessModal,
};

export const Default = () => {
  const [open, setOpen] = useState(true);
  return (
    <SuccessModal
      show={open}
      onClose={() => setOpen(false)}
      message="Operation completed successfully!"
    />
  );
};

export const Failure = () => {
  const [open, setOpen] = useState(true);
  return (
    <FailureModal
      onClose={() => setOpen(false)}
      message="Something went wrong. Please try again."
    />
  );
};
