import axios from 'axios';
import { AXIOS_BASE_URL } from '../helpers/constants';
import { EndPoints } from '../helpers';
import { IForm } from '../types';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || AXIOS_BASE_URL;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('fcToken');
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

export const postFetch = async (endPoint: EndPoints, body: IForm | {} = {}, config: Record<string, string> = {}) => {
  const response = await axios.post(endPoint, body, config);
  return response;
};

export const getFetch = async (endPoint: string, config: Record<string, string> = {}) => {
  const response = await axios.get(endPoint, config);
  return response;
};

export const deleteFetch = async (endPoint: string) => {
  const response = await axios.delete(endPoint);
  return response;
};
