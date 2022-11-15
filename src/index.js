import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;
const countryInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countryInput.addEventListener(
  'input',
  debounce(event => {
    const name = trimName(event.target.value);
    name !== '' ? fetchCountry(name) : null;
  }, DEBOUNCE_DELAY)
);

function fetchCountry(name) {
  fetchCountries(name)
    .then(country => {
      informationAboutCountry(country);
    })
    .catch(() => {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function informationAboutCountry(country) {
  if (country.length > 10) {
    return toManyCountries();
  }
  if (country.length > 1) {
    return addCountriesToList(country);
  }
  return showCountry(country);
}

function toManyCountries() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function addCountriesToList(countries) {
  countryInfo.innerHTML = '';
  const markup = countries
    .sort((firstCountry, secondCountry) =>
      firstCountry.name.common.localeCompare(secondCountry.name.common)
    )
    .map(
      country =>
        `<li class="country-item">
           <img src="${country.flags.svg}" />
           <p>${country.name.common}</p>
         </li>`
    )
    .join('\n');
  countryList.innerHTML = markup;
}

function showCountry(country) {
  countryList.innerHTML = '';
  const languages = Object.values(country[0].languages).join(', ');
  const markup = country.map(
    country =>
      `<h3><img src="${country.flags.svg}" />${country.name.common}</h3>
         <p><b>Capital: </b>${country.capital}</p>
         <p><b>Population: </b>${country.population}</p>
         <p><b>Laungages: </b>${languages}</p>`
  );
  countryInfo.innerHTML = markup;
}

function trimName(name) {
  let newName = '';
  name.split(' ').forEach((element, index) => {
    if (element !== '') {
      newName += ' ' + element;
    }
  });
  return newName.trim();
}
