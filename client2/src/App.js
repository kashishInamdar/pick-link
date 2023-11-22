import React, { useState, useEffect } from 'react';
import './App.css';
import copy from './copy.png';
import axios from 'axios';


function App() {

  const [url, setUrl] = useState('');
  const [slug, setSlug] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [links , setLinks] = useState([])

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

  const loadLinks = async ()=>{
    const response = await axios.get("/api/links")

    setLinks(response?.data?.data)
  }

  useEffect(()=>{
    loadLinks()
  } , [])

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

          <div className='all-links-container'>
            <h2 className='title2'>All Link</h2>

            {
              links.map((linkObj , index)=>{
                const { url , slug , click} = linkObj;
                return(
                  <div className='saved-links'>
                    <p>URL : {url}</p>
                    <p>Slug : http://localhost:3000/{slug} </p>
                    <p>Clicks :{click} </p>
                  
                  </div>
                )
                  
                
              })
            }
          </div>


        </div>


      </div>

    </>
  );
}

export default App;
