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
