import Appbar from "./components/Appbar";
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AdminManagement from "./screens/AdminManagement";
import Login from "./components/Login";

function App() {
    return (
        <BrowserRouter>
            <Login/>
        </BrowserRouter>
    );
}

export default App;
