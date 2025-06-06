import React, {useEffect, useState} from "react";
import axios from "axios";
import DropdownMultiSelect from "../components/DropdownMultiSelect";
import {sendGet} from "../services/RequestSender";
import Alert from "../components/Alert";
import {useUser} from "../services/UserContext";

const CreateMovieForm = ({movie, closePopup}) => {
    const {user} = useUser();
    const isNew = !movie || !movie._id; // whether we create a new movie. if false then we edit a movie
    const [formData, setFormData] = useState({
        name: isNew ? "" : movie.name,
        published: isNew ? "" : movie.published ? new Date(movie.published).toISOString().split("T")[0] : "",
        actors: isNew ? "" : movie.actors,
        length: isNew ? "" : movie.length,
        description: isNew ? "" : movie.description,
        categories: isNew ? [] : movie.categories || [],
        thumbnail: null,
    });

    const [thumbnailPreview, setThumbnailPreview] = useState(isNew ? null : movie.thumbnail || null);
    const [movieFile, setMovieFile] = useState("");
    const [categoriesOptions, setCategoriesOptions] = useState([]);

    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");

    // load categories from server
    useEffect(() => {
        sendGet('/categories', user.token)
            .then(res => {
                if (res.status === 200) {
                    setCategoriesOptions(
                        res.data.map(cat => ({value: cat._id, label: cat.name + (cat.promoted ? " (💲)" : "")}))
                    )
                }
            })
    }, [user.token]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleFileChange = (e) => {
        const {name, files} = e.target;
        if (files && files[0]) {
            if (name === "thumbnail" && files[0]) {
                setThumbnailPreview(URL.createObjectURL(files[0]));
                setFormData({...formData, [name]: files[0]});
            } else if (name === "movieFile" && files[0]) {
                // Set the new file with the custom name
                setMovieFile(files[0]);
            }
        }
    };

    const handleCategoryChange = (selectedOptions) => {
        setFormData({
            ...formData,
            categories: selectedOptions.map((option) => option.value),
        });
    };

    const createMovie = async () => {
        // send request to create movie
        let movieId = null;
        try {
            const res = await axios.post('/api/movies', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${user.token}`
                },
            });
            if (res.status === 201) {
                movieId = res.headers['location'].toString().replace('\\', '/').split('/').slice(-1);
            } else {
                setError(res.data.error);
                return false;
            }
        } catch (e) {
            const errorMessage = e.response?.data?.errors || 'An unexpected error occurred';
            setError(Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage);
            return false; // don't continue with uploading the movie
        }

        // send request to upload the movie file
        const movieForm = new FormData();
        movieForm.append('movie', movieFile);
        try {
            const res = await axios.post('/api/uploads', movieForm, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${user.token}`,
                    "movie_id": movieId,
                },
            });
            if (res.status === 201) {
                setMsg("Movie created");
                return true;
            } else {
                setError(res.data.error);
            }
        } catch (e) {
            const errorMessage = e.response?.data?.errors || 'An unexpected error occurred';
            setError(Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage);
        }

        return false;
    }

    const editMovie = async () => {
        // send request to edit movie
        const movieId = movie._id;
        try {
            const res = await axios.put(`/api/movies/${movieId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${user.token}`
                },
            });
            if (res.status !== 204) {
                setError(res.data.error);
                return false;
            }
        } catch (e) {
            const errorMessage = e.response?.data?.errors || 'An unexpected error occurred';
            setError(Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage);
            return false; // don't continue with uploading the movie
        }

        // send request to replace the movie file
        const movieForm = new FormData();
        movieForm.append('movie', movieFile);
        try {
            const res = await axios.put(`/api/uploads/${movieId}`, movieForm, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${user.token}`,
                    "movie_id": movieId,
                },
            });
            if (res.status === 204) {
                setMsg("Movie updated");
                return true;
            } else {
                setError(res.data.error);
            }
        } catch (e) {
            const errorMessage = e.response?.data?.errors || 'An unexpected error occurred';
            setError(Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage);
        }

        return false;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // send the request to create/edit the movie
        let success;
        if (isNew) {
            success = await createMovie();
        } else {
            success = await editMovie();
        }

        // if operation was successful, close the popup
        if (success && closePopup) {
            closePopup();
        } else {
            setLoading(false);
        }
    };

    const captionsStyle = "paragraph mb-2";

    return (
        <form onSubmit={handleSubmit} className="container mt-2 mb-xxl-5" style={{width: '32vw'}}>
            <p className="title-2 center">{(isNew ? "Create" : "Edit") + " movie"}</p>

            <div className="mb-3">
                <p className={captionsStyle}>Name</p>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control text-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <p className={captionsStyle}>Published</p>
                <input
                    type="date"
                    id="published"
                    name="published"
                    className="form-control text-input"
                    value={formData.published}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <p className={"mb-0"}>Actors</p>
                <p className="fst-italic small mb-2">Separated by commas</p>
                <input
                    type="text"
                    id="actors"
                    name="actors"
                    className="form-control text-input"
                    value={formData.actors}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <p className={"mb-0"}>Movie length</p>
                <input
                    type="number"
                    id="length"
                    name="length"
                    className="form-control text-input"
                    value={formData.length}
                    onChange={handleChange}
                    min="0"
                    required
                />
            </div>

            <div className="mb-3">
                <p className={captionsStyle}>Description</p>
                <textarea
                    id="description"
                    name="description"
                    className="form-control text-input"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>

            <div className="mb-3">
                <p className={captionsStyle}>Categories</p>
                <p className="fst-italic small mb-2">Categories with "💲" are promoted.</p>
                <DropdownMultiSelect
                    isMulti
                    options={categoriesOptions}
                    placeholder="Select Categories"
                    value={categoriesOptions.filter(opt => formData.categories.includes(opt.value))}
                    onChange={handleCategoryChange}
                />
            </div>

            <div className="mb-3">
                <p className={captionsStyle}>Thumbnail</p>
                {!isNew &&
                    <p className="fst-italic small mb-2" style={{color: 'red'}}>Thumbnail must be uploaded again.</p>
                }
                <input
                    type="file"
                    id="thumbnail"
                    name="thumbnail"
                    className="form-control text-input"
                    accept="image/*"
                    onChange={handleFileChange}
                    required={isNew}
                />
                {thumbnailPreview && (
                    <div className="mt-2">
                        <img src={thumbnailPreview} alt="Thumbnail Preview" style={{width: "100px"}}/>
                    </div>
                )}
            </div>

            <div className="mb-3">
                <p className={captionsStyle}>Movie file</p>
                {!isNew &&
                    <p className="fst-italic small mb-2" style={{color: 'red'}}>Video file must be uploaded again.</p>
                }
                <input
                    type="file"
                    id="movieFile"
                    name="movieFile"
                    className="form-control text-input"
                    accept="video/*"
                    onChange={handleFileChange}
                    required
                />
            </div>

            <div className="center">
                <button type="submit" className="btn-main mt-4"
                        disabled={loading}>{isNew ? "Create" : "Update"}</button>
            </div>

            {error &&
                <Alert type="error" message={error} onClose={() => setError("")}/>
            }
            {msg &&
                <Alert type="success" message={msg} onClose={() => setMsg("")}/>
            }
        </form>
    );
};

export default CreateMovieForm;
