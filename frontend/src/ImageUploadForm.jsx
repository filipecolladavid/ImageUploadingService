import FormImg from "./FormImg";

import { Modal } from "react-bootstrap"


const ImageUploadForm = ({ show, handleClose }) => {

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add an Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormImg />
      </Modal.Body>
    </Modal>
  );
}

export default ImageUploadForm;

{/*  */}