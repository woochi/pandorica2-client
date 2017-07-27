import {post} from '../api';

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

export function authenticate(email = 'mikko@example.com', password = 'password') {
  return post('/auth/sign_in', {email, password}).then(response => {
    const {headers} = response;
    const authData = {};

    authHeaderFields.forEach(field =>
      authData[field] = headers.get(field)
    );
    storedAuthData = authData;
    window.localStorage.setItem(storageKey, JSON.stringify(authData));

    return response;
  });
}

export function requiresAuthentication(BaseComponent) {
  if (!isAuthenticated()) {
    window.history.replaceState({}, '', '/login');
  }

  return BaseComponent;
}
