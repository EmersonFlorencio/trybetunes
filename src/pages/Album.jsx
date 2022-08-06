import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: '',
      name: '',
      infoMusic: [],
      isLoading: false,
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
  console.log(playlist);
  this.setState({
    album: data.collectionName,
    name: data.artistName,
    infoMusic: playlist,
    isLoading: false,
  });
}

render() {
  const { album, name, infoMusic, isLoading } = this.state;
  return (
    <div data-testid="page-album">
      <Header />
      <h3 data-testid="album-name">{album}</h3>
      <h3 data-testid="artist-name">{name}</h3>
      <div>
        {isLoading && <Loading />}
        <ul>
          {infoMusic.map((music, index) => (
            <MusicCard
              key={ index }
              trackName={ music.trackName }
              previewTrack={ music.previewUrl }
            />
          ))}
        </ul>
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
