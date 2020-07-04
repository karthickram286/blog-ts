import React from 'react';
import { withRouter } from 'react-router-dom';

class HomePage extends React.Component {

  render() {
    return (
      <div className="addempl">
        <h2>Welcome to Blogger Application</h2>
      </div>
    )
  }
}

export default withRouter(HomePage);