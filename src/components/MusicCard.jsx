import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewTrack } = this.props;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewTrack } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewTrack: PropTypes.string,
}.isRequired;

export default MusicCard;