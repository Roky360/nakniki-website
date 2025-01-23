import React from 'react';
import { useUser } from "../services/UserContext";
import HomeUnregistered from "./HomeUnregistered";
import HomeRegistered from "./HomeRegistered";

const Home = () => {
    const { user } = useUser();

    if (user) {
        return <HomeRegistered />;
    }
    return <HomeUnregistered />;
};

export default Home;
