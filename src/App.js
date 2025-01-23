import Appbar from "./components/Appbar";
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AdminManagement from "./screens/AdminManagement";
import Login from "./screens/Login";
import {UserProvider} from "./services/UserContext";
import Search from "./screens/Search";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import MoviesScreen from "./screens/MoviesScreen";
import WatchMovie from "./screens/WatchMovie";

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Appbar />
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/movies" element={<MoviesScreen/>}/>
                    <Route path="/manage" element={<AdminManagement/>}/>
                    <Route path="/search" element={<Search/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/watch-movies/:movieId" element={<WatchMovie />} />
                </Routes>
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;
