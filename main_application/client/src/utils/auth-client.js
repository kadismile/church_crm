import {client, localStorageKey} from './api-client'
import * as url from "../utils/constants";

async function handleUserResponse(data) {
  window.localStorage.setItem(localStorageKey, data.token);
  return  [await getUser()];
}

function login({email, password}) {
  return client(url.LOGIN_URL, {data: {email, password}}).then(handleUserResponse)
}

function register({username, password}) {
  return client('register', {data: {username, password}}).then(
    handleUserResponse,
  )
}

function getUser() {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null)
  }
  return client(`${url.BASE_URL}/users/get`, {data: {token}}).then(data => data.user)
}

function getCategory() {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null)
  }
  
  return client(`${url.BASE_URL}/users/category`).then(data => data)
}

function createCategory(data) {
  
  const token = getToken();
  if (!token) {
    return Promise.resolve(null)
  }
  
  return client(`${url.BASE_URL}/users/category`, {data}).then(data => data)
}

function getToken() {
  let token = window.localStorage.getItem(localStorageKey);
  if (token) {
    return token
  }
  return null
}


function isLoggedIn() {
  return Boolean(getToken())
}


export {login, register, getToken, isLoggedIn, getUser, getCategory, createCategory}
export {logout} from './api-client'
