import {client, localStorageKey} from './api-client'
import * as url from "../utils/constants";

function handleUserResponse(data) {
  window.localStorage.setItem(localStorageKey, JSON.stringify(data));
  return data
}

function login({email, password}) {
  return client(url.LOGIN_URL, {data: {email, password}}).then(handleUserResponse)
}

function register({username, password}) {
  return client('register', {data: {username, password}}).then(
    handleUserResponse,
  )
}

function getToken() {
  let token = window.localStorage.getItem(localStorageKey);
  if (token) {
    token = JSON.parse(token);
    return token.apiKey
  }
  return null
}


function isLoggedIn() {
  return Boolean(getToken())
}


export {login, register, getToken, isLoggedIn}
export {logout} from './api-client'
