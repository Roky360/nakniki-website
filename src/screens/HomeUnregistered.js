import {Component} from "react";

class HomeUnregistered extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <div>
                <div className="center" >
                    <img src={window.location.origin + "/avatars/NaknikiLogo.jpg"} alt="Nakniki-Netflix Logo" className="logo" />
                    <p className="title-1 center my-4">To watch billions of high quality NaknikiMovies:</p>
                    <div className="center" >
                        <button className="btn-main">Log in</button>
                    </div>
                    <span className="m-4"/>
                    <p className="subtitle center mb-0">Or if you don't have an account</p>
                    <p className="tiny-text mt-0">For the low price of your Nakniki-credit-card</p>
                    <button className="btn-main center my-3">Sign up</button>
                </div>
            </div>
        );
    }
}

export default HomeUnregistered;
