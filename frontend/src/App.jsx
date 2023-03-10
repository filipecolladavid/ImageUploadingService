import "./App.css";

import ImageList from "./ImageList";
import ImageUploadForm from "./ImageUploadForm";
import ImageModal from "./ImageModal";

import { HiOutlinePlusCircle } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

export const baseUrl = "http://0.0.0.0:8000/";

function App() {

  const [showForm, setShowForm] = useState(false);
  const handleOpenForm = () => {
    setShowForm(true);
  }
  const handleCloseForm = () => {
    window.location.reload(false);
    setShowForm(false);
  }

  const [selected, setSelected] = useState(null);
  const handleSelect = (id) => {
    setSelected(id);
    handleOpenImg();
  }
  const [showImg, setShowImg] = useState(false);
  const handleOpenImg = () => {
    setShowImg(true);
  }
  const handleCloseImg = () => {
    setSelected(null);
    setShowImg(false);
  }

  useEffect(() => {
    console.log(selected);
    if (selected) handleOpenImg()
    else handleCloseImg();
  }, [selected])

  return (
    <>
      <Container>
        <header className="App-header">
          <h1>Image Uploading WebApp</h1>
        </header>
        <ImageList handleSelect={handleSelect} />
        <div className="add-button">
          <HiOutlinePlusCircle size={50} onClick={handleOpenForm} />
        </div>
      </Container>

      {
        showForm &&
        <ImageUploadForm
          show={showForm}
          handleClose={handleCloseForm}
          id={selected}
        />
      }
      {showImg && <ImageModal show={showImg} handleClose={handleCloseImg} id={selected} />}

    </>
  );
}

export default App;
