import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const select = new SlimSelect({
  select: document.querySelector('.breed-select'),

  settings: {
    placeholderText: 'Select the breed of cat 🐈',
  },
});

const refs = {
  selectRef: document.querySelector('.breed-select'),
  containerRef: document.querySelector('.cat-info'),
};

refs.selectRef.addEventListener('change', onSelectChange);

// ~ Парсинг опцій
fetchBreeds()
  .then(data => {
    select.setData(optionsMarkup(data));
  })
  .catch(error => console.log(error));

// ~ Розмітка опцій випадаючого меню
function optionsMarkup(arr) {
  return arr.map(({ name, id }) => ({ text: name, value: id }));
}

// ~ Ріпейнт обраного котика
function onSelectChange(event) {
  refs.containerRef.innerHTML = '';
  const id = event.target.value;
  Notiflix.Loading.circle();

  fetchCatByBreed(id)
    .then(data => {
      const baseDist = data[0].breeds[0];

      const markup = `
        <img alt="Cat ${baseDist.name}" src="${data[0].url} />
        <h1 class="cat-info-title">${baseDist.name}</h1>
        <p class ="cat-info-descr">${baseDist.description}</p>
        <p class = "cat-info-temperament"><span>Temperament:</span>${baseDist.temperament}</p>`;
      refs.containerRef.innerHTML = markup;
    })
    .catch(() =>
      Notiflix.Notify.failure(
        'Ooops!😮 Something went wrong! Try reloading the page! ❗️'
      )
    )
    .finally(() => {
      Notiflix.Loading.remove();
    });
}
