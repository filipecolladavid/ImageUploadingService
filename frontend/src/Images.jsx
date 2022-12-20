import { useState, useEffect } from "react";
import ImgCard from "./ImgCard";
import { baseUrl } from "./App";
import { Row } from "react-bootstrap";

const Images = () => {

  const [loading, setLoading] = useState(true)
  const [imgs, setImgs] = useState(null)

  useEffect(() => {
    setLoading(true);
    async function getData() {
      await fetch(baseUrl + '/images')
        .then(response => response.json())
        .then(data => {
          setImgs(data)
        })
    }
    getData();
    setLoading(false);
  }, [])


  return (
    loading ? <>Loading...</>
      :
      <Row xs={1} md={4} className="g-4">
        {imgs ? imgs.map((img) => {
          return (<ImgCard img={img} />)
        }) : <>Null</>}
      </Row>
  );
}

export default Images;