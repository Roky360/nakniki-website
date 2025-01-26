import React, { useEffect, useState } from 'react';
import { sendGet } from '../services/RequestSender';
import CategoryBadge from './CategoryBadge';
import MovieCard from "./MovieCard";
import { useUser } from '../services/UserContext';
import {useNavigate} from "react-router-dom";

const MoviePopupContent = ({ movie }) => {

    const { user } = useUser();
    const navigate = useNavigate();
    const [recommendMovies, setRecommendMovies] = useState([]);
    const [categoryNames, setCategoryNames] = useState([]);

    const navigateToMovie = () => {
        navigate('/watch-movies/'+movie._id);
    }

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }).format(date);
        } catch {
            return 'Unknown year';
        }
    };

    // Fetch recommended movies
    useEffect(() => {
        const fetchRecommendedMovies = async () => {
            try {
                const response = await sendGet(`/movies/${movie._id}/recommend`, user.token);
                setRecommendMovies(response.data || []);
            } catch (error) {
                console.error(`Failed to fetch recommended movies for ID ${movie._id}:`, error);
            }
        };

        fetchRecommendedMovies();
    }, [movie._id, user.token]);

    // Fetch category names
    useEffect(() => {
        const fetchCategoryNames = async () => {
            const names = [];
            for (const categoryId of movie.categories || []) {
                try {
                    const response = await sendGet(`/categories/${categoryId}`, user.token);
                    names.push(response.data.name);
                } catch (error) {
                    console.error(`Failed to fetch category name for ID ${categoryId}:`, error);
                    names.push('Unknown Category');
                }
            }
            setCategoryNames(names);
        };

        fetchCategoryNames();
    }, [movie.categories, user.token]);

    return (
        <div className="movie-popup-content">
            {/* Flex container for the picture and title */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginTop: '20px' }}>
                {/* Movie Picture */}
                <div className="movie-card">
                    <img
                        src={window.location.origin + (movie.thumbnail || "/avatars/defaultAvatar.png")}
                        alt={movie.name}
                        className="movie-pic"
                    />
                </div>

                {/* Movie Title and Details Container */}
                <div>
                    {/* Title */}
                    <p className="title-1" style={{ marginTop: '50px', marginBottom: '0px' }}>{movie.name}</p>

                    {/* Movie Details */}
                    <div>
                        <div className="categories-container"
                             style={{ display: 'flex', flexWrap: 'wrap', gap: '2px', marginBottom: '0px' }}>
                            {categoryNames.map((categoryName, index) => (
                                <CategoryBadge name={{name: categoryName}} key={index} />
                            ))}
                        </div>
                        <p className="paragraph" style={{marginBottom: '0px', fontSize: '13px'}}>
                            {movie.published ? formatDate(movie.published) : 'Unknown year'}
                        </p>
                        <p className="paragraph" style={{ marginBottom: '0px' }}>{(movie.actors || []).join(", ") || 'N/A'}</p>
                    </div>
                </div>
            </div>

            {/* Additional Details */}
            <div>
                <p
                    className="btn-main"
                    onClick={navigateToMovie}
                    style={{ width: '30%', padding: '8px 0', textAlign: 'center', marginBottom: '2px' }}
                >
                    Watch Now
                </p>
                <p className="paragraph" style={{ marginBottom: '2px' }}>
                    <strong>{movie.length || 'Unknown length'} minutes</strong>
                </p>
                <p className="paragraph" style={{ marginBottom: '20px' }}>
                    {movie.description || 'No description available.'}
                </p>
            </div>

            {/* Recommended Movies */}
            {recommendMovies.length > 0 && (
                <div>
                    <p className="subtitle">For you</p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {recommendMovies.map((recMovie, index) => (
                            <MovieCard key={index} movie={recMovie} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MoviePopupContent;