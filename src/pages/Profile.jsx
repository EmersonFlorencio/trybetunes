import React from 'react';
import Header from '../components/Header';

import '../styles/styles-profile.css';

class Profile extends React.Component {
  render() {
    return (
      <div
        data-testid="page-profile"
        className="profile-container"
      >
        <Header />
      </div>
    );
  }
}

export default Profile;
