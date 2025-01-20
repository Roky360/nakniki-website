import {useState, useRef, useEffect, useCallback} from "react";
import '../services/RequestSender'
import {sendGet} from "../services/RequestSender";
import {useUser} from "../services/UserContext";
import DefaultPopup from "../components/DefaultPopup";
import CreateMovieForm from "./CreateMovieForm";
import CreateCategory from "./CreateCategory";
import Alert from "../components/Alert";
import CategoryBadge from "../components/CategoryBadge";

function AdminManagement() {
    const {user} = useUser();
    const createMoviePopupRef = useRef(null);
    const createCategoryPopupRef = useRef(null);

    const [categories, setCategories] = useState([]);
    const [movies, setMovies] = useState({});

    const [error, setError] = useState(null);
    const [msg, showMsg] = useState(null);

    const loadMovies = useCallback(async () => {
        await sendGet('/movies', user.token)
            .then(res => {
                if (res.status === 200) {
                    setMovies(res.data);
                } else {
                    setError(res.data.error);
                }
            })
            .catch((err) => {
                setError(err.message);
            });
    }, [user.token]);

    const loadCategories = useCallback(async () => {
        await sendGet('/categories', user.token)
            .then(res => {
                if (res.status === 200) {
                    setCategories(res.data);
                } else {
                    setError(res.data.error);
                }
            })
            .catch((err) => {
                setError(err.message);
            });
    }, [user.token]);

    const reloadCategories = async () => loadCategories();
    const reloadMovies = async () => loadMovies();

    // load categories and movies on first load
    useEffect(() => {
        loadCategories().then();
        loadMovies().then();
    }, [loadCategories, loadMovies]);

    const closeCategoryPopup = () => createCategoryPopupRef.current.close();

    return (
        <div style={{marginLeft: "20vw", marginRight: "20vw"}}>
            <p className="title-1 center">Admin Panel</p>
            <div className="center">
                {/* Create movie button */}
                <DefaultPopup
                    ref={createMoviePopupRef}
                    modal
                    triggerElement={
                        <button className="btn-main">Create movie</button>
                    }
                    content={<CreateMovieForm
                        closePopup={() => {
                            createMoviePopupRef.current.close();
                            reloadMovies().then(); // reload movies
                        }}/>}
                />

                <span className="m-4"/>
                {/* Create category button */}
                <DefaultPopup
                    modal
                    ref={createCategoryPopupRef}
                    triggerElement={
                        <button className="btn-main">Create category</button>
                    }
                    content={<CreateCategory onComplete={reloadCategories} closePopup={closeCategoryPopup}/>}
                />
            </div>

            <div className="m-4"/>

            {/* Categories */}
            <p className="title-2">All categories</p>
            <div>
                {!categories &&
                    <p className="center">Loading categories...</p>
                }
                {categories &&
                    categories.map(cat =>
                        <CategoryBadge key={cat._id} name={cat} showControls
                                       onEdit={reloadCategories} onDelete={reloadCategories}/>
                    )
                }
            </div>

            <div className="mt-4"/>

            {/* Movies */}
            <p className="title-2">All movies</p>
            <div>
                {!movies &&
                    <p className="center">Loading movies...</p>
                }
                {movies &&
                    null
                }
            </div>

            {/* Alerts */}
            {error &&
                <Alert type="error" message={error}/>
            }
            {msg &&
                <Alert type="info" message={msg}/>
            }
        </div>
    );
}

export default AdminManagement;
