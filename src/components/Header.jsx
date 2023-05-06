import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

import '../styles/styles-header.css';
import seachSVG from '../styles/images/search.svg';
import favoritesSVG from '../styles/images/star.svg';
import profileSVG from '../styles/images/person-circle.svg';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loadName: '',
      isloading: true,
    };
  }

  componentDidMount() {
    this.hendleHeaderName();
  }

  hendleHeaderName = async () => {
    const user = await getUser();
    this.setState({
      isloading: false,
      loadName: user,
    });
  }

  render() {
    const { loadName, isloading } = this.state;
    return (
      <div className="header-container">
        <header data-testid="header-component" className="header-links">
          <Link data-testid="link-to-search" to="/search">
            Pesquisa
            <img src={ seachSVG } alt="ícone de pesquisa" />
          </Link>
          <Link data-testid="link-to-favorites" to="/favorites">
            Favoritos
            <img src={ favoritesSVG } alt="ícone de Favoritos" />
          </Link>
          <Link data-testid="link-to-profile" to="/profile">
            Profile
            <img src={ profileSVG } alt="ícone do perfil da conta" />
          </Link>
        </header>
        {isloading ? <Loading />
          : (
            <p data-testid="header-user-name">
              {`Ola, ${loadName.name}!`}
            </p>
          )}
      </div>
    );
  }
}

export default Header;
