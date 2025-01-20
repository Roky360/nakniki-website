import Appbar from "./components/Appbar";
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AdminManagement from "./screens/AdminManagement";
import Login from "./screens/Login";
import {UserProvider} from "./services/UserContext";

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Appbar />
                <Routes>
                    <Route path="/" element={<AdminManagement/>}/>
                    <Route path="/movies" element={<Movies/>}/>
                    <Route path="/manage" element={<Manage/>}/>
                    <Route path="/search" element={<Search/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </UserProvider>
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

export default App;