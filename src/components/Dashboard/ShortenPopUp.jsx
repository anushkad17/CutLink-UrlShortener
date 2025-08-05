import React from "react";
import Modal from "@mui/material/Modal";
import CreateNewShorten from "./CreateNewShorten";

const ShortenPopUp = ({ open, setOpen, refetch }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="shorten-modal-title"
      aria-describedby="shorten-modal-description"
      disableAutoFocus
    >
      <div className="flex justify-center items-center h-full w-full">
        <CreateNewShorten setOpen={setOpen} refetch={refetch} />
      </div>
    </Modal>
  );
};

export default ShortenPopUp;
