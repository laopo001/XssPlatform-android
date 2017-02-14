// import fetch from 'dva/fetch';
//import { message } from 'antd';
import {
  ToastAndroid
} from 'react-native';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }else{
 //   message.error(response.status+'-'+response.statusText);
      ToastAndroid.show(response.status+'-'+response.statusText,1);
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch('http://103.200.97.33:3000'+url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ({ data }))
    .catch((err) => ({ err }));
}
