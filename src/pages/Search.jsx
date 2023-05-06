import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

import '../styles/styles-search.css';
import seachSVG from '../styles/images/search.svg';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nameArtist: '',
      disableBttn: true,
      isLoading: false,
      arrAlbum: [],
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

  cleanInput = () => {
    this.setState({
      nameArtist: '',
    });
  }

  submitSearch = async (e) => {
    e.preventDefault();
    this.setState({
      isLoading: true,
    });
    const { nameArtist } = this.state;
    const albums = await searchAlbumsAPI(nameArtist);
    this.setState({
      arrAlbum: albums,
      isLoading: false,
    }, this.cleanInput());
  }

  render() {
    const { nameArtist, disableBttn, isLoading, arrAlbum } = this.state;
    return (
      <div
        data-testid="page-search"
        className="search-container"
      >
        <Header />
        {isLoading ? <Loading />
          : (
            <div>
              <form className="form-container">
                <label htmlFor="search-artist-input">
                  <input
                    type="text"
                    data-testid="search-artist-input"
                    id="search-artist-input"
                    name="nameArtist"
                    value={ nameArtist }
                    onChange={ this.hendleChange }
                    placeholder="Digite uma Banda ou Artista"
                    className="input-search"
                  />
                </label>
                <button
                  type="submit"
                  data-testid="search-artist-button"
                  disabled={ disableBttn }
                  onClick={ this.submitSearch }
                >
                  <img src={ seachSVG } alt="ícone de Pesquisa" />
                </button>
              </form>
              <div>
                {arrAlbum.length === 0
                  ? <h4 className="heading-search">Nenhum álbum foi encontrado!</h4>
                  : (
                    <div className="album">
                      <ul>
                        { arrAlbum.map((album) => (
                          <li key={ album.collectionId } className="album-container">
                            <p>{album.artistName}</p>
                            <p>{album.collectionName}</p>
                            <p>{album.releaseDate}</p>
                            <p>{album.trackCount}</p>
                            <Link
                              data-testid={ `link-to-album-${album.collectionId}` }
                              to={ `/album/${album.collectionId}` }
                            >
                              <img
                                src={ album.artworkUrl100 }
                                alt="Lista de Albuns referentes ao Artista Pesquisado"
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default Search;
