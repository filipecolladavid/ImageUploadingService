import "./App.css";
import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        {loading ? <>Loading</> : <>{text}</>}
        <button
          onClick={() => {
            setLoading(!loading);
            fetch("http://api:8000/").then((response) => {
              let r = response.json();
              setText(r.status);
              setLoading(false);
              console.log(r)
            });
          }}
        >
          Click me
        </button>
      </header>
    </div>
  );
}

export default App;
