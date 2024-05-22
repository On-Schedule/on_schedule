import axios from 'axios';

export default axios.create({
  baseURL: process.env.API_HOST ?? '/api/v1/',
  withCredentials: true
});
