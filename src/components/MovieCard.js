import React from 'react';
import DefaultPopup from './DefaultPopup';
import { sendGet } from '../services/RequestSender';
import CategoryBadge from "./CategoryBadge";

class MovieCard extends React.Component {

    // constructor
    constructor(props) {
        super(props);

        // get the default pic
        this.defaultPic = window.location.origin + "/avatars/defaultAvatar.png";

        // define the state
        this.state = {
            movieName: props.movie.name,
            moviePic: this.defaultPic, // TODO add - this.props.movie.thumbnail
            movieDescription: props.movie.description || "No description available.",
            movieActors: props.movie.actors || [],
            movieCategoriesNames: [],
            movieCategories: props.movie.categories || [],
            moviePublished: props.movie.published || "Unknown year",
            movieLength: props.movie.length || "Unknown length",
            recommendMovies: [], // holds the recommended movies
            editFunc: props.editFunc || null,
            deleteFunc: props.deleteFunc || null,
        };
    }

    componentDidUpdate(prevProps) {
        const { movie, deleteFunc, editFunc } = this.props;

        // if the movie changed
        if (prevProps.movie._id !== movie._id) {
            this.setState(
                {
                    movieName: movie.name,
                    moviePic: this.defaultPic, // TODO put movie pic
                    movieDescription: movie.description || "No description available.",
                    movieActors: movie.actors || [],
                    movieCategories: movie.categories || [],
                    movieCategoriesNames: [], // Reset to an empty array before fetching new names
                    moviePublished: movie.published || "Unknown year",
                    movieLength: movie.length || "Unknown length",
                    recommendMovies: [], // Reset recommendations to avoid showing stale data
                },
                async () => {
                    await this.fetchCategoryNames(); // Fetch new category names
                    await this.fetchRecommendedMovies(); // Fetch new recommended movies
                }
            );
        }

        // Update the movie name if it changed
        if (prevProps.movie.name !== movie.name) {
            this.setState({ movieName: movie.name });
        }

        // Update the movie thumbnail if it changed, with proper default fallback
        if (prevProps.movie.thumbnail !== movie.thumbnail) {
            this.setState({ moviePic: this.defaultPic }); // TODO put this movie pic
        }

        // Update the movie description if it changed
        if (prevProps.movie.description !== movie.description) {
            this.setState({ movieDescription: movie.description || "No description available." });
        }

        // Update the movie actors if they changed
        if (prevProps.movie.actors !== movie.actors) {
            this.setState({ movieActors: movie.actors || [] });
        }

        // Update the movie categories if they changed
        if (prevProps.movie.categories !== this.props.movie.categories) {
            this.setState({ movieCategories: this.props.movie.categories }, this.fetchCategoryNames);
        }

        // Update the movie published year if it changed
        if (prevProps.movie.published !== movie.published) {
            this.setState({ moviePublished: movie.published || "Unknown year" });
        }

        // Update the movie length if it changed
        if (prevProps.movie.length !== movie.length) {
            this.setState({ movieLength: movie.length || "Unknown length" });
        }

        // Update the delete function if it changed
        if (prevProps.deleteFunc !== deleteFunc) {
            this.setState({ deleteFunc: deleteFunc || null });
        }

        // Update the edit function if it changed
        if (prevProps.editFunc !== editFunc) {
            this.setState({ editFunc: editFunc || null });
        }
    }

    async componentDidMount() {
        await this.fetchCategoryNames();
        await this.fetchRecommendedMovies();
    }

    // get recommended movies from the sever
    fetchRecommendedMovies = async () => {
        const { movie } = this.props;

        try {
            const response = await sendGet(`/movies/${movie._id}/recommend`, '', { 'user_id': '677405c39b46bc18147ac0bf' }, {});
            this.setState({ recommendMovies: response.data || [] }); // Update with recommended movies
        } catch (error) {
            console.error(`Failed to fetch recommended movies for ID ${movie._id}:`, error);
        }
    };

    // change the category id's to names
    fetchCategoryNames = async () => {
        const { movieCategories } = this.state;
        const categoryNames = [];

        for (const categoryId of movieCategories) {
            try {
                // send get request to the server
                const response = await sendGet(`/categories/${categoryId}`, '', {'user_id': '677405c39b46bc18147ac0bf'}, {});
                categoryNames.push(response.data.name); // push the category name
            } catch (error) {
                console.error(`Failed to fetch category name for ID ${categoryId}:`, error);
                categoryNames.push("Unknown Category"); // in case of error
            }
        }

        // save the names
        this.setState({ movieCategoriesNames: categoryNames });
    };

    render() {
        const {
            movieName,
            moviePic,
            movieDescription,
            movieActors,
            movieCategories,
            moviePublished,
            movieLength,
            deleteFunc,
            editFunc,
            movieCategoriesNames,
            recommendMovies
        } = this.state;

        // define the movie popup page
        const popupContent = (
            <div className="movie-popup-content">
                {/* Flex container for the picture and title */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginTop: '20px' }}>
                    {/* Movie Picture */}
                    <div className="movie-card">
                        <img src={moviePic} alt={movieName} className="movie-pic" />
                    </div>

                    {/* Movie Title and Details Container */}
                    <div>
                        {/* Title */}
                        <p className="title-1" style={{ marginTop: '50px', marginBottom: '0px' }}>{movieName}</p>

                        {/* Movie Details */}
                        <div>
                            <div className="categories-container"
                                 style={{display: 'flex', flexWrap: 'wrap', gap: '2px', marginBottom: '0px'}}>
                                {movieCategoriesNames.map((categoryName, index) => (
                                    <CategoryBadge name={categoryName}/>
                                ))}
                            </div>
                            <p className="paragraph" style={{marginBottom: '0px', fontSize: '13px'}}>{moviePublished}</p>
                            <p className="paragraph" style={{marginBottom: '0px'}}>{movieActors.join(", ") || "N/A"}</p>
                        </div>
                    </div>
                </div>

                {/* Additional Details */}
                <div> {/* TODO direct the btn to the movie watch page */}
                    <p className="btn-main"
                       style={{width: '20%', padding: '8px 0', textAlign: 'center', marginBottom: '2px'}}>Watch Now</p>
                    <p className="paragraph" style={{marginBottom: '2px'}}><strong>{movieLength} minutes</strong></p>
                    <p className="paragraph" style={{marginBottom: '20px'}}>{movieDescription}</p>
                </div>

                {/* Display recommended movies only if there are movies in the array */}
                {recommendMovies.length > 0 && (
                    <div>
                        <p className={"subtitle"}>For you</p>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {recommendMovies.map((recMovie, index) => (
                                <MovieCard
                                    key={index}
                                    movie={recMovie}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );

        // return the movie card
        return (
            <div>
                <DefaultPopup
                    triggerElement={
                        <div className="movie-card">
                            <img src={moviePic} alt={movieName} className="movie-pic"/>
                        </div>
                    }
                    content={popupContent}
                    modal
                />
                <p className="title-2 movie-title">
                    {movieName}
                </p>
                {deleteFunc && editFunc && (
                    <div style={{ marginTop: '5px' }}>
                        <button onClick={editFunc}>Edit</button>
                        <button onClick={deleteFunc}>Delete</button>
                    </div>
                )}
            </div>
        );
    }
}

export default MovieCard;