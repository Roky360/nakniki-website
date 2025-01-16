import React from 'react';
import {Navbar} from "react-bootstrap";
import Icon from './Icon';
import ThemeSwitcherButton from "./ThemeSwitcherButton";

class Appbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 0,
            isSignedIn: true,
            isAdmin: true,
            isDarkMode: true,
        }
        this.tabs = [
            "Home",
            "Movies"
        ];
        if (this.state.isAdmin) {
            this.tabs.push("Manage");
        }
    }

    render() {
        return (
            <Navbar className="appbar">
                {/* TODO: logo here */}
                { // tabs
                    this.tabs.map((tab, i) =>
                        <p className={"nav-tab" + (this.state.activeTab === i ? "-active" : "")}>{tab}</p>
                    )
                }
                {/* Left side */}
                <div className="container justify-content-end">
                    {/* Search button */}
                    {this.state.isSignedIn ? <Icon className="pressable" icon="search" padding="12pt"/> : null}
                    {/* Theme switcher */}
                    {this.state.isSignedIn ? <ThemeSwitcherButton/> : null}
                    {/*TODO: profile pic here*/}
                    {/*<p>PROFILE</p>*/}
                    {!this.state.isSignedIn ? <button className="btn-text">Login</button> : null}
                </div>
            </Navbar>
        );
    }

    switchTheme() {
        this.setState(prevState => ({}))
    }
}

export default Appbar;
