import {queryCache} from 'react-query'
import toastr from "toastr";
const localStorageKey = process.env.REACT_APP_APP_NAME;


async function client(
  endpoint,
  {data, headers: customHeaders, ...customConfig} = {},
) {

  const token = window.localStorage.getItem(localStorageKey);
  let headers;
  if (data && data.tenantId) {
    headers = {
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    }
  } else {
    
    headers = {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    }
  }
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: customConfig.customHeaders ? customConfig.customHeaders : headers,
  };
  
  
  return window
    .fetch(`${endpoint}`, config)
    .then(async response => {
      const data = await response.json();
      if (response.ok) {
        return data
      } else {
        
        if (data.type === "login") {
          toastr.error(data.data);
        }
        return Promise.reject(data)
      }
    }).catch((err)=>{
        logout();
        window.location.replace("/");
      })
}

function logout() {
  queryCache.clear();
  window.localStorage.removeItem(localStorageKey);
}

export {client, localStorageKey, logout}
