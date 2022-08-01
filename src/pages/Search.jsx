import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <p>
          Pagina de Procura!
        </p>
      </div>
    );
  }
}

export default Search;
