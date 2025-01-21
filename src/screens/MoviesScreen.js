import React, { useEffect, useState } from 'react';
import { sendGet } from '../services/RequestSender';
import CategoryRow from '../components/CategoryRow';
import { useUser } from '../services/UserContext';

const MoviesScreen = () => {
    const { user } = useUser();
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [debugInfo, setDebugInfo] = useState([]);  // Store debug information

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                console.log("Fetching movies with token:", user.token, "and userId:", user.user_id);

                const response = await sendGet('/movies', user.token, { 'user_id': user.user_id });

                console.log("API Response:", response.data);

                if (response.data && response.data.length > 0) {
                    setCategories(response.data);

                    // Store debug data for UI display
                    setDebugInfo(response.data.map(category => ({
                        category: category.category,
                        movies: category.movies.map(movie => movie.name)
                    })));
                } else {
                    console.warn("No categories found.");
                    setCategories([]);
                    setDebugInfo(["No categories found in API response."]);
                }
            } catch (error) {
                console.error("Error fetching movies by categories:", error.response?.data || error.message);
                setError('Failed to load categories.');
                setDebugInfo(["Error fetching data: " + (error.response?.data?.error || error.message)]);
            }
        };

        fetchMovies();
    }, [user]);

    return (
        <div className="registered-home-page">
            <h1>Welcome to Nakniki-Netflix</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <h2>Debug Info:</h2>
            <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '5px' }}>
                {JSON.stringify(debugInfo, null, 2)}
            </pre>

            <h2>Categories:</h2>
            {categories.length > 0 ? (
                categories.map((category, index) => (
                    <div key={index} style={{ marginBottom: '30px' }}>
                        <CategoryRow
                            categoryName={category.category}
                            moviesList={category.movies}
                        />
                        <h3>Category: {category.category}</h3>
                        <ul>
                            {category.movies.map((movie, idx) => (
                                <li key={idx}>{movie.name}</li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p>No categories found.</p>
            )}
        </div>
    );
};

export default MoviesScreen;
