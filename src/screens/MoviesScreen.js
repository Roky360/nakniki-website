import React, { useEffect, useState } from 'react';
import { sendGet } from '../services/RequestSender';
import CategoryRow from '../components/CategoryRow';
import { useUser } from '../services/UserContext';
import {useNavigate} from "react-router-dom";
import MoviePlayer from '../components/MoviePlayer';

const MoviesScreen = () => {
    const { user } = useUser();
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [randomMovie, setRandomMovie] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);


    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await sendGet('/movies', user.token, { 'user_id': user.user_id });
                setCategories(response.data);

                // Extract all movies from the categories and select a random one
                const allMovies = response.data.flatMap(category => category.movies);

                if (allMovies.length > 0) {
                    const randomIndex = Math.floor(Math.random() * allMovies.length);
                    setRandomMovie(allMovies[randomIndex]);
                }
            } catch (error) {
                setError('Failed to load categories.');
            }
        };

        if (user) {
            fetchMovies();
        }
    }, [user]);


    return (
        <div className="registered-home-page">
            {randomMovie && (
                <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                    <p className={"title-1"}>Now Playing: {randomMovie.name}</p>
                    <MoviePlayer src={`/api/uploads/movies/${randomMovie._id}.mp4`} autoPlay={true} />
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
    );
};

export default MoviesScreen;