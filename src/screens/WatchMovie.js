import { useSearchParams, useNavigate } from 'react-router-dom';

const WatchMovie = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const movieId = searchParams.get('movieId');

    if (!movieId) {
        return <p>No movie selected. <button onClick={() => navigate('/')}>Go Back</button></p>;
    }

    const videoSrc = `/api/video/${movieId}`;

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <video controls width="80%">
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <br />
            <button onClick={() => navigate('/')}>Back to Movies</button>
        </div>
    );
};

export default WatchMovie;
