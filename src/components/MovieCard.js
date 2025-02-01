import React from 'react';
import DefaultPopup from './DefaultPopup';
import MoviePopupContent from './MoviePopupContent';
import CreateMovieForm from "../screens/CreateMovieForm";
import {useRef} from "react";
import Icon from "./Icon";
import {sendDelete} from "../services/RequestSender";
import {useUser} from "../services/UserContext";

const MovieCard = ({movie, showFunc, onDelete, onClick}) => {
    const popupRef = useRef(null);
    const {user} = useUser();

    const handleDelete = async () => {
        try {
            const response = await sendDelete(`/movies/${movie._id}`, user.token);
            if (response.status === 204 && onDelete) {
                console.log(onDelete);
                onDelete();
            }
        } catch (error) {
            console.log(error);
        }
    }

    // return the movie card
    return (
        <div>
            {/* if the user press on the movie a popup window will show up with movie info */}
            <div>
                <DefaultPopup
                    triggerElement={
                        <div className="movie-card">
                            <img
                                src={window.location.origin + (movie.thumbnail || "/avatars/defaultAvatar.png")}
                                alt={window.location.origin + "/avatars/defaultAvatar.png"}
                                className="movie-pic"
                            />
                        </div>
                    }
                    content={<MoviePopupContent movie={movie}/>}
                    onOpen={onClick}
                    modal
                />
            </div>
            <p className="title-2 movie-title">{movie.name}</p>

            {/* show the delete and edit if showFunc is true */}
            {showFunc && (
                <div style={{marginTop: '5px'}}>
                    <DefaultPopup
                        ref={popupRef}
                        triggerElement={<Icon icon={'edit'} style={{fontSize: '13pt'}} padding={'3pt'}/>}
                        modal
                        content={<CreateMovieForm movie={movie} closePopup={() => {
                            popupRef.current.close();
                            if (onDelete) { // invoke the refresh function
                                onDelete();
                            }
                        }}
                        />}
                    />
                    <Icon icon={"delete"} style={{fontSize: '13pt'}} padding={'3pt'} onClick={handleDelete}/>
                </div>
            )}
        </div>
    );
}

export default MovieCard;
