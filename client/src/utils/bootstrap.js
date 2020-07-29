import {queryCache} from 'react-query'
import * as auth from './auth-client'
import {localStorageKey} from "./api-client";


async function bootstrapAppData() {
  let appData = {user: null};
  if (auth.isLoggedIn()) {
    let storage = window.localStorage.getItem(localStorageKey);
    if (storage) {
      storage = JSON.parse(storage);
    }
    
    let user = await Promise.all([
      //auth.getUser(),
    ]);
    user = user[0];
    
    appData = {user};
    
  }
  queryCache.setQueryData('get-users', appData);
  return appData
}

export {bootstrapAppData}
