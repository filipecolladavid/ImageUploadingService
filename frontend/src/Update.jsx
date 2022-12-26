import { useState } from "react";
import { Form, Row, Button } from "react-bootstrap";
import { baseUrl } from "./App";

const Update = ({ id, image, loading, setLoading, setUpdate }) => {

  const [values, setValues] = useState(null);
  const [error, setError] = useState(null);
  const [valid, setValid] = useState(false);


  const onFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (values) {
      setLoading(true);
      await fetch(
        baseUrl + "post/" + id,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            mode: "Access-Control-Allow-Origin",
          },
        }
      )
        .then((response) => {
          if (!response.ok) throw new Error(response.statusText);
          else setValid(true);
        })
        .catch((err) => {
          setError(err);
        })
      setLoading(false);
    }
  }

  if (loading) return <>Loading...</>

  if (valid) return <>Success</>

  if (error) return <>Success</>

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Form.Group className="mb-2" controlId="title">
          <Form.Label><b>Title</b></Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder={image.title}
            onChange={onFormChange}
          />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group className="mb-2" controlId="desc">
          <Form.Label><b>Description</b></Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            placeholder={image.description}
            onChange={onFormChange}
          />
        </Form.Group>
      </Row>
      <Button onClick={() => setUpdate(false)}>Back</Button>
      < Button variant="warning" type="submit">
        Update
      </Button>
    </Form>
  );
}

export default Update;