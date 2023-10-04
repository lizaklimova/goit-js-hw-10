import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const refs = {
  selectRef: document.querySelector('.breed-select'),
  containerRef: document.querySelector('.cat-info'),
};

refs.selectRef.addEventListener('change', onSelectChange);
window.addEventListener('load', onLoadFetchBreeds);
showContent('none');

function createSlimSelect(ref) {
  const select = new SlimSelect({
    select: ref,
    settings: {
      placeholderText: 'Select the breed of cat 🐈',
    },
  });
}

// ~ Парсинг опцій
function onLoadFetchBreeds() {
  fetchBreeds()
    .then(data => {
      Notiflix.Loading.circle();

      repaintMarkup('beforeend', optionsMarkup(data));

      createSlimSelect(refs.selectRef);
    })
    .catch(() =>
      Notiflix.Notify.failure(
        'Ooops!😮 Something went wrong! Try reloading the page! ❗️'
      )
    )
    .finally(() => Notiflix.Loading.remove());
}

// ~ Розмітка опцій випадаючого меню
function optionsMarkup(arr) {
  return arr.map(({ name, id }) => {
    return `<option value=${id}>${name}</option>`;
  });
}

// ~ Ріпейнт обраного котика
function onSelectChange(event) {
  refs.containerRef.innerHTML = '';
  Notiflix.Loading.circle();

  const id = event.target.value;

  fetchCatByBreed(id)
    .then(data => {
      const baseDist = data[0].breeds[0];
      const topLevel = data[0];

      showContent('block');

      refs.containerRef.innerHTML = createCatContainerMarkup(
        baseDist,
        topLevel
      );
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

function createCatContainerMarkup(commonDist, topLev) {
  return `
      <img alt="Cat ${commonDist.name}" src="${topLev.url}" />
        <div class="content"> <h1 class="cat-info-title">${commonDist.name}🐈</h1>
        <p class ="cat-info-descr">${commonDist.description}</p>
        <p class = "cat-info-temperament"><span>😊Temperament:&#x20;</span> ${commonDist.temperament}</p></div>
      `;
}

function showContent(display) {
  refs.containerRef.style.display = display;
}

// ~ Ріпейнт обраного котика
function repaintMarkup(place, markup) {
  refs.selectRef.insertAdjacentHTML(place, markup);
}
