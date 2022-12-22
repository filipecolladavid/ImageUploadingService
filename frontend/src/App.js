import "./App.css";

import Images from "./Images";
import AddImageModal from "./AddImageModal";
import SeeImgModal from "./SeeImgModal";

import { HiOutlinePlusCircle } from "react-icons/hi";
import { Container } from "react-bootstrap";
import { useState } from "react";

export const baseUrl = "http://0.0.0.0:8000";

function App() {
  const [showForm, setShowForm] = useState(false);
  const handleCloseForm = () => setShowForm(false);
  const handleShowForm = () => setShowForm(true);

  const [selected, setSelected] = useState(null);
  const [showImg, setShowImg] = useState(false);
  const handleCloseImg = () => {
    setSelected(null);
    setShowImg(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Uploading WebApp</h1>
      </header>
      <Container>
        <Images
          selected={selected}
          setSelected={setSelected}
          setShowImg={setShowImg}
        />
        <div className="add-button">
          <HiOutlinePlusCircle size={50} onClick={handleShowForm} />
        </div>
      </Container>

      {showForm && (
        <AddImageModal show={showForm} handleClose={handleCloseForm} />
      )}
      {showImg && (
        <SeeImgModal
          selected={selected}
          show={showImg}
          handleClose={handleCloseImg}
        />
      )}
    </div>
  );
}

export default App;
