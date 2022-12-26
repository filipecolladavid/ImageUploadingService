import { useState, useEffect } from "react";
import { baseUrl } from "./App";

const ImageFetch = ({ id, image, setImage, error, setError, loading, setLoading, deleted }) => {

  useEffect(() => {
    let cancelled = false;

    const fetchImages = () => {
      fetch(baseUrl + 'post/' + id)
        .then((response) => {
          if (cancelled) return;
          if (response.ok) return response.json();
          else throw new Error(response.statusText);
        })
        .then((data) => {
          if (!cancelled) {
            setImage(data);
            setError(null);
          }
        })
        .catch((err) => {
          console.log(err);
          setError(err);
        })
        .finally(() => {
          if (!cancelled) {
            setLoading(false);
          }
        });
    };
    fetchImages();

    return () => {
      cancelled = true;
    };
  }, [])


  if (loading) return <>Loading...</>

  // TODO - replace error Response
  if (error) return <>{error}</>

  if (deleted) return <>Deleted</>

  return (
    <img src={image.src} alt="Image selected" style={{ width: "100%" }}></img>
  )
}

export default ImageFetch;
