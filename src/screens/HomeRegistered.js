import React, { useEffect, useState } from 'react';
import { sendGet } from '../services/RequestSender';
import CategoryRow from '../components/CategoryRow';
import { useUser } from '../services/UserContext';
import {useNavigate} from "react-router-dom";
import MoviePlayer from '../components/MoviePlayer';

const HomeRegistered = () => {
    const { user } = useUser();
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [randomMovie, setRandomMovie] = useState(null);

    // Sends the user to the log in screen if they're not logged
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    // Making sure that the required functions all happen asides from loading the page
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // Get request for all movies
                const response = await sendGet('/movies', user.token, { 'user_id': user.user_id });
                setCategories(response.data);

                // Extract all movies from the categories and choose a random one
                const allMovies = response.data.flatMap(category => category.movies);

                if (allMovies.length > 0) {
                    const randomIndex = Math.floor(Math.random() * allMovies.length);
                    setRandomMovie(allMovies[randomIndex]);
                }
            } catch (error) {
                setError('No promoted categories and watch list found.');
            }
        };

        if (user) {
            fetchMovies();
        }
    }, [user]);


    return (
        // The movie player that chooses a random movie, works on autoplay
        <div className="registered-home-page">
            {randomMovie && (
                <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                    <MoviePlayer src={`/api/uploads/movies/${randomMovie._id}.mp4`} autoPlay={true} showControls={false} />
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div style={{marginLeft: '10vw'}}>
                {
                    categories.map((category, index) => (
                            <div key={index} style={{ marginBottom: '30pt' }}>
                                <CategoryRow
                                    key={index}
                                    categoryName={category.category}
                                    moviesList={category.movies}
                                />
                            </div>
                        )
                    )}
            </div>
        </div>
    );
};

export default HomeRegistered;