import {Navbar} from "react-bootstrap";
import Icon from './Icon';
import ThemeSwitcherButton from "./ThemeSwitcherButton";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useUser} from "../services/UserContext";
import DefaultPopup from "./DefaultPopup";
import AvatarCircle from "./AvatarCircle";
import UserPopupContent from "./UserPopupContent";

const Appbar = () => {

    // get the user
    const {user} = useUser();
    const location = useLocation();
    const navigate = useNavigate();

    const isAdmin = user && user.is_admin;

    const tabs = [
        { key: "/", value: "Home" }
    ];
    if (user) {
        tabs.push({ key: "/movies", value: "Movies" });
    }
    if (isAdmin) {
        tabs.push({ key: "/manage", value: "Manage" });
    }

    return (
        <Navbar className="appbar">

            {/* app logo */}
            <div>
                <img
                    src={'avatars/naknikiTitle.png'}
                    alt={'avatars/naknikiTitle.png'}
                    style={{height: '40px', cursor: 'pointer'}}
                    onClick={() => {navigate('/');}}
                />
            </div>

            {/* Render tabs */}
            {tabs.map((tab, i) => (
                <Link
                    to={tab.key}
                    key={i}
                    style={{textDecoration: 'none'}}
                >
                    <p className={`nav-tab${location.pathname === tab.key ? "-active" : ""}`}>{tab.value}</p>
                </Link>
            ))}

            {/* Left side */}
            <div className="container justify-content-end">
                {/* Search button */}
                {user && (
                    <Link
                        to={'/search'}
                        style={{textDecoration: 'none'}}
                    >
                        <Icon className="pressable" icon="search" padding="12pt"/>
                    </Link>
                )}

                {/* Theme switcher */}
                {user && (
                    <div style={{marginRight: '15px'}}>
                        <ThemeSwitcherButton/>
                    </div>
                )}

                {/* profile pic */}
                {user && (
                    <DefaultPopup
                        position={"bottom right"}
                        triggerElement={<div><AvatarCircle
                            src={user.profile_pic}
                            radius="50px"/></div>}
                        content={<UserPopupContent/>}
                    />
                )}

                {/* Login button if the user not sign in*/}
                {!user && (
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
