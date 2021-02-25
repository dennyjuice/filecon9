import axios from 'axios';
import { AXIOS_BASE_URL } from '../helpers/constants';
import { EndPoints } from '../helpers';
import { IForm } from '../types';

axios.defaults.baseURL = AXIOS_BASE_URL;

export const postFetch = async (endPoint: EndPoints, body: IForm | {} = {}) => {
  const response = await axios.post(endPoint, body);
  return response;
};
