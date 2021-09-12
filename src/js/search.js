import fetchCountries from '../js/fetchCountries.js';

import countryCardTemp from '../templates/country-card.hbs';
import countriesListTemp from '../templates/countries-card-list.hbs';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
const { info, error } = require('@pnotify/core');
const debounce = require('lodash.debounce');

// const data = {
//     title: 'Title',
// };
// document.body.innerHTML = countryCardTemp(data);

const refs = {
    searchForm: document.querySelector('.search-control'),
    cardContainer: document.querySelector('.js-card-container'),
};

refs.searchForm.addEventListener('input', onSearch);

function onSearch(e) {
    e.preventDefault();

    const searchQuery = e.target.value;

    fetchCountries(searchQuery)
        .then(renderCountryCard)
        .catch(error => console.error(error))
        .finally(() => refs.searchForm.value === '');
}

function renderCountryCard(country) {
    const markup = countryCardTemp(country[0]);
    refs.cardContainer.innerHTML = markup;
    //console.log(markup);
}
