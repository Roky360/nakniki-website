import React from 'react';
import DefaultPopup from './DefaultPopup';
import MoviePopupContent from './MoviePopupContent';

class MovieCard extends React.Component {

    render() {
        // get the variables from the props
        const { movie, editFunc, deleteFunc } = this.props;

        // return the movie card
        return (
            <div>
                {/* if the user press on the movie a popup window will show up with movie info */}
                <DefaultPopup
                    triggerElement={
                        <div className="movie-card">
                            <img
                                src={window.location.origin + "/avatars/defaultAvatar.png"} // TODO put the original pic
                                alt={window.location.origin + "/avatars/defaultAvatar.png"}
                                className="movie-pic"
                            />
                        </div>
                    }
                    content={<MoviePopupContent movie={movie}/>}
                    modal
                />
                <p className="title-2 movie-title">{movie.name}</p>

                {/* if there is an edit and delete func then show their buttons */}
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
