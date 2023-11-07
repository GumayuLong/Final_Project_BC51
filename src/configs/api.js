import axios from "axios";
import { BASE_URL, TOKEN_CYBERSOFT } from "../constants/api";
import { store } from "../store/config";

const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
  },
});

request.interceptors.request.use((config) => {
  let token = null;
  const state = store.getState();

  if (state.userReducer.userInfo) {
    token = state.userReducer.userInfo.token;
    config.headers.token = `${token}`;
  }
  return config;
});

export { request };
