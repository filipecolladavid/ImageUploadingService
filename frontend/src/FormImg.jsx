import { useState, useRef } from "react";
import { Form, Row, Button, Spinner } from "react-bootstrap";

import Response from "./Response";

import { baseUrl } from "./App";

const FormImg = ({ }) => {

  const [validated, setValidated] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fileInputRef = useRef();
  const [uploadFile, setUploadFile] = useState([]);
  const [values, setValues] = useState(null);

  const onFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const postData = async () => {

    let formData = new FormData();
    formData.append("image", uploadFile);

    const response = await fetch(
      baseUrl + "upload?" + new URLSearchParams({
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
      await postData();
      setLoading(false);
      setSubmited(true);
    }
    setValidated(true);
  };

  if (loading) return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )

  else if (submited) return <Response error={error} obj={"Post"} action={"uploaded"}/>

  else
    return (
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Form.Group className="mb-2" controlId="title">
            <Form.Label><b>Title</b></Form.Label>
            <Form.Control
              type="text"
              name="title"
              onChange={onFormChange}
              required
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-2" controlId="author">
            <Form.Label><b>Author</b></Form.Label>
            <Form.Control
              type="text"
              name="author"
              onChange={onFormChange}
              required
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-2" controlId="desc">
            <Form.Label><b>Description</b></Form.Label>
            <Form.Control
              as="textarea"
              name="desc"
              onChange={onFormChange}
              required
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-2" controlId="file">
            <Form.Label><b>File</b></Form.Label>
            <Form.Control
              type="file"
              name="file"
              ref={fileInputRef}
              onChange={(e) => setUploadFile(e.target.files[0])}
              required
            />
          </Form.Group>
        </Row>
        < Button variant="primary" type="submit">
          Upload
        </Button>
      </Form>
    );
}

export default FormImg;