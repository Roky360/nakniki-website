import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { sendGet } from '../services/RequestSender';
import { useUser } from "../services/UserContext";

const WatchMovie = () => {
    const { movieId } = useParams();
    const { user } = useUser();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userLoaded, setUserLoaded] = useState(false);  // New state to track when user is loaded

    useEffect(() => {
        console.log("Component mounted. Checking dependencies...");
        console.log("movieId:", movieId);
        console.log("User from context:", user);

        // Wait for the user data to be available before proceeding
        if (user === null) {
            console.warn("User data not available yet. Waiting...");
            return;
        }

        setUserLoaded(true);

        if (!user) {
            console.error("User is not authenticated.");
            setError("You must be logged in to watch movies.");
            setLoading(false);
            return;
        }

        if (!movieId) {
            console.error("No movie ID provided.");
            setError("No movie ID provided.");
            setLoading(false);
            return;
        }

        // Fetch movie details from backend
        const fetchMovie = async () => {
            console.log(`Fetching movie with ID: ${movieId}`);

            try {
                console.log("Current user from context:", user);
                console.log("User token:", user.token);

                const response = await sendGet(`/uploads/movies/${movieId}`, user.token, { 'user_id': user._id });

                console.log("API Response:", response);

                if (response && response.data) {
                    console.log("Movie data received:", response.data);
                    setMovie(response.data);
                } else {
                    console.warn("No movie data received from the server.");
                    setError('No movie data available.');
                }
            } catch (err) {
                console.error("Error fetching movie:", err);
                setError(`Failed to fetch movie details. ${err.response?.data?.error || err.message}`);
            } finally {
                console.log("Finished fetching movie data.");
                setLoading(false);
            }
        };

        fetchMovie();
    }, [movieId, user]);

    if (!userLoaded) {
        return <p>Loading user data...</p>;
    }

    if (loading) {
        console.log("Loading movie...");
        return <p>Loading movie...</p>;
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            {error ? (
                <div>
                    <p style={{ color: 'red' }}>{error}</p>
                    {!user ? (
                        <button onClick={() => navigate('/login')}>Go to Login</button>
                    ) : (
                        <button onClick={() => navigate('/')}>Back to Movies</button>
                    )}
                </div>
            ) : movie ? (
                <>
                    <h1>Now Playing: {movie.name}</h1>
                    <video controls width="80%">
                        <source src={`http://localhost:21069/api/uploads/movies/${movieId}`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <br />
                    <button onClick={() => navigate('/')}>Back to Movies</button>
                </>
            ) : (
                <p>No movie found.</p>
            )}
        </div>
    );
};

export default WatchMovie;
