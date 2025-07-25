import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
function Stories() {

    const [stories, setStories] = useState([]);

    const navigate = useNavigate()

    let tot = 0;

    useEffect(() => {
        fetch('https://instagram-db.onrender.com/story').
            then((data) => data.json()).
            then(data => setStories(data)).
            catch(err => console.log(err))
    }, [])

    return (
        <div className='story d-flex'>
            <div className='d-none'>{tot = stories.length}</div>
            {stories.length > 0 ? (
                stories.map((story) => (
                    <div key={story.postId} className='mx-1' onClick={() => { navigate(`/story/${story.postId}/${tot}`) }}>
                        <div className='gradient-border'>
                            <img src={story.profilePic} alt="dp" className='story-dp rounded-circle' />
                        </div>
                        <p className='text-truncate' style={{ width: "50px" }}>{story.username}</p>
                    </div>
                ))
            ) : (
                <p>Loading</p>
            )
            }
        </div >
    )
}

export default Stories