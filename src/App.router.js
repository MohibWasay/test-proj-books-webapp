import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import BooksListing from './pages/Books/Listing';
import BooksPreview from './pages/Books/Preview';
import CreateNewBook from './pages/Books/Manage';

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/books/create" component={CreateNewBook} />
        <Route path="/book/:id" component={BooksPreview} />
        <Route path="/books" component={BooksListing} />
        <Redirect to='/books'/>
      </Switch>
    </Router>
  );
}

export default AppRouter;
