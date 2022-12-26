import { baseUrl } from "./App";

import { Button } from "react-bootstrap";

const Delete = ({ id, setError, setLoading, setDeleted }) => {

  const handleDelete = async () => {
    setLoading(true);
    await fetch(
      baseUrl + "post/" + id,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          mode: "Access-Control-Allow-Origin",
        },
      }
    )
      .then((response) => {
        console.log(response);
        if (response.ok) return response.json();
        else throw new Error(response.statusText);
      })
      .then((data) => {
        console.log(data);
        setDeleted(true);
        setError(null);
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      })
    setLoading(false);
  }

  return (
    <Button variant="danger" onClick={handleDelete}>Delete</Button>
  );
}

export default Delete;