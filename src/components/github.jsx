import React, { useState } from 'react'
import './github.css'
import axios from 'axios'
import { FaMapMarkerAlt } from 'react-icons/fa'; 
import { PiBuildingsFill } from 'react-icons/pi';
import { FaXTwitter } from 'react-icons/fa6';
import { FaGithub } from 'react-icons/fa';

function github() {

    const [username,setUsername] = useState('')
    const [profile,setProfile] = useState(null)
    const [error,setError] = useState(null)
  const handleSubmit = async(e) => {
  e.preventDefault();
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    console.log(response.data)
    setProfile(response.data)
    setError(null)

  } catch (error) {
    setProfile(null)
    setError("User not found")
  }

  }
  return (
    <div className='main-container'>
        <h1 className='main-heading'>Github Profile Detective</h1>
        <form onSubmit={handleSubmit} className='search-form'>
          <input type="text" placeholder='Enter Github Username' className='search-input' value={username} onChange={(e) =>{setUsername(e.target.value)}} />
          <button className='search-btn' type='submit'>Search</button>
        </form>
        {error && <p className='error-msg'>{error}</p>}
        {profile && (
          <div className='profile-container'>
            <div className='profile-content'>
              <div className='profile-image'>
              <img src={profile.avatar_url} alt="Avatar" className='profile-avatar' />
            </div>
            
            <div className='profile-details'>

              <div className='profile-desp'>
               <h2  className='profile-name'>{profile.name}  </h2>
                  <p className='profile-created'> Joined: {new Date(profile.created_at).toLocaleDateString()}  </p>
                 </div>
                 <a href={profile.html_url} target='_blank' className='profile-url'>@{profile.login}</a>
            <p className='profile-bio'>{profile.bio}</p> 
              <div className='profile-stats'>
                <p className='profile-repos'>Repositories <br /> <span className='stats'>{profile.public_repos}</span></p>
                <p className='profile-followers'>Followers <br /> <span className='stats'>{profile.followers}</span></p>
                <p className='profile-following'>Following <br /> <span className='stats'>{profile.following}</span></p>

              </div>
              <div className='profile-info'>
                 <p className='location'><FaMapMarkerAlt/> {profile.location}</p>
               <p className='company'><PiBuildingsFill/>{profile.company}</p>
              </div>

              <div className='profile-links'>
                <a href={`https://twitter.com/${profile.twitter_username}`} className='twitter-link' target='_blank'><FaXTwitter/>{profile.twitter_username}</a>
                <a href={profile.html_url} target='_blank' className='profileurl'> <FaGithub/> View Profile</a>
              </div>
            </div>
           
            </div>       
          </div>
        )}
      </div>
  )
}

export default github