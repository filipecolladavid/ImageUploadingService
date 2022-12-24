import "./App.css";

import ImageList from "./ImageList";
import ImageUploadForm from "./ImageUploadForm";
import ImageModal from "./ImageModal";

import { HiOutlinePlusCircle } from "react-icons/hi";
import { useEffect, useState } from "react";

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
    if (selected) {
      setShowImg(true);
    }
    else setShowImg(false);
  }, [selected])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Uploading WebApp</h1>
      </header>
      <ImageList handleSelect={handleSelect} />
      <div className="add-button">
        <HiOutlinePlusCircle size={50} onClick={handleOpenForm} />
      </div>

      {showForm &&
        <ImageUploadForm
          show={showForm}
          handleClose={handleCloseForm}
        />
      }
      {showImg && <ImageModal show={showImg} handleClose={handleCloseImg} selected={selected} />}

    </div>
  );
}

export default App;
