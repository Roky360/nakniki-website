import Appbar from "./components/Appbar";
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Appbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/movies" element={<Movies/>}/>
                <Route path="/manage" element={<Manage/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
            {/*<div className="container justify-content-end">*/}
            {/*    <button className="btn-main m-4">Button</button>*/}
            {/*    <button className="btn-main m-4" disabled>Button</button>*/}
            {/*    <button className="btn-text">Button</button>*/}
            {/*    <input className="text-input"/>*/}
            {/*    <p className="tinted">Tinted text</p>*/}
            {/*    <Container className="card">*/}
            {/*      <p>Just text</p>*/}
            {/*    </Container>*/}
            {/*</div>*/}
        </BrowserRouter>
    );
}

function Home() {
    return (<p>Home</p>);
}

function Movies() {
    return (<p>Movies</p>);
}

function Manage() {
    return (<p>Manage</p>);
}

function Search() {
    return (<p>Search</p>);
}

function Login() {
    return (<p>Login</p>);
}

export default App;
