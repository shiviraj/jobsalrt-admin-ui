import axios from "axios";
import {decrypt, encrypt, iv} from "./crypto/crypto";

const encryption = () => JSON.parse(localStorage.getItem("encryption"))

const getHeaders = () => {
  return {headers: {iv: iv.toString('hex'), encryption: encryption()}};
}

const validateAndDecryptResponse = async (res, defaultToken = false) => {
  if (res.statusText !== "OK") throw new Error();
  const decryptResponse = decrypt(res.data.payload, encryption(), defaultToken);
  return JSON.parse(decryptResponse)
};

const fetchPost = async (url, payload, defaultToken) => {
  const encryptPayload = {payload: encrypt(JSON.stringify(payload), defaultToken, encryption())}
  const response = await axios.post(url, encryptPayload, getHeaders())
  return await validateAndDecryptResponse(response, defaultToken);
};

const fetchGet = async (url) => {
  const response = await axios.get(url, getHeaders())
  return await validateAndDecryptResponse(response);
}

const fetchApi = (action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return fetchPost('/api/user/sign-in', action.payload, true);
    case 'GET_USER':
      return fetchGet('/api/user');
    default:
      return new Promise((_res, reject) => reject());
  }
};

export default fetchApi;
