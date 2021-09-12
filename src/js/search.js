import API from '../js/fetchCountries.js';
import { searchForm, cardContainer } from '../js/refs.js';

import countryCardTemp from '../templates/country-card.hbs';
import countriesListTemp from '../templates/countries-card-list.hbs';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
const { info, error } = require('@pnotify/core');
import debounce from 'lodash.debounce';

searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
    e.preventDefault();
    //cardContainer.innerHTML = '';
    const searchQuery = e.target.value.trim();
    if (!searchQuery) {
        return;
    }

    API.fetchCountries(searchQuery).then(renderCountryCard).catch(onFetchError);
}

function renderCountryCard(country) {
    const markup = countryCardTemp(country[0]);
    cardContainer.innerHTML = markup;
    //console.log(markup);
}

function onFetchError() {
    error({
        title: 'Введено некорректное название страны',
        text: 'Попробуйте ввести запрос иначе',
        delay: 2000,
        width: '500px',
        sticker: false,
    });
}
