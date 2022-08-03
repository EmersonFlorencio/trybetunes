import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nameArtist: '',
      disableBttn: true,
      isLoading: false,
      artistSearch: '',
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
    console.log(albums);
    this.setState({
      arrAlbum: albums,
      isLoading: false,
      artistSearch: nameArtist,
    }, this.cleanInput());
  }

  render() {
    const { nameArtist, disableBttn, isLoading, arrAlbum, artistSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {isLoading ? <Loading />
          : (
            <div>
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
                  onClick={ this.submitSearch }
                >
                  Pesquisar
                </button>
              </form>
              {arrAlbum.length === 0 ? <p>Nenhum álbum foi encontrado</p>
                : (
                  <div>
                    <h2>
                      Resultado de álbuns de:
                      {' '}
                      {artistSearch}
                    </h2>
                    <ul>
                      { arrAlbum.map((album) => (
                        <li key={ album.collectionId }>
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
          )}
      </div>
    );
  }
}

export default Search;
