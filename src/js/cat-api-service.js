import axios from 'axios';

//! Added default API_KEY
axios.defaults.headers.common['x-api-key'] =
  'live_WU3qNW7HCGgc9ygOkysxRpFXZrESXftSjzKXfEP6AiHj02s1uf3NyjBqcYglzxCa ';

// ------------- Created clss CatApiService -------------
export class CatApiService {
  constructor() {
    this.page = 1;
  }

  //* Added Private Class Elements
  #BASE_URL = 'https://api.thecatapi.com/v1/';
  #END_POINTS = {
    BREEDS: 'breeds',
    IMAGES_SEARCH: 'images/search',
  };

  //* Private function to handle server response (The Cat API)
  #handleResponse(response) {
    if (response.status !== 200) {
      throw new Error(response.status);
    }

    return response.data;
  }

  // Function which return all the cats (promise)
  fetchBreeds() {
    const url = `${this.#BASE_URL}${this.#END_POINTS.BREEDS}`;
    return axios.get(url).then(this.#handleResponse);
  }

  // Function which return the cat (promise) by ID
  fetchCatByBreed(breedId) {
    const url = `${this.#BASE_URL}${
      this.#END_POINTS.IMAGES_SEARCH
    }?breed_ids=${breedId}`;
    return axios.get(url).then(this.#handleResponse);
  }
}
