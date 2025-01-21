import React, {useEffect, useState} from 'react';
import Icon from "../components/Icon";
import { sendGet } from "../services/RequestSender";
import MovieCard from "../components/MovieCard";
import {useUser} from "../services/UserContext";
import {useNavigate} from "react-router-dom";

const Search = () => {

    // Define the state
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState('');
    const [firstSearch, setFirstSearch] = useState(true);
    const {user} = useUser();
    const navigate = useNavigate();

    // when the input change update the search query
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // trigger when the user search
    const handleSearch = async () => {
        try {
            setFirstSearch(false)

            console.log(user);

            // send the request
            const response = await sendGet('/movies/search/' + searchQuery, user.token, {}, {query: searchQuery});

            if (response.status === 200) {
                setSearchResults(response.data);
                console.log(response.data);
            } else {
                console.error(`Search failed with status: ${response.status}`);
                setError('Search failed');
            }
        }
        catch (err) {
            const errorMessage = err.response?.data?.errors|| 'An unexpected error occurred';
            setError(Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage);
            console.log(error);
        }
    };

    // if the user press enter it will trigger the search
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user]);

    if (!user) {
        return null;
    }

    return (
        <div>
            {/* display the page title */}
            <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', paddingTop: '10px' }}>
                <p className="title-2 m-4">Search your Nakniki-Movie</p>
            </div>

            {/* Display the search input + search icon */}
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <span className={"m-4"}></span>
                <input
                    className="form-control text-input"
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    style={{
                        width: '30%',
                        padding: '10px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        outline: 'none',
                    }}
                />

                {/* Search Icon */}
                <Icon
                    icon="search"
                    padding="10px"
                    style={{
                        fontSize: '24px',
                        marginLeft: '10px',
                        cursor: 'pointer',
                    }}
                    onClick={handleSearch}
                />
            </div>

            {/* small message to user */}
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '15px'}}>
                <p className="paragraph" style={{
                    fontSize: '14px',
                    display: 'inline',
                    margin: '0',
                    textAlign: 'center'
                }}>
                    Didn't find your movie? Watch something else.
                </p>
            </div>

            {/* display search results (movies) */}
            <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'left',
                        gap: '20px',
                        marginTop: '50px',
                        paddingLeft: '30px'
                    }}>
                        {searchResults.length > 0 ? (
                            searchResults.map((movie) => (
                                <MovieCard
                                    movie={movie}
                                />
                            ))
                        ) : (!firstSearch &&
                            <div style={{width: '100%', textAlign: 'center'}}>
                                <p>No movies found</p>
                            </div>
                        )}
            </div>
        </div>
    );
}

export default Search;
