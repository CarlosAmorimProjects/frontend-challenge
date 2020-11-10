/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import axios from 'axios';

import './movieDetails.css';

import logo from '../src/assets/2.Logos/logo.svg';
import arrow from '../src/assets/1.Icons/icon-arrow-grey.svg';
import imdbLogo from '../src/assets/2.Logos/logo-imdb.svg';
import rottenLogo from '../src/assets/2.Logos/logo-rotten-tomatoes.svg';
import favoriteHeart from '../src/assets/1.Icons/icon-heart-grey.svg';
import favoritedHeart from '../src/assets/1.Icons/icon-heart-full.svg';

export default function MovieDetail(props) {
  const imdbId = props.location.detailsProps;
  const [favorited, setFavorited] = useState(false);

  const [details, setDetails] = useState({
    Runtime: '',
    Year: '',
    Rated: '',
    Title: '',
    Ratings: [{
      Source: '',
      Value: '',
    },
    {
      Source: '',
      Value: '',
    },
    ],
    Plot: '',
    Actors: '',
    Genre: '',
    Director: '',
  });

  useEffect( ()=>{
    apiCall();
  }, [] );

  const showFavorite = (e) => {
    setFavorited(true);
  };

  const apiCall = () => {
    const url = 'http://www.omdbapi.com/?i='+imdbId.id+'&apikey=536a34c3';
    console.log(imdbId.id);


    const response = axios.get(url)

        .then((response) => setDetails(response.data));
  };
  if (!details) return null;

  return (
    <div className="body">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <Link to="/" className="Link">
        <img src={arrow} alt="arrow" />
      </Link>
      <div className="runtime">
        <h1>{details.Runtime}</h1>
        <p>.</p>
        <h1>{details.Year}</h1>
        <p>.</p>
        <h2>{details.Rated}</h2>
      </div>
      <div className="title">
        <h1>{details.Title}</h1>
      </div>

      <div className="rottenImdb">
        <img src={imdbLogo} alt="imdbLogo" />
        {
          details.Ratings && details.Ratings[0]?
          (<h2>{details.Ratings[0].Value}</h2>) : (<h2>N/A</h2>)
        }
        <img src={rottenLogo} alt="rottenLogo" className="rotten"/>
        {
          details.Ratings && details.Ratings[1]?
          (<h2>{details.Ratings[1].Value}</h2>) : (<h2>N/A</h2>)
        }
      </div>

      <div className="favorite" onClick={showFavorite}
        style={{visibility: favorited ? 'hidden' : ' '}}>
        <img src={favoriteHeart} alt="heart"/>
        <h2>Add to favourites</h2>
      </div>

      <div className="favorited" onClick={showFavorite}
        style={{visibility: favorited ? 'visible ' : 'hidden'}}>
        <img src={favoritedHeart} alt="heart"/>
        <h2>Added</h2>
      </div>

      <div className="plot">
        <h1>Plot</h1>
        <h2>{details.Plot}</h2>
      </div>
      <div className="technical">
        <div className="cast">
          <h1>Cast</h1>
          <h2>{details.Actors}</h2>
        </div>

        <div className="genre">
          <h1>Genre</h1>
          <h2>{details.Genre}</h2>
        </div>

        <div className="director">
          <h1>Director</h1>
          <h2>{details.Director}</h2>
        </div>
      </div>
      <div className="poster">
        <img src={details.Poster} alt="poster" />
      </div>
    </div>

  );
}

