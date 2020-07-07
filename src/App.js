import React, { useState } from "react";
import "./App.css";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

function App() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");

  function sendText(e) {
    e.preventDefault();
    ipcRenderer.send("env", text);
    ipcRenderer.on("ret", (event, resp) => {
      setResponse(resp);
    });
  }

  return (
    <div className="App">
      <form onSubmit={sendText}>
        <input
          type="text"
          placeholder="Texto"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <button type="submit">Enviar</button>
      </form>
      <div>{response ? response : null}</div>
    </div>
  );
}

export default App;
