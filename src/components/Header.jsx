import React from 'react';
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
    console.log(user);
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
          {isloading && <Loading />}
        </header>
        <p data-testid="header-user-name">
          {`Ola, ${loadName.name}!`}
        </p>
      </>

    );
  }
}

export default Header;
