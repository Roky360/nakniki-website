import React, {useEffect, useState} from 'react';
import {sendGet} from "../services/RequestSender";
import {useUser} from "../services/UserContext";
import MovieCard from "../components/MovieCard";

const MoviesScreen = () => {
    const {user} = useUser();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Fetch all movies
        const fetchMovies = async () => {
            try {
                const response = await sendGet('/movies/all', user.token);
                if (response.status === 200) {
                    // get all the movies and put them in movies
                    const allMovies = response.data.flatMap(category => category.movies);
                    const allMoviesDistinct = Array.from(
                        new Map(allMovies.map(item => [item._id, item])).values()
                    );
                    setMovies(allMoviesDistinct);
                }
            } catch (err) {
                console.error("Error fetching movies:", err);
            }
        };

        fetchMovies();
    }, [user?.token]);

    return (
        <div>
            {/* Title */}
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <p className="title-1" style={{marginBottom: '0px'}}>Welcome to Nakniki-Netflix</p>
                <p className="title-2" style={{fontSize: '15px', margin: '0'}}>Infinity Movies to WATCH NOW</p>
            </div>

            {/* Show All Movies */}
            <div style={{padding: '20px', marginTop: '50px', display: 'flex', gap: '25px', flexWrap: 'wrap'}}>
                {movies.map((movie, index) => (
                    <MovieCard key={index} movie={movie}/>
                ))}
            </div>
        </div>

    );
};

export default MoviesScreen;
