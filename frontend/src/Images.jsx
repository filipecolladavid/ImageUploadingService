import { useState, useEffect } from "react";
import ImgCard from "./ImgCard";
import { baseUrl } from "./App";
import { Row, Spinner } from "react-bootstrap";

const Images = ({ selected, setSelected, setShowImg }) => {

  const [loading, setLoading] = useState(true)
  const [imgs, setImgs] = useState(null)

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await fetch(baseUrl + '/images')
        .then(response => response.json())
        .then(data => {
          setImgs(data)
          console.log(data);
        })
    }
    fetchData();
    setLoading(false);
  }, [])

  useEffect(() => {
    console.log(selected)
  }, [selected])


  return (
    loading ?

      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>

      :

      <Row xs={1} md={4} className="g-4">
        {imgs ? imgs.map((img) => {
          return (<ImgCard img={img} selected={selected} setSelected={setSelected} setShowImg={setShowImg} />)
        }) :
          <>Something went wrong</>}
      </Row>

  );
}

export default Images;