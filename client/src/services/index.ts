import axios from 'axios';
import { AXIOS_BASE_URL } from '../helpers/constants';
import { EndPoints } from '../helpers';
import { IForm } from '../types';

axios.defaults.baseURL = AXIOS_BASE_URL;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('fcToken');
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const postFetch = async (endPoint: EndPoints, body: IForm | {} = {}) => {
  const response = await axios.post(endPoint, body);
  return response;
};

export const getFetch = async (endPoint: EndPoints) => {
  const response = await axios.get(endPoint);
  return response;
};
