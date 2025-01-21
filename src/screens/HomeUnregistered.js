import { Component } from "react";
import { Link } from "react-router-dom";

class HomeUnregistered extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <div className="center">
                    <img
                        src={window.location.origin + "/avatars/NaknikiLogo.jpg"}
                        alt="Nakniki-Netflix Logo"
                        className="logo"
                    />
                    <p className="title-1 center my-4">
                        To watch billions of high quality NaknikiMovies:
                    </p>
                    <div className="center">
                        <Link
                            to="/login"
                            className="btn-main"
                            style={{ textDecoration: "none" }}
                        >
                            Log in
                        </Link>
                    </div>
                    {/* Spacer for separation */}
                    <div style={{ marginTop: "40px" }} />
                    <p className="subtitle center mb-0">
                        Or if you don't have an account
                    </p>
                    <p className="tiny-text mt-0">
                        For the low price of your Nakniki-credit-card
                    </p>
                    <div className="center" style={{ marginTop: "20px" }}>
                        <Link
                            to="/Signup"
                            className="btn-main center"
                            style={{ textDecoration: "none" }}
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeUnregistered;
