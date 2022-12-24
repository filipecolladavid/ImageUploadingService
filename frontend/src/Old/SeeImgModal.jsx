import ResponseValidation from "./ResponseValidation";
import UpdateForm from "./UpdateForm";

import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";

import { baseUrl } from "./App1";

const SeeImgModal = ({ selected, show, handleClose }) => {

  const postUrl = baseUrl + "post/"

  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submited, setSubmited] = useState(false);
  const [error, setError] = useState(null);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchImg = async () => {
      await fetch(postUrl + selected)
        .then(response => {
          if (response.ok) return response.json();
          else if (response.status === 404) {
            setError("Post not found");
          }
          throw new Error("Something went wrong.", response);
        })
        .then(data => {
          setImg(data)
          console.log(data);
        })
        .catch(error => {
          console.log("Request failed", error);
        });
    }
    fetchImg();
    setLoading(false);
  }, [postUrl, selected])

  const deleteImg = async () => {
    setLoading(true);
    setSubmited(true);
    const response = await fetch(postUrl + selected,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          mode: "Access-Control-Allow-Origin",
        }
      })
      .then(response => {
        if (response.ok) response.json();
        else if (response.status === 404) setError("Post not found");
        throw new Error("Something went wrong", response);
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log("Request failed", error);
      })
    setLoading(false);
    console.log(response);
  }

  const updateImg = () => {
    setUpdate(true);
    alert("You're updating: " + img._id)
  }

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      {loading ? <>loading</> : <>Results</>}
    </Modal >
    // loading ?

    //   <Spinner animation="border" role="status">
    //     <span className="visually-hidden">Loading...</span>
    //   </Spinner>

    //   :

    //   img &&
    //   <Modal size="lg" show={show} onHide={handleClose}>
    //     <Modal.Header closeButton>
    //       <Modal.Title>{img.title}</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>
    //       {loading ?
    //         <Spinner animation="border" role="status">
    //           <span className="visually-hidden">Loading...</span>
    //         </Spinner>
    //         :
    //         submited ?
    //           <ResponseValidation error={error} type={"Delete"} />
    //           :
    //           update ?
    //             <UpdateForm />
    //             :
    //             <img src={img.src} style={{ height: "100%", width: "100%" }} alt={img.title} />
    //       }
    //     </Modal.Body>
    //     <Modal.Footer>
    //       {!submited &&
    //         <>
    //           <Button variant="danger" onClick={deleteImg}>Delete</Button>
    //           <Button variant="warning" onClick={updateImg}>Update</Button>
    //         </>
    //       }
    //       <Button variant="success" onClick={handleClose}>Ok</Button>
    //     </Modal.Footer>
    //   </Modal >
  );
}

export default SeeImgModal;