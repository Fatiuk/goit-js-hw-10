import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { CatApiService } from './js/cat-api-service';
import Loader from './js/components/loader';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

const catApiServiceInstance = new CatApiService();

const loader = new Loader({
  hidden: true,
});

// Fetch cat breeds and initialize SlimSelect for breed selection
catApiServiceInstance
  .fetchBreeds()
  .then(data => {
    createOptionMarkup(data);
    new SlimSelect({
      select: refs.select,
    });
  })
  .catch(data => {
    loader.showErrorLoader();
    Notiflix.Notify.failure(data.message);
  });

refs.select.value = 111;
// Function which created makup options from <select>
function createOptionMarkup(data) {
  const optionsMarkup = data
    .map(({ id, name }) => `<option value=${id}>${name}</option>`)
    .join('');

  return refs.select.insertAdjacentHTML('afterbegin', optionsMarkup);
}

refs.select.addEventListener('change', handleCatByBreed);

// Fetch cat by breeds and render catInfo markup
function handleCatByBreed(event) {
  const selectedBreed = event.target.value;
  refs.catInfo.innerHTML = ' ';
  loader.show();

  catApiServiceInstance
    .fetchCatByBreed(selectedBreed)
    .then(data => {
      loader.hide();
      // Destructuring the data object
      const { breeds, url } = data[0];
      const { name, description, temperament } = breeds[0];

      // Render markup in div (.cat.info)
      refs.catInfo.innerHTML = createCatCardMarkup(
        url,
        name,
        description,
        temperament
      );
    })
    .catch(data => {
      loader.showErrorLoader();
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

// Function which created makup cat card
function createCatCardMarkup(url, name, description, temperament) {
  return `
    <img class="cat-image" src=${url} alt="${name}"/>
    <h2 class="cat-name">${name}</h2>
    <p class="cat-description"><span class="cat-span">Description: </span>${description}</p>
    <p class="cat-temperament"><span class="cat-span">Temperament: </span> ${temperament}</p>`;
}
