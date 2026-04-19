import React, { useState } from 'react'
import './github.css'
import axios from 'axios'
import { use } from 'react'
import { normalizeModuleId } from 'vite/module-runner'


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
                <p className='profile-repos'>Repositories <br /> <span className='repos'>{profile.public_repos}</span></p>
                <p className='profile-followers'>Followers <br /> <span className='follower'>{profile.followers}</span></p>
                <p className='profile-following'>Following <br /> <span className='following'>{profile.following}</span></p>

              </div>



            </div>
           
            </div>       
          </div>
        )}
      </div>
  )
}

export default github