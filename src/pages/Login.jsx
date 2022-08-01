import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nameLogin: '',
      buttonDisable: true,
      isLoading: false,
    };
  }

  validButton = () => {
    const { nameLogin } = this.state;
    const min = 3;
    if (nameLogin.length >= min) {
      this.setState({ buttonDisable: false });
    } else {
      this.setState({ buttonDisable: true });
    }
  }

  hendleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => { this.validButton(); });
  }

  loginSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true }, async () => {
      const { nameLogin } = this.state;
      const { history } = this.props;
      await createUser({ name: nameLogin });
      history.push('/search');
    });
  }

  render() {
    const { nameLogin, buttonDisable, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        {isLoading ? <Loading />
          : (
            <form>
              <label htmlFor="login-name-input">
                <input
                  type="text"
                  data-testid="login-name-input"
                  id="login-name-input"
                  name="nameLogin"
                  value={ nameLogin }
                  onChange={ this.hendleChange }
                />
              </label>
              <button
                type="submit"
                data-testid="login-submit-button"
                disabled={ buttonDisable }
                onClick={ this.loginSubmit }
              >
                Entrar
              </button>
            </form>
          )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
