import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { baseUrl } from "./App";

const SeeImgModal = ({ selected, show, handleClose }) => {

  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchImg = async () => {
      await fetch(baseUrl + "/get/" + selected)
        .then(response => response.json())
        .then(data => {
          setImg(data)
          console.log(data);
        })
    }
    fetchImg();
    setLoading(false);
  }, [])

  const deleteImg = () => {
    alert("You're deleting: " + img._id)
  }

  const updateImg = () => {
    alert("You're updating: " + img._id)
  }

  return (
    loading ?

      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>

      :

      img &&
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{img.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={img.src} style={{ height: "100%", width: "100%" }} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteImg}>Delete</Button>
          <Button variant="warning" onClick={updateImg}>Update</Button>
          <Button variant="success" onClick={handleClose}>Ok</Button>
        </Modal.Footer>
      </Modal >
  );
}

export default SeeImgModal;