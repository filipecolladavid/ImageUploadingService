import { useState, useEffect } from "react";
import ImgCard from "./ImgCard";
import { baseUrl } from "./App1";
import { Row, Spinner } from "react-bootstrap";
import ResponseValidation from "./ResponseValidation";

const Images = ({ selected, setSelected, setShowImg }) => {

  const [loading, setLoading] = useState(true)
  const [imgs, setImgs] = useState(null)

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const data = await fetch(baseUrl + 'images')
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Something went wrong.", response);
        })
        .then(data => {
          return data;
          // console.log(data);
        })
        .catch(error => {
          console.log("Request failed", error);
        });
      setImgs(data);
    }
    fetchData();
    setLoading(false);
  }, [selected])


  return (
    loading ?

      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>

      :

      <Row xs={1} md={4} className="g-4">
        {imgs.length === 0 ?
          <>No images to be shown</>
          :
          imgs.map((img) => {
            return (<div key={img._id}><ImgCard img={img} selected={selected} setSelected={setSelected} setShowImg={setShowImg} /></div>)
          })
        }
      </Row>

  );
}

export default Images;