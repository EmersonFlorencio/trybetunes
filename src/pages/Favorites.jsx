import React from 'react';
import Header from '../components/Header';

import '../styles/styles-favorite.css';

class Favorites extends React.Component {
  render() {
    return (
      <div
        data-testid="page-favorites"
        className="favorite-container"
      >
        <Header />
      </div>
    );
  }
}

export default Favorites;
