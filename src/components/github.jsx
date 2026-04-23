import React, { useEffect, useState } from 'react'
import './github.css'
import axios from 'axios'
import { FaMapMarkerAlt, FaUser, FaStar, FaCodeBranch, FaBook, FaSearch, FaGithub } from 'react-icons/fa';
import { PiBuildingsFill } from 'react-icons/pi';
import { FaXTwitter } from 'react-icons/fa6';
import { FaExclamationCircle } from "react-icons/fa";

function Github() {

  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem('searchHistory')) || [])
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 500)
    return () => clearTimeout(timer)
  }, [query])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProfile(null);
    setRepos([]);

    const startTime = Date.now();

    try {
      const response = await axios.get(`https://api.github.com/users/${debouncedQuery}`);
      const repoResponse = await axios.get(`https://api.github.com/users/${debouncedQuery}/repos?sort=stars&per_page=6`);

      const elapsed = Date.now() - startTime;
      const delay = Math.max(500 - elapsed, 0);
      const updatedHistory = [debouncedQuery, ...history].slice(0, 5)
      setHistory(updatedHistory)
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory))

      setTimeout(() => {
        setProfile(response.data);
        setRepos(repoResponse.data);
        setError(null);
        setLoading(false);
      }, delay);

    } catch (error) {
      setTimeout(() => {
        setProfile(null);
        setRepos([]);
        setError("User not found");
        setLoading(false);
      }, 500);
    }
  };
  return (
    <div className='main-container'>

      {/* Heading */}
      <h1 className='main-heading'>Github Search Detective </h1>

      {/* Search Bar */}
      <div className='search-wrapper'>
        <FaSearch className='search-icon' />
        <input
          type="text"
          placeholder='Enter GitHub username to investigate...'
          className='search-input'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
        />
      </div>

      {error && (
        <div className="error-card">
        <FaExclamationCircle className="error-icon" />
          <p className="error-title">No user found</p>
          <p className="error-subtext">
            Try checking the username or search another one.
          </p>
        </div>
      )}
      {profile && (
        <div className='layout'>

          <div className='left-panel'>

            {/* Profile Card */}
            <div className='profile-card'>
              <img src={profile.avatar_url} alt="avatar" className='profile-avatar' />
              <h2 className='profile-name'>{profile.name}</h2>
              <a href={profile.html_url} target='_blank' className='profile-username'>@{profile.login}</a>
              <p className='profile-bio'>{profile.bio}</p>

              <div className='profile-stats'>
                <div className='stat'>
                  <span className='stat-number'>{profile.followers}</span>
                  <span className='stat-label'>FOLLOWERS</span>
                </div>
                <div className='stat'>
                  <span className='stat-number'>{profile.following}</span>
                  <span className='stat-label'>FOLLOWING</span>
                </div>
              </div>

              <div className='profile-info'>
                {profile.location && <p><FaMapMarkerAlt /> {profile.location}</p>}
                {profile.company && <p><PiBuildingsFill /> {profile.company}</p>}
                {profile.twitter_username && (
                  <a href={`https://twitter.com/${profile.twitter_username}`} target='_blank' className='twitter-link'>
                    <FaXTwitter /> {profile.twitter_username}
                  </a>
                )}
              </div>
            </div>

            {/* Search History */}
            {history.length > 0 && (
              <div className='history-card'>
                <p className='history-heading'>SEARCH HISTORY</p>
                {history.map((item, index) => (
                  <div key={index} className='history-item' onClick={() => setQuery(item)}>
                    <FaUser className='history-icon' />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}

          </div>

          <div className='right-panel'>
            <h3 className='repos-heading'><FaBook /> Top Repositories</h3>
            {repos.map((repo) => (
              <a href={repo.html_url} target='_blank' key={repo.id} className='repo-card'>
                <div className='repo-top'>
                  <span className='repo-name'>{repo.name}</span>
                  <span className='repo-stars'><FaStar /> {repo.stargazers_count}</span>
                </div>
                <p className='repo-description'>{repo.description || 'No description added'}</p>
                <div className='repo-bottom'>
                  <span className='repo-language'>● {repo.language || 'N/A'}</span>
                  <span><FaCodeBranch /> {repo.forks_count}</span>
                </div>
              </a>
            ))}
          </div>

        </div>
      )}

    </div>
  )
}

export default Github



