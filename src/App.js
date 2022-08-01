import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import Album from './pages/Album';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProfileEdit from './pages/ProfileEdit';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/search" component={ Search } />
            <Route path="/album/:id" component={ Album } />
            <Route path="/favorites" component={ Favorites } />
            <Route path="/profile" exact component={ Profile } />
            <Route path="/profile/edit" component={ ProfileEdit } />
            <Route path="*" component={ NotFound } />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
