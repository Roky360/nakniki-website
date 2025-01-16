import Appbar from "./components/Appbar";
import React from "react";
import {Container} from "react-bootstrap";

function App() {
  return (
      <header>
          <Appbar />
          <div className="container justify-content-end">
              <button className="btn-main m-4">Button</button>
              <button className="btn-main m-4" disabled>Button</button>
              <button className="btn-text">Button</button>
              <input className="text-input"/>
              <p className="tinted">Tinted text</p>
              <Container className="card">
                <p>Just text</p>
              </Container>
          </div>
      </header>
  );
}

export default App;
