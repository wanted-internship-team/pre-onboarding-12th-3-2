import axios from 'axios';
import { BASE_URL, API_PATH } from '../constants';

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

instance.interceptors.request.use((config) => {
  console.info('calling api');

  return config;
});

export const getRecommendedWord = async (keyword: string) => {
  const response = await instance.get(API_PATH.SICK, {
    params: {
      q: keyword,
    },
  });
  return response.data;
};
