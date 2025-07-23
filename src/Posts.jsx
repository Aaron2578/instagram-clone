import React, { useEffect, useState } from 'react'

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('https://instagram-db.onrender.com/feed').
            then((data) => data.json()).
            then((data) => setPosts(data)).
            catch(err => console.log(err))
    }, [])
    return (
        <div className='d-flex justify-content-center'>
            {posts.length > 0 ? (
                <div>
                    {posts.map((post) => (
                        <div className='my-3' key={post.postId} >
                            <div className='d-flex align-items-center my-2'>
                                <img className='dp rounded-circle' src={post.profilePic} alt="profile-pic" />
                                <div className='d-flex flex-column'>
                                    <h6 className='m-0'>{post.username}</h6>
                                    <small className='m-0'>{post.location}</small>
                                </div>
                                <i className="bi bi-three-dots ms-auto"></i>
                            </div>
                            <img className='image' src={post.image} alt="" />
                            <div className='mt-1'>
                                <i className="bi bi-heart"></i>
                                <i className="bi bi-chat"></i>
                                <i className="bi bi-send"></i>
                            </div>
                            <div>
                                <b> {post.likes} Likes</b>
                            </div>
                            <p>{post.caption}</p>
                        </div>
                    ))}
                </div>
            ) : (<div>loading</div>)
            }
        </div >
    )
}

export default Posts