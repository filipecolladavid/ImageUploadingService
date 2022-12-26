import { useState, useEffect } from "react";
import { baseUrl } from "./App";

const ImageFetch = ({ id }) => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchImages = () => {
      fetch(baseUrl + 'post/' + id)
        .then((response) => {
          if (cancelled) return;
          if (response.ok) return response.json();
          else {
            if (response.status === 404) {
              setError("Post not found");
            }
            else throw new Error(response);
          }
        })
        .then((data) => {
          console.log(data);
          if (!cancelled) {
            setImage(data);
          }
        })
        .catch((err) => {
          setError("Something went wrong")
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

  if (error) return <>{error}</>

  return (
    <img src={image.src} alt="Image selected" style={{ width: "100%" }}></img>
  )
}

export default ImageFetch;

// {loading ?
//   <>Loading ...</>
//   : error ?
//     <Response error={error} obj={"Imamge"} action={"Fetch"} />
//     :
//     <>{image.title}</>
// }