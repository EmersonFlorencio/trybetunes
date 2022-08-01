import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

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
      <>
        <header data-testid="header-component">
          <Link data-testid="link-to-search" to="/search">
            Pesquisa
          </Link>
          <Link data-testid="link-to-favorites" to="/favorites">
            Favoritos
          </Link>
          <Link data-testid="link-to-profile" to="/profile">
            Profile
          </Link>
        </header>
        {isloading ? <Loading />
          : (
            <p data-testid="header-user-name">
              {`Ola, ${loadName.name}!`}
            </p>
          )}
      </>

    );
  }
}

export default Header;
