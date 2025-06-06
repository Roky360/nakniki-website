import React, {useEffect, useState, useRef} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {sendGet, sendPost} from '../services/RequestSender';
import {useUser} from "../services/UserContext";
import CategoryBadge from "../components/CategoryBadge";
import MoviePlayer from "../components/MoviePlayer";

const WatchMovie = () => {
    const {movieId} = useParams();
    const {user} = useUser();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const timeoutRef = useRef(null);

    const markMovieAsWatched = async () => {
        try {
            await sendPost(`/movies/${movieId}/recommend`, user.token, {'user_id': user._id}).then(res => {
                if (res.status === 200) {
                    console.log(`Movie ${movieId} marked as watched successfully`);
                }
            });
        } catch (err) {
            console.error(`Failed to mark movie ${movieId} as watched:`, err);
        }
    };

    // Check if user is null, But also give enough time to check if the movie ID is wrong
    useEffect(() => {
        if (!user) {
            timeoutRef.current = setTimeout(() => {
                navigate('/login');
            }, 420); // Wait a nice amount of milliseconds before redirecting (Check whether the movie doesn't exist or the user)
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [user, navigate]);

    // Enter only if the user exists
    useEffect(() => {
        if (!user) return;

        if (!movieId) {
            setError("No movie ID provided.");
            setLoading(false);
            return;
        }

        // Gets the movie data
        const fetchMovie = async () => {
            try {
                const movieDataResponse = await sendGet(`/movies/${movieId}`, user.token, {'user_id': user._id});

                if (movieDataResponse?.data) {
                    setMovieData(movieDataResponse.data);
                    if (movieDataResponse.data.categories?.length) {
                        fetchCategoryNames(movieDataResponse.data.categories);
                    }
                } else {
                    setError('No movie details available.');
                }
            } catch (err) {
                // In case there is no such movie
                if (err.response?.status === 404) {
                    setError('Movie not found.');
                } else {
                    setError(`Failed to fetch movie details. ${err.response?.data?.error || err.message}`);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
        markMovieAsWatched();
    }, [movieId, user]);


    // Get all the categories of the movie to display
    const fetchCategoryNames = async (categoryIds) => {
        try {
            const categoryNames = await Promise.all(
                categoryIds.map(async (categoryId) => {
                    const response = await sendGet(`/categories/${categoryId}`, user.token);
                    return response.data.name;
                })
            );
            setCategories(categoryNames);
        } catch (error) {
            console.error("Error fetching category names:", error);
            setCategories([]);
        }
    };

    // Function to format date into mm/dd/yyyy
    const formatDate = (dateString) => {
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // While loading
    if (loading) {
        return <p className="subtitle center">Loading movie...</p>;
    }

    // Page format
    return (
        <div style={{textAlign: 'center', marginTop: '20px'}}>
            {error ? (
                <div className="center">
                    <div>
                        <p className="title-1 center">Your movie does not exist!</p>
                        <p className="paragraph center">Try searching for a better movie!</p>
                        <p className="tiny-text center">nerd</p>
                    </div>
                    {
                        <button className='btn-main' onClick={() => navigate('/')}>Back to home page</button>
                    }
                </div>
            ) : (
                <>
                    {/* Movie Player */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                         className={"center"}
                    >
                        <div style={{width: '50vw'}}>
                            <MoviePlayer src={`/api/uploads/movies/${movieId}.mp4`}/>
                        </div>

                        <div style={{
                            width: '50vw',
                            maxWidth: '50vw',
                            textAlign: 'left',
                            margin: '20px auto 0',
                            padding: '0 20px',
                        }}>
                            <p className="title-1 mb-0">{movieData.name}</p>

                            <div style={{marginBottom: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
                                {categories.map((category, index) => (
                                    <CategoryBadge key={index} name={{name: category}}/>
                                ))}
                            </div>

                            <p className="paragraph mb-0 mt-0">Published: {formatDate(movieData.published)}</p>
                            <p className="paragraph mb-0 mt-0">Actors: {movieData.actors.join(', ')}</p>
                            <p className="paragraph2 mt-0">Description: {movieData.description}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default WatchMovie;
