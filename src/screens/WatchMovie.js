import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { sendGet } from '../services/RequestSender';
import { useUser } from "../services/UserContext";
import CategoryBadge from "../components/CategoryBadge";
import MoviePlayer from "../components/MoviePlayer";

const WatchMovie = () => {
    const { movieId } = useParams();
    const { user } = useUser();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userLoaded, setUserLoaded] = useState(false);

    useEffect(() => {
        if (user === null) {
            console.warn("Loading...");
            return;
        }

        setUserLoaded(true);

        if (!user) {
            setError("You must be logged in to watch movies.");
            setLoading(false);
            return;
        }

        if (!movieId) {
            setError("No movie ID provided.");
            setLoading(false);
            return;
        }

        const fetchMovie = async () => {
            try {
                const movieDataResponse = await sendGet(`/movies/${movieId}`, user.token, { 'user_id': user._id });

                if (movieDataResponse?.data) {
                    setMovieData(movieDataResponse.data);

                    if (movieDataResponse.data.categories?.length) {
                        fetchCategoryNames(movieDataResponse.data.categories);
                    }
                } else {
                    setError('No movie details available.');
                }
            } catch (err) {
                setError(`Failed to fetch movie details. ${err.response?.data?.error || err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();

    }, [movieId, user]);

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

    if (!userLoaded) {
        return <p className="subtitle center">Loading user data...</p>;
    }

    if (loading) {
        return <p className="subtitle center">Loading movie...</p>;
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            {error ? (
                <div className="center">
                    <div>
                        <p className="title-1 center">Your movie does not exist!</p>
                        <p className="paragraph center">Try searching for a better movie!</p>
                        <p className="tiny-text center">nerd</p>
                    </div>
                    {!user ? (
                        <button onClick={() => navigate('/login')}>Go to Login</button>
                    ) : (
                        <button className='btn-main' onClick={() => navigate('/')}>Back to home page</button>
                    )}
                </div>
            ) : movieData ? (
                <>
                    {/* Movie Player */}
                    <MoviePlayer src={`/api/uploads/movies/${movieId}.mp4`} />

                    <div style={{
                        maxWidth: '50%',
                        margin: '20pt auto',
                        textAlign: 'left',
                        lineHeight: '1.6',
                        padding: '0 20pt'
                    }}>
                        <p className="title-1">{movieData.name}</p>

                        <div style={{ marginBottom: '10px' }}>
                            {categories.map((category, index) => (
                                    <CategoryBadge key={index} name={{ name: category }} />
                                )
                            )}
                        </div>

                        <p className="paragraph mb-0">Published: {movieData.published}</p>
                        <p className="paragraph mb-0 mt-0">Actors: {movieData.actors.join(', ')}</p>
                        <p className="paragraph2 mt-0">Description: {movieData.description}</p>
                    </div>

                </>
            ) : (
                <div>
                    <p className="title-1 center">Your movie does not exist!.</p>
                    <p className="paragraph center">Try searching for a better movie!.</p>
                </div>
            )}
        </div>
    );
};

export default WatchMovie;
