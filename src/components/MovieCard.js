import React from 'react';

class MovieCard extends React.Component {

    // constructor
    constructor(props) {
        super(props);

        // get the default pic
        this.defaultPic = window.location.origin + "/avatars/defaultAvatar.png";

        // define the state
        this.state = {
            movieName: props.movie.name,
            moviePic: props.movie.thumbnail || this.defaultPic,
            editFunc: props.editFunc || null,
            deleteFunc: props.deleteFunc || null,
        };
    }

    // update the components in the state if they changed
    componentDidUpdate(prevProps) {
        if (prevProps.movie.name !== this.props.movie.name) {
            this.setState({ movieName: this.props.movieName });
        }

        if (prevProps.movie.thumbnail !== this.props.movie.thumbnail) {
            this.setState({ moviePic: this.props.moviePic });
        }

        if (prevProps.deleteFunc !== this.props.deleteFunc) {
            this.setState({ deleteFunc: this.props.deleteFunc || null });
        }

        if (prevProps.editFunc !== this.props.editFunc) {
            this.setState({ editFunc: this.props.editFunc || null });
        }
    }

    render() {
        const { movieName, moviePic, deleteFunc, editFunc } = this.state;

        // return the movie card
        return (
            <div>
                <div className="movie-card">
                    <img src={moviePic} alt={moviePic} className="movie-pic"/>
                </div>
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