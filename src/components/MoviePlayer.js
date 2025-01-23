import React from 'react';

const MoviePlayer = ({ src, autoPlay = false, showControls=true}) => {
    return (
        <div style={{ marginTop: '20px' }}>
            <video controls={showControls} width="75%" autoPlay={autoPlay} muted={autoPlay}>
                <source src={src} type="video/mp4" />
            </video>
        </div>
    );
};

export default MoviePlayer;