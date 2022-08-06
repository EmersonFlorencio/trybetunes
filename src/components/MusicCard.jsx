import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
  }

  render() {
    const { trackName,
      previewTrack,
      trackId,
      music,
      favorites,
      saveFavorites,
    } = this.props;

    const { isLoading } = this.state;
    return (
      <div>
        {isLoading ? <Loading />
          : (
            <>
              <p>{trackName}</p>
              <audio data-testid="audio-component" src={ previewTrack } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
              </audio>
              <label htmlFor="favoriteBox">
                <input
                  type="checkbox"
                  name="favoriteBox"
                  id="favoriteBox"
                  data-testid={ `checkbox-music-${trackId}` }
                  onChange={ (e) => saveFavorites(e, music) }
                  checked={ favorites.some((favorite) => favorite.trackId === trackId) }
                />
                Favoritas
              </label>
            </>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewTrack: PropTypes.string,
    trackId: PropTypes.string,
  }).isRequired,
  saveFavorites: PropTypes.func,
}.isRequired;

export default MusicCard;
