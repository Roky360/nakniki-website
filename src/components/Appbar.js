import React from 'react';
import {Navbar} from "react-bootstrap";
import Icon from './Icon';
import ThemeSwitcherButton from "./ThemeSwitcherButton";
import {Link} from "react-router-dom";

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
                    this.tabs.map((tab, i) => (
                            <Link
                                to={`/${tab === "Home" ? "" : tab.toLowerCase()}`}
                                key={i}
                                onClick={() => this.onTabChange(i)}
                                style={{textDecoration: 'none'}}
                            >
                                <p className={"nav-tab" + (this.state.activeTab === i ? "-active" : "")}>{tab}</p>
                            </Link>
                        )
                    )
                }
                {/* Left side */}
                <div className="container justify-content-end">
                    {/* Search button */}
                    {this.state.isSignedIn
                        ? <Link
                            to={'/search'}
                            onClick={() => this.onTabChange(-1)}
                            style={{textDecoration: 'none'}}
                        >
                            <Icon className="pressable" icon="search" padding="12pt"/>
                        </Link>
                        : null}
                    {/* Theme switcher */}
                    {this.state.isSignedIn ? <ThemeSwitcherButton/> : null}
                    {/*TODO: profile pic here*/}
                    {/*<p>PROFILE</p>*/}
                    {!this.state.isSignedIn
                        ? <Link
                            to={'/login'}
                            onClick={() => this.onTabChange(-1)}
                            style={{textDecoration: 'none'}}
                        >
                            <button className="btn-text">Login</button>
                        </Link>
                        : null}
                </div>
            </Navbar>
        );
    }

    onTabChange = tab => {
        this.setState(prevState => ({activeTab: tab}));
    }
}

export default Appbar;
