import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://172.16.100.44:3001',
});
