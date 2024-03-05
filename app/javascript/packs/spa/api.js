import axios from 'axios';

export default axios.create({
  baseURL: process.env.API_HOST ?? '/api/v1/',
  withCredentials: true
});
// const {get, post, patch, delete:delete_} = api;
