import "./App.css";

import Images from "./Images";
import AddImageModal from "./AddImageModal";

import { HiOutlinePlusCircle } from "react-icons/hi";
import { Container } from "react-bootstrap";
import { useState } from "react";

export const baseUrl = "http://0.0.0.0:8000";

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Uploading WebApp</h1>
      </header>
      <Container>
        <Images />
        <div className="add-button">
          <HiOutlinePlusCircle size={50} onClick={handleShow} />
        </div>
      </Container>
      {show && <AddImageModal show={show} handleClose={handleClose} />}
    </div>
  );
}

export default App;
