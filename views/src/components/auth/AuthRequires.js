import React from 'react';

const Auth = props =>
  User.isLoggedIn() ? props.children : <Redirect to={'/login'} />;

export default Auth;
