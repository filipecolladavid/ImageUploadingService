import UploadForm from "./UploadForm";

import { useState, useRef } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai"
import { baseUrl } from "./App";

const AddImageModal = ({ show, handleClose }) => {

  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({});
  const [uploadFile, setUploadFile] = useState([]);
  const fileInputRef = useRef();


  const onFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const postData = async () => {

    let formData = new FormData();
    formData.append("image", uploadFile);

    const response = await fetch(
      baseUrl + "/upload?" + new URLSearchParams({
        title: values["title"],
        desc: values["desc"],
        author: values["author"]
      }),
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          mode: "Access-Control-Allow-Origin",
        },
        body: formData,
      }
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        else if (response.status === 400) setError("Type of file is not supported");
        else setError("Something went wrong");
        throw new Error("Something went wrong.", response);
      })
      .then(text => {
        console.log("Request successful", text);
        return text;
      })
      .catch(error => {
        console.log("Request failed", error);
      });
      console.log(response);
  }


  const handleSubmit = async (event) => {

    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      event.stopPropagation();
    }
    else {
      setLoading(true);
      setSubmited(true);
      await postData();
      setLoading(false);
    }
    setValidated(true);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add an Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ?
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          :
          (submited ?
            (!error ?
              <>Uploaded with success<AiFillCheckCircle color="green" size={40} /></> :
              <>{error}<AiFillCloseCircle color="red" size={40} /> </>
            ) :
            <UploadForm
              onFormChange={onFormChange}
              handleSubmit={handleSubmit}
              setUploadFile={setUploadFile}
              fileInputRef={fileInputRef}
              validated={validated}
            />
          )}
      </Modal.Body>
    </Modal >
  );
}

export default AddImageModal;