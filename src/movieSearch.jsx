/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import axios from 'axios';

import './movieSearch.css';

// eslint-disable-next-line max-len
import emptyStateImage from '../src/assets/2.Illustrations/illustration-empty-state.png';
import logo from '../src/assets/2.Logos/logo.svg';
import favoriteHeart from '../src/assets/1.Icons/icon-heart-white.svg';


export default function MovieSearch() {
  const [input, setInput] = useState('');
  const [search, setSearch] = useState(['']);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    apiCall();
  }, [input]);

  const moviesList = search && search.map((movie, index) =>
    <div className="movies" key="index">
      <ul>
        <li>
          <Link to={{
            pathname: '/MovieDetails',
            className: 'Link',
            detailsProps: {
              id: movie.imdbID,
            },
          }}>
            <img src={movie.Poster} alt="poster" />
            <img src={favoriteHeart} alt="heart" className="favoriteHeart"/>
          </Link>
        </li>
      </ul>
    </div>,
  );

  const apiCall = async () => {
    const url = 'http://www.omdbapi.com/?s='+input+'&plot=full&page=1&apikey=536a34c3';

    try {
      const response = await axios.get(url);
      if (response.status === 200 && response !== undefined) {
        const data = response.data;
        setSearch(data.Search);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const displaySearch = (e) => {
    setShowSearch(true);
  };


  return (
    <div className="body">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="textInput">
        <form onChange={displaySearch}>
          <label>
            <input type="text" value={input} className="inputBox"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search movies..."
            />
          </label>
        </form>
      </div>
      <div className="emptyPic" style={{display: showSearch ? 'none' : ' '}}>
        <img src={emptyStateImage} alt="emptyImage"/>
        <h1>Don&#39;t know what to search?</h1>
        <h3>Here&#39;s an offer you can&#39;t refuse</h3>
      </div>
      <div className="movies" style={{display: showSearch ? ' ' : 'none'}}>
        {moviesList}
      </div>

    </div>

  );
}

