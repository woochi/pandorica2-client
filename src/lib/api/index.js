import {connect} from 'react-refetch';
import urlJoin from 'url-join'
import {getAuthHeaders} from '../auth';

const apiUrl = 'http://localhost:3001';

export function logIn() {

}

export function logOut() {

}

export function request(url, customOptions) {
  const options = {
    headers: {
      'Content-Type': 'application/json'
    },
    ...customOptions
  };

  return fetch(urlJoin(apiUrl, url), options);
}

export function post(url, data) {
  return request(url, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export const refetch = connect.defaults({
  buildRequest: function(mapping) {
    const {
      url,
      headers,
      body,
      ...defaultOptions
    } = mapping;

    const options = {
      ...defaultOptions,
      headers: {
        Accept: 'application/json',
        ...headers,
        ...getAuthHeaders()
      },
      body: JSON.stringify(body)
    };

    return new Request(urlJoin(apiUrl, url), options);
  }
});
