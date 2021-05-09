import axios from "axios";
import {decrypt, encrypt, iv} from "./crypto/crypto";

const validateAndDecryptResponse = async (res) => {
  if (res.statusText !== "OK") throw new Error();
  return JSON.parse(decrypt(res.data.payload))
};

const fetchPost = async (url, payload) => {
  const encryptPayload = {payload: encrypt(JSON.stringify(payload))}
  const response = await axios.post(url, encryptPayload, {headers: {iv: iv.toString('hex')}})
  return await validateAndDecryptResponse(response);
};

const fetchGet = async (url) => {
  const response = await axios.get(url, {headers: {iv: iv.toString('hex')}})
  return await validateAndDecryptResponse(response);
}

const fetchApi = (action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return fetchPost('/api/user/sign-in', action.payload);
    case 'GET_USER':
      return fetchGet('/api/user');
    default:
      return new Promise((_res, reject) => reject());
  }
};

export default fetchApi;
