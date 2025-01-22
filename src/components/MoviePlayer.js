import React from 'react';

const MoviePlayer = ({ src }) => {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <video controls width="70%" style={{ maxWidth: '900px' }}>
                <source src={src} type="video/mp4" />
            </video>
        </div>
    );
};

export default MoviePlayer;