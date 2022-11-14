import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';

function fetchTest(name) {
  fetchCountries(name)
    .then(country => {
      console.log(country.length);
      console.log(country[0].name);
      console.log(country[0].capital[0]);
      console.log(country[0].population);
      console.log(country[0].flags.svg);
      console.log(country[0].languages);
    })
    .catch(error => console.log(error));
}

const test = fetchTest('pola');

const DEBOUNCE_DELAY = 300;
