import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nameArtist: '',
      disableBttn: true,
    };
  }

  validButton = () => {
    const { nameArtist } = this.state;
    const min = 2;
    if (nameArtist.length >= min) {
      this.setState({ disableBttn: false });
    } else {
      this.setState({ disableBttn: true });
    }
  }

  hendleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => { this.validButton(); });
  }

  render() {
    const { nameArtist, disableBttn } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-artist-input">
            <input
              type="text"
              data-testid="search-artist-input"
              id="search-artist-input"
              name="nameArtist"
              value={ nameArtist }
              onChange={ this.hendleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ disableBttn }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
