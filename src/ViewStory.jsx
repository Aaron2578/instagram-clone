import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

function ViewStory() {
    const { postId, tot } = useParams();
    const [story, setStory] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (Number(postId) > Number(tot) || Number(postId) <= 0) {
            navigate('/');
        }
    }, [postId, tot, navigate]);

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

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!story && !error && <p>Loading...</p>}
            {story && (
                <div className='d-flex justify-content-center align-items-center mt-5'>
                    {Number(postId) > 1 && (
                        <Link to={`/story/${Number(postId) - 1}/${tot}`}>
                            <i className="bi bi-arrow-left-circle-fill fs-3 mx-2"></i>
                        </Link>
                    )}
                    <img
                        src={story.image}
                        alt="story"
                        style={{ height: '100vh' }}
                        width="400"
                    />
                    {Number(postId) < Number(tot) && (
                        <Link to={`/story/${Number(postId) + 1}/${tot}`}>
                            <i className="bi bi-arrow-right-circle-fill fs-3 mx-2"></i>
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}

export default ViewStory;
