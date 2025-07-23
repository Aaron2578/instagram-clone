import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

function Profile() {

    const [profile, setProfile] = useState(null);
    const [followers, setFollowers] = useState([]);



    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3000/profile')
            .then(data => {
                setProfile(data.data)
            })
            .catch(err => console.log(err))



        axios.get('http://localhost:3000/followers')
            .then(data => {
                setFollowers(data.data)
            })
            .catch(err => console.log(err))
    }, [])


    function handleOnChange(e) {
        setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleUpdate = async () => {
        axios.put('http://localhost:3000/profile', profile)
            .then(console.log("updated"))
            .catch(err => console.log(err))
    }



    return (
        <div className='d-flex'>
            <div className='w-20'><Sidebar /></div >
            <div className='w-80'>
                <div className='m-5'>
                    {profile ? (
                        <div>
                            <div className='d-flex gap-5 align-items-center w-50 mx-3'>
                                <div>
                                    <img src={profile.profilePic} alt="profile-pic" className=' profile rounded-circle' />
                                </div>
                                <div>
                                    <h4>{profile.username}</h4>
                                    <div className='d-flex w-100 gap-3 justify-content-between'>
                                        <p><b>{profile.post}</b> posts</p>
                                        <p onClick={() => (navigate("/followers"))}><b>{followers.length}</b> followers</p>
                                        <p><b>{profile.following}</b> following</p>
                                    </div>
                                    <div>
                                        <p>{profile.description}</p>
                                    </div>
                                </div>
                            </div>
                            <input type="text"
                                value={profile.username}
                                name='username'
                                className='form-control my-4'
                                onChange={handleOnChange}
                            />

                            <input type="text"
                                value={profile.profilePic}
                                name='profilePic'
                                className='form-control'
                                onChange={handleOnChange}
                            />

                            <button className='btn btn-primary my-4 mx-3' onClick={handleUpdate}>Update</button>
                            <button className='btn btn-secondary my-4' onClick={() => (navigate("/"))}>Back</button>
                        </div>) : (
                        <div>Loading</div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile