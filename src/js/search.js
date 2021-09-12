import { searchForm, cardsList, articleCard } from './refs.js';

import countryCardTemp from '../templates/country-card.hbs';
import countriesListTemp from '../templates/countries-card-list.hbs';

import '@pnotify/core/dist/BrightTheme.css';
const { error } = require('@pnotify/core');
const debounce = require('lodash.debounce');

// const data = {
//     title: 'Title',
// };
// document.body.innerHTML = countryCardTemp(data);

searchForm.addEventListener('input', onSearch);

function onSearch(e) {
    e.preventDefault();
    const input = e.currentTarget;
    const searchQuery = input.elements.query.value;

    fetchCountryByName(searchQuery)
        .then(renderCountryCard)
        .catch(error => console.error(error));
}

function fetchCountryByName(countryName) {
    return fetch(`https://restcountries.eu/rest/v2/name/${countryName}`).then(response => {
        return response.json();
    });
}

function renderCountryCard(country) {
    const markup = countryCardTemp(country[0]);
    articleCard.innerHTML = markup;
    console.log(markup);
}
