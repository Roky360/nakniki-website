import React, { useEffect, useState } from 'react';
import { sendGet } from '../services/RequestSender';
import CategoryRow from '../components/CategoryRow';
import { useUser } from '../services/UserContext';
import {useNavigate} from "react-router-dom";

const MoviesScreen = () => {
    const { user } = useUser();
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
            } catch (error) {
                console.error("Error:", error);
                setError('Failed to load categories.');
            }
        };

        fetchMovies();
    }, [user]);

    return (
        <div className="registered-home-page">
            <h1>INSERT MOVIE PLAYER HERE</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {categories.length > 0 ? (
                categories.map((category, index) => (
                    <CategoryRow
                        key={index}
                        categoryName={category.category}
                        moviesList={category.movies}
                    />
                ))
            ) : (
                <p>No categories found.</p>
            )}
        </div>
    );
};

export default MoviesScreen;