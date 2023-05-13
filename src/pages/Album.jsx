import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

import '../styles/styles-album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: '',
      name: '',
      infoMusic: [],
      isLoading: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.saveMusicAlbum();
  }

saveMusicAlbum = async () => {
  this.setState({
    isLoading: true,
  });
  const { match: { params: { id } } } = this.props;
  const albumMusic = await getMusics(id);
  const data = albumMusic[0];
  const playlist = albumMusic.filter((music) => music.previewUrl !== undefined);
  this.setState({
    album: data.collectionName,
    name: data.artistName,
    infoMusic: playlist,
    isLoading: false,
  });
  const favPlaylist = await getFavoriteSongs();
  this.setState({
    favorites: favPlaylist,
  });
}

saveFavorites = async ({ target }, music) => {
  this.setState({
    isLoading: true,
  });
  if (target.checked) {
    await addSong(music);
  } else {
    await removeSong(music);
  }
  const favPlaylist = await getFavoriteSongs();
  this.setState({
    favorites: favPlaylist,
  });
  this.setState({
    isLoading: false,
  });
}

render() {
  const { album, name, infoMusic, isLoading, favorites } = this.state;
  return (
    <div
      data-testid="page-album"
      className="album-container"
    >
      <Header />
      <div>
        <h3 data-testid="artist-name">
          Artista:
          {' '}
          {name}
        </h3>
        <h3 data-testid="album-name">
          Album:
          {' '}
          {album}
        </h3>
      </div>
      <div className="music-container">
        {isLoading ? <Loading />
          : (
            <ul>
              {infoMusic.map((music, index) => (
                <MusicCard
                  key={ index }
                  trackName={ music.trackName }
                  previewTrack={ music.previewUrl }
                  trackId={ music.trackId }
                  music={ music }
                  saveFavorites={ this.saveFavorites }
                  favorites={ favorites }
                />
              ))}
            </ul>
          )}
      </div>
    </div>
  );
}
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
