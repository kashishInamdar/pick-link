import React, { useState, useEffect } from 'react';
import './App.css';
import copy from './copy.png';
import axios from 'axios';

function App() {

  const [url, setUrl] = useState('');
  const [slug, setSlug] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const genratLink = async ()=>{
    const response = await axios.post("/link" , {
      url,
      slug
    })
    setShortUrl(response?.data?.data?.shortUrl)
  }

  const copySortUrl = ()=>{
    
    navigator.clipboard.writeText(shortUrl)
    alert("copy to clipboard")
  }

  return (
    <>
      <div className='container'>
        <h1 className='title'> PICK 🔗LINKS</h1>

        <div className='app-container'>
          <div className='link-ganration-card'>
            <h2 className='title2'>Link Genration</h2>

            <input type='text'
              placeholder='Add URL'
              value={url}
              onChange={(e) => {
                setUrl(e.target.value)
              }}
              className='user-input'
            />

            <input type='text'
              placeholder='Add Slug'
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value)
              }}
              className='user-input'
            />
            <div className=''>
              <input type='text'
                placeholder='Short URL'
                value={shortUrl}
                disabled
                className='input-short-url'
              />
              <img src={copy} alt="copy" className='copy' onClick={copySortUrl} />
            </div>

            <button
              type='button'
              className='ling-genrat-btn'
              onClick={genratLink}
            >
              Do Magic 🪄
            </button>
          </div>

          <div>
            <h2 className='title2'>All Link</h2>
          </div>


        </div>


      </div>

    </>
  );
}

export default App;
