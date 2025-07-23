import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Suggestions() {

  const [profile, setProfile] = useState(null)
  const [suggestions, setSuggestions] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    fetch('https://instagram-db.onrender.com/profile')
      .then((data) => data.json())
      .then(data => setProfile(data))
      .catch(err => console.log(err))

    fetch('https://instagram-db.onrender.com/suggestions')
      .then((data) => data.json())
      .then(data => setSuggestions(data))
      .catch(err => console.log(err))
  }, [])

  const handleFollow = async (postId, username, profilePic) => {
    axios.post('https://instagram-db.onrender.com/followers', { postId, username, profilePic })
      .then(() => alert('Followed'))
      .catch(err => console.log(err))
  }

  return (
    <div>
      <div className='suggestions w-75 m-4'>

        {profile ? (
          <div className='d-flex align-items-center mb-3' onClick={() => (navigate("/profile"))}>
            <img className='dp rounded-circle' src={profile.profilePic} alt="profile-pic" width={40} height={40} />
            <div>
              <h5 className='m-0'>{profile.username}</h5>
              <small>{profile.name}</small>
            </div>
            <small className='ms-auto text-primary'>Switch</small>
          </div>
        ) : <p>Loading profile...</p>}

        <div className='d-flex mb-2 align-items-center'>
          <p className='m-0 text-link'>Suggested for you</p>
          <small className='ms-auto'>See All</small>
        </div>

        {suggestions.length > 0 ? (
          <div>
            {suggestions.map((suggestion) => {
              return (
                <div key={suggestion.postId} className='d-flex align-items-center mb-2 my-4'>
                  <img className='dp rounded-circle me-2' src={suggestion.profilePic} alt="profile-pic" width={40} height={40} />
                  <h6 className='m-0'>{suggestion.username}</h6>
                  <button
                    className='btn btn-link text-primary text-decoration-none ms-auto p-0'
                    onClick={() => handleFollow(suggestion.postId, suggestion.username, suggestion.profilePic)}
                  >
                    Follow
                  </button>
                </div>
              )
            })}
          </div>
        ) : (
          <div>Loading suggestions...</div>
        )}
      </div>
    </div>
  )
}

export default Suggestions
