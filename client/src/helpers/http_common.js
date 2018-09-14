import axios from 'axios';

export const HTTP = axios.create({
  baseURL: 'http://'+ location.host.split(":")[0] + ':3000/'
})
