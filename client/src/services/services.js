import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const get = async (url) => {
  let res, err;
  try {
    const response = await api.get(url);
    res = response;
  } catch (error) {
    err = error;
  }

  return { res, err };
};

export const post = async (url, body) => {
  let res, err;
  try {
    const response = await api.post(url, body);
    res = response;
  } catch (error) {
    err = error;
  }

  return { res, err };
};
