const BASE_URL = 'https://restcountries.eu/rest/v2';
const endpoint = '/name';

const fetchCountry = (searchEl) => {
    const link = `${BASE_URL}${endpoint}/${searchEl}`;

  return fetch(link)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject('Fetch have not worked: error' + response.status);
    })
    .catch(err => {
      console.log(err);
    });
}

export default { fetchCountry };