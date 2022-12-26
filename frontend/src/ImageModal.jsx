import Response from "./Response";

import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

import { baseUrl } from "./App";
import ImageFetch from "./ImageFetch";

const ImageModal = ({ show, handleClose, id }) => {

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add an Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ImageFetch id={id} />
      </Modal.Body>
    </Modal>
  );
}

export default ImageModal;