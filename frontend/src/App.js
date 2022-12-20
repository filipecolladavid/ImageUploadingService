import "./App.css";
import Images from "./Images";
import { useState } from "react";

export const baseUrl = "http://0.0.0.0:8000";

function App() {
  // const [text, setText] = useState("");
  // const [loading, setLoading] = useState(true);

  // async function getData() {
  //   let t = await fetch(baseUrl)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       return data.status;
  //     });
  //   setText(t);
  // }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Uploading WebApp</h1>
      </header>
      <Images />
    </div>
  );
}

export default App;
