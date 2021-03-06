import API from '../js/fetchCountries.js';
import { searchForm, cardContainer, searchBtn } from '../js/refs.js';

import countryCardTemp from '../templates/country-card.hbs';
import countriesListTemp from '../templates/countries-card-list.hbs';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
const { info, error } = require('@pnotify/core');
import debounce from 'lodash.debounce';

searchForm.addEventListener('input', debounce(onSearch, 500));
searchBtn.addEventListener('click', () => {
    searchForm.value = '';
    clearList();
});

function onSearch(e) {
    e.preventDefault();
    clearList();
    const searchQuery = e.target.value.trim();
    if (!searchQuery) {
        return;
    }

    API.fetchCountries(searchQuery).then(renderCountryCard).catch(onFetchError);
}

function renderCountryCard(country) {
    if (country.length > 10) {
        clearList();
        info({
            title: 'Сделайте запрос более специфичным',
            text: 'Под наименование подходит более 10 стран',
            delay: 3000,
            width: '500px',
            sticker: false,
        });
    } else if (country.length === 1) {
        cardContainer.innerHTML = countryCardTemp(country[0]);
    } else if (country.length > 1 && country.length <= 10) {
        cardContainer.innerHTML = countriesListTemp(country);
    } else
        error({
            title: 'Введено некорректное название страны',
            text: 'Попробуйте ввести запрос иначе',
            delay: 2000,
            width: '500px',
            sticker: false,
        });
}

function onFetchError() {
    error({
        title: 'Извините, что-то пошло не так',
        text: 'Попробуйте позже',
        delay: 2000,
        width: '500px',
        sticker: false,
    });
}

function clearList() {
    cardContainer.innerHTML = '';
}
