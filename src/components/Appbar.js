import React, {useEffect, useState} from 'react';
import { Navbar } from "react-bootstrap";
import Icon from './Icon';
import ThemeSwitcherButton from "./ThemeSwitcherButton";
import { Link } from "react-router-dom";
import {useUser} from "../services/UserContext";
import DefaultPopup from "./DefaultPopup";
import AvatarCircle from "./AvatarCircle";
import UserPopupContent from "./UserPopupContent";

const Appbar = () => {

    // get the user
    const { user } = useUser();

    // define state for active tab
    const [activeTab, setActiveTab] = useState(0);
    const [isSignedIn, setIsSignedIn] = useState(!user);

    const isAdmin = true;


    const tabs = ["Home", "Movies"];
    if (isAdmin) {
        tabs.push("Manage");
    }

    // handle tab change
    const onTabChange = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    // Update isSignedIn when user changes
    useEffect(() => {
        setIsSignedIn(!!user);  // update based on user context
    }, [user]);


    return (
        <Navbar className="appbar">

            {/* app logo */}
            <div>
                <img
                    src={'avatars/naknikiTitle.png'}
                    alt={'avatars/naknikiTitle.png'}
                    style={{ height: '40px' }}
                />
            </div>


            {/* Render tabs */}
            {tabs.map((tab, i) => (
                <Link
                    to={`/${tab === "Home" ? "" : tab.toLowerCase()}`}
                    key={i}
                    style={{textDecoration: 'none'}}
                    onClick={() => onTabChange(i)} // Update active tab
                >
                    <p className={`nav-tab${activeTab === i ? "-active" : ""}`}>{tab}</p>
                </Link>
            ))}

            {/* Left side */}
            <div className="container justify-content-end">
                {/* Search button */}
                {isSignedIn && (
                    <Link
                        to={'/search'}
                        style={{textDecoration: 'none'}}
                    >
                        <Icon className="pressable" icon="search" padding="12pt"/>
                    </Link>
                )}

                {/* Theme switcher */}
                {isSignedIn && (
                    <div style={{marginRight: '15px'}}>
                        <ThemeSwitcherButton/>
                    </div>
                )}

                {/* profile pic */}
                {isSignedIn && user && (
                    <DefaultPopup
                        position={"bottom right"}
                        triggerElement={<div><AvatarCircle
                            src={user.profile_pic}
                            radius="50px"/></div>}
                        content={<UserPopupContent/>}
                    />
                )}

                {/* Login button if the user not sign in*/}
                {!isSignedIn && (
                    <Link
                        to={'/login'}
                        style={{textDecoration: 'none'}}
                    >
                        <button className="btn-text">Login</button>
                    </Link>
                )}
            </div>
        </Navbar>
    );
};

export default Appbar;
