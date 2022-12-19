import "./App.css";
import FormUpload from "./FormUpload";
import Images from "./Images";
import { useState } from "react";


function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const baseUrl = "http://0.0.0.0:8000"
  
  async function getData() {
    let t = await fetch(baseUrl).then((response) => response.json()).then((data)=>{return data.status})
    setText(t)
  }

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="container">
          <FormUpload />
          <Images />
      </div>
    </div>
  );
}

export default App;
