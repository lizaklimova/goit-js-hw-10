import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_DUd9fylXpHXzX1ODPsLaCzwug3AKDaVE0XWyKbmPK7hAaglBNd8QLrq8xgCoMXTX';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return axios.get('/breeds').then(response => response.data);
  //   return fetch(`${BASE_URL}/breeds`).then(response => {
  //     if (!response.ok) {
  //       throw new Error(`Sorry, the error happened ${response.statusText}`);
  //     }
  //     return response.json();
  //   });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`/images/search?breed_id=${breedId}`)
    .then(response => response.data);
  //   return fetch(`${BASE_URL}?breed_id=${breedId}`).then(response => {
  //     if (!response.ok) {
  //       throw new Error(`Sorry, the error happened ${response.statusText}`);
  //     }
  //     return response.json();
  //   });
}
