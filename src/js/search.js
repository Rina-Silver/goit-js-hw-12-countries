import refs from './refs.js';

import countryCardTemp from '../templates/country-card.hbs';
import countriesListTemp from '../templates/countries-card-list.hbs';

import '@pnotify/core/dist/BrightTheme.css';
const { error } = require('@pnotify/core');
const debounce = require('lodash.debounce');

// const data = {
//     title: 'Title',
// };
// document.body.innerHTML = countryCardTemp(data);

fetch('https://restcountries.eu/rest/v2/name/eesti')
    .then(response => {
        return response.json();
    })
    .then(country => {
        console.log(country);
        const markup = countryCardTemp(country);
        //console.log(markup);
        //document.querySelector('.cards');
    })
    .catch(error => console.error(error));