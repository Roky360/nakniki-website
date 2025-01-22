import React, { useRef, useState } from 'react';

const MoviePlayer = ({ movieId, size = "medium" }) => {
    const videoSrc = `/api/video/${movieId}`;
    const videoRef = useRef(null);

    // State to manage volume and play/pause
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0);

    // Play/Pause function
    const togglePlayPause = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    // Change volume function
    const changeVolume = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        videoRef.current.volume = newVolume;
    };

    // Fullscreen function
    const enterFullScreen = () => {
        if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen();
        }
    };

    return (
        <div className={`video-container ${size}`}>
            <video ref={videoRef} width="100%">
                <source src={videoSrc} type="video/mp4" />
            </video>

            <div className="video-controls">
                <button onClick={togglePlayPause}>
                    {isPlaying ? "Pause" : "Play"}
                </button>

                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={changeVolume}
                />

                <button onClick={enterFullScreen}>Fullscreen</button>
            </div>
        </div>
    );
};

export default MoviePlayer;
