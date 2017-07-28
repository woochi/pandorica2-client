import React from 'react';
import {post, destroy} from '../api';
import {withRouter} from 'react-router';

const storageKey = 'ropeconAuth';
let storedAuthData = JSON.parse(window.localStorage.getItem(storageKey)) || null;
const authHeaderFields = [
  'access-token',
  'client',
  'expiry',
  'token-type',
  'uid'
];

export function getAuthHeaders() {
  return storedAuthData;
}

export function isAuthenticated() {
  return storedAuthData !== null;
}

function saveAuthData(response) {
  const {headers} = response;
  const authData = {};

  authHeaderFields.forEach(field =>
    authData[field] = headers.get(field)
  );
  storedAuthData = authData;
  window.localStorage.setItem(storageKey, JSON.stringify(authData));

  return response;
}

export function authenticate(email, password) {
  return post('/auth/sign_in', {email, password}).then(saveAuthData);
}

export function logOut() {
  return destroy('/auth/sign_out').then(response => {
    storedAuthData = null;
    window.localStorage.removeItem(storageKey);

    return response;
  });
}

export function signUp(email, password, faction) {
  return post('/auth', {
    email,
    password,
    password_confirmation: password,
    faction_id: faction.id
  }).then(saveAuthData);
}

export function requiresAuthentication(BaseComponent) {
  class AuthenticatedComponent extends React.PureComponent {
    componentWillMount() {
      if (!isAuthenticated()) {
        this.props.history.replace('/login');
      }
    }

    render() {
      return <BaseComponent {...this.props}/>;
    }
  }

  return withRouter(AuthenticatedComponent);
}
