import API from '../js/fetchCountries.js';

import countryCardTemp from '../templates/country-card.hbs';
import countriesListTemp from '../templates/countries-card-list.hbs';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
const { info, error } = require('@pnotify/core');
const debounce = require('lodash.debounce');

const refs = {
    searchForm: document.querySelector('.search-control'),
    cardContainer: document.querySelector('.js-card-container'),
};

refs.searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
    e.preventDefault();
    //refs.cardContainer.innerHTML = '';
    const searchQuery = e.target.value;

    API.fetchCountries(searchQuery).then(renderCountryCard).catch(onFetchError);
}

function renderCountryCard(country) {
    const markup = countryCardTemp(country[0]);
    refs.cardContainer.innerHTML = markup;
    //console.log(markup);
}

function onFetchError() {
    error({
        title: 'Invalid name of country entered',
        text: 'Please enter correct query',
        delay: 2000,
        width: '500px',
    });
}
