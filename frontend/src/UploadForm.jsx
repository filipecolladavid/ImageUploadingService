import { Form, Row, Button } from "react-bootstrap";

const UploadForm = ({ onFormChange, handleSubmit, setUploadFile, fileInputRef, validated }) => {
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

export default UploadForm;