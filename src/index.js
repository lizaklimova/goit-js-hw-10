import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';

import Notiflix from 'notiflix';

const refs = {
  selectRef: document.querySelector('.breed-select'),
  containerRef: document.querySelector('.cat-info'),
};

refs.selectRef.addEventListener('change', onSelectChange);
showContent('none');

// ~ Парсинг опцій
fetchBreeds()
  .then(data => {
    refs.selectRef.insertAdjacentHTML('beforeend', optionsMarkup(data));
    new SlimSelect({
      select: document.querySelector('.breed-select'),
      settings: {
        placeholderText: 'Select the breed of cat 🐈',
        // ! Підкажіть, будь ласка, чому плейсхолдер не відображається? Селект відображає першу опцію!
      },
    });
  })
  .catch(() =>
    Notiflix.Notify.failure(
      'Ooops!😮 Something went wrong! Try reloading the page! ❗️'
    )
  );

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

      const markup = `
      <img alt="Cat ${baseDist.name}" src="${data[0].url}" />
        <div class="content"> <h1 class="cat-info-title">${baseDist.name}🐈</h1>
        <p class ="cat-info-descr">${baseDist.description}</p>
        <p class = "cat-info-temperament"><span>😊Temperament:&#x20;</span> ${baseDist.temperament}</p></div>
      `;
      showContent('block');
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

function showContent(display) {
  refs.containerRef.style.display = display;
}
