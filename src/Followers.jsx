import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from './Sidebar';


function Followers() {
    const [unfollowed, setUnfollowed] = useState(0);
    const [followers, setFollowers] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        axios.get('http://localhost:3000/followers')
            .then(data => {
                setFollowers(data.data);
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            })
    }, [unfollowed])


    const handleUnfollow = async (id) => {
        axios.delete(`http://localhost:3000/followers/${id}`)
            .then(alert("Unfollowed"))
            .then(setUnfollowed(!unfollowed))
            .catch(err => console.log(err))
    }




    return (
        <>
            <div><Sidebar /></div>
            <div>
                <div className='w-50 m-auto'>
                    <h5 className='pt-5'>Followers {followers.length}</h5>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : followers.length === 0 ? (
                        <p>No Followers</p>
                    ) : (
                        followers.map((follower) => (
                            <div key={follower.postId} className='d-flex align-items-center my-2 w-50 m-auto'>
                                <img src={follower.profilePic} alt="profile-pic" className='rounded-circle w-20 mx-3' />
                                <h5>{follower.username}</h5>
                                <button className='btn btn-secondary ms-auto unfollow' onClick={() => handleUnfollow(follower.id)}>UnFollow</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export default Followers