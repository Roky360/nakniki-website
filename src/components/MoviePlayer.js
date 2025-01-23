import React from 'react';

const MoviePlayer = ({ src, autoPlay = false }) => {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <video controls width="75%" autoPlay={autoPlay} muted={autoPlay}>
                <source src={src} type="video/mp4" />
            </video>
        </div>
    );
};

export default MoviePlayer;