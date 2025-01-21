import {useState, useRef, useEffect, useCallback} from "react";
import '../services/RequestSender'
import {sendGet} from "../services/RequestSender";
import {useUser} from "../services/UserContext";
import DefaultPopup from "../components/DefaultPopup";
import CreateMovieForm from "./CreateMovieForm";
import CreateCategory from "./CreateCategory";
import Alert from "../components/Alert";
import CategoryBadge from "../components/CategoryBadge";
import CategoryRow from "../components/CategoryRow";
import {useNavigate} from "react-router-dom";

function AdminManagement() {
    const {user} = useUser();
    const isAdmin = user && user.is_admin;
    const navigate = useNavigate();
    console.log(isAdmin)
    const createMoviePopupRef = useRef(null);
    const createCategoryPopupRef = useRef(null);

    const [categories, setCategories] = useState([]);
    const [movies, setMovies] = useState([]);

    const [error, setError] = useState(null);

    const loadMovies = useCallback(async () => {
        await sendGet('/movies/all', user.token)
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
    }, []);

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
    }, []);

    const reloadCategories = async () => loadCategories();
    const reloadMovies = async () => loadMovies();

    // load categories and movies on first load
    useEffect(() => {
        if (isAdmin) {
            console.log("OH NO")
            loadCategories().then();
            loadMovies().then();
        } else {
            navigate("/"); // redirect to home page
        }
    }, [loadCategories, loadMovies, isAdmin]);

    const closeCategoryPopup = () => createCategoryPopupRef.current.close();

    if (!(isAdmin)) {
        return null;
    }

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
                    movies.map(item =>
                            <CategoryRow key={item.category} categoryName={item.category} moviesList={item.movies}
                                         showActions onDeleteMovie={() => reloadMovies()}
                            />
                    )
                }
            </div>

            {/* Alerts */}
            {error &&
                <Alert type="error" message={error}/>
            }
        </div>
    );
}

export default AdminManagement;
