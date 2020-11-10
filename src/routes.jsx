/* eslint-disable require-jsdoc */
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MovieSearch from '../src/movieSearch';
import MovieDetails from '../src/movieDetails';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path = "/" exact component = {MovieSearch} />
        <Route path = "/movieDetails" component = {MovieDetails} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
