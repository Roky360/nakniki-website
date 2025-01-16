import './App.css';
import {Container, Button, Navbar,  } from 'react-bootstrap';

function App() {
  return (
      <div className="bg">
          {/*<header className="App-header">*/}
          {/*  <button className="btn-primary">Button</button>*/}
          {/*</header>*/}
          <Navbar bg="dark" variant="dark">
              <Container>

                  <p className="link">link</p>
                  <Button className="btn-main" disabled>Disabled</Button>
                  <Button className="btn-main">Create Account</Button>
                  {/*<p className="nav-tab-active">HOME</p>*/}
                  {/*<p className="nav-tab">HOME</p>*/}
                  {/*<Button variant="primary" className="btn-main">Create Account</Button>*/}
              </Container>
          </Navbar>
          <br/>
          <input className="form-control text-input m-4" type="email"/>
          <input type="checkbox" className="form-check-input m-4 checkbox"/>
          <p className="title-1 m-4">Title 1</p>
          <p className="title-2 m-4">Title 2</p>
          <p className="subtitle m-4">Subtitle</p>
          <p className="paragraph m-4">Paragraph</p>
          <p className="paragraph tinted m-4">Paragraph tinted</p>
          <Container className="card">
              <p>Hi inside card</p>
          </Container>
      </div>
  );
}

export default App;
