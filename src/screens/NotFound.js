import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div className="center mt-5">
            <p className="subtitle">
                Oops!
            </p>
            <p className="paragraph">
                404 Nakniki-Page not found!
            </p>
            <div className="mt-4">
                <Link to="/">
                    <button className="btn-main">
                        Back to Home
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
