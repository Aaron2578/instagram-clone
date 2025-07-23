import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

function ViewStory() {
    const { postId, tot } = useParams();
    const [story, setStory] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`https://instagram-db.onrender.com/story?postId=${postId}`)
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    setStory(data[0]);
                } else {
                    setError("Story not found");
                }
            })
            .catch(() => setError("Failed to load story"));
    }, [postId]);

    if (postId > tot || postId <= 0) {
        navigate('/')
    }

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!story && !error && <p>Loading...</p>}
            {story && (
                <div className='d-flex justify-content-center align-items-center'>
                    <Link to={`https://instagram-db.onrender.com/story/${Number(postId) - 1}/${tot}`}><i className="bi bi-arrow-left-circle-fill"></i></Link>
                    <img className='100vh mt-6' src={story.image} alt="story" width="400" />
                    <Link to={`https://instagram-db.onrender.com/story/${Number(postId) + 1}/${tot}`}><i className="bi bi-arrow-right-circle-fill"></i></Link>
                </div>
            )}
        </div>
    );
}

export default ViewStory;
