import axios from 'axios';
import { AXIOS_BASE_URL } from '../helpers/constants';
import { EndPoints } from '../helpers';
import { IForm } from '../types';

axios.defaults.baseURL = AXIOS_BASE_URL;

export const postFetch = async (endPoint: EndPoints, body: IForm | {} = {}) => {
  try {
    const response = await axios.post(endPoint, body);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const register = async (username: string, email: string, password: string) => {
  try {
    const response = await postFetch(EndPoints.REGISTRATION, { username, email, password });
    alert(response.message);
  } catch (error) {
    alert(error.message);
  }
};
