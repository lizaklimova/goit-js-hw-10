import { fetchBreeds, fetchCatByBreed } from './cat-api';

const refs = {
  selectRef: document.querySelector('.breed-select'),
  containerRef: document.querySelector('.cat-info'),
  loaderRef: document.querySelector('.loader'),
  errorRef: document.querySelector('.error'),
};

refs.selectRef.addEventListener('change', onSelectChange);

// ~ Парсинг опцій
fetchBreeds()
  .then(data => {
    refs.selectRef.insertAdjacentHTML('beforeend', optionsMarkup(data));
  })
  .catch(error => console.log(error));

// ~ Розмітка опцій випадаючого меню
function optionsMarkup(arr) {
  return arr
    .map(({ name, id }) => {
      return `<option value="${id}"> ${name} </option>`;
    })
    .join('');
}

// ~ Ріпейнт обраного котика
function onSelectChange(event) {
  refs.containerRef.textContent = '';
  const id = event.target.value;
  toggleClassList(refs.loaderRef, 'inactive', 'active');

  fetchCatByBreed(id)
    .then(data => {
      const baseDist = data[0].breeds[0];

      const markup = `
        <img alt="Cat ${baseDist.name}" src="${data[0].url}" />
        <h1 class="cat-info-title">${baseDist.name}</h1>
        <p class ="cat-info-descr">${baseDist.description}</p>
        <p class = "cat-info-temperament"><span>Temperament:</span>${baseDist.temperament}</p>`;
      refs.containerRef.innerHTML = markup;
    })
    .catch(error => console.log(error))
    .finally(() => toggleClassList(refs.loaderRef, 'active', 'inactive'));
}

function toggleClassList(ref, cl1, cl2) {
  ref.classList.replace(cl1, cl2);
}
