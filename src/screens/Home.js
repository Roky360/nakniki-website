import React from 'react';
import { useUser } from "../services/UserContext";
import HomeRegister from "./HomeRegister";
import HomeUnregistered from "./HomeUnregistered";

const Home = () => {
    const { user } = useUser();

    if (user) {
        return <HomeRegister />;
    }

    return <HomeUnregistered />;
};

export default Home;
