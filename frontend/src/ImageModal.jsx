import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

import ImageFetch from "./ImageFetch";
import Delete from "./Delete";
import Update from "./Update"

const ImageModal = ({ show, handleClose, id }) => {

  const [update, setUpdate] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        {
          update ?
            <Update
              id={id}
              image={image}
              setImage={setImage}
              error={error}
              setError={setError}
              loading={loading}
              setLoading={setLoading}
              setUpdate={setUpdate}
            />
            :
            <ImageFetch
              id={id}
              image={image}
              setImage={setImage}
              error={error}
              setError={setError}
              loading={loading}
              setLoading={setLoading}
            />
        }
      </Modal.Body>
      {!error && !loading && !deleted && !update &&
        <Modal.Footer>
          <Delete id={id} setError={setError} error={error} setLoading={setLoading} setDeleted={setDeleted} />
          <Button variant="warning" onClick={() => setUpdate(true)}>Update</Button>
        </Modal.Footer>
      }
    </Modal >
  );
}

export default ImageModal;