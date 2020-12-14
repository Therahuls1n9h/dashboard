import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@windmill/react-ui";

export default function ConfirmModal({
  isOpen,
  title,
  message,
  onOk,
  onCancel
}) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onCancel}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{message}</ModalBody>
        <ModalFooter>
          <Button
            className="w-full sm:w-auto"
            layout="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button className="w-full sm:w-auto" onClick={onOk}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
