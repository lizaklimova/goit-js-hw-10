import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_DUd9fylXpHXzX1ODPsLaCzwug3AKDaVE0XWyKbmPK7hAaglBNd8QLrq8xgCoMXTX';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return axios.get('/breeds').then(response => response.data);
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`/images/search?breed_id=${breedId}`)
    .then(response => response.data);
}
