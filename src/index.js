import './sass/main.scss';

import countryCardTemp from '../src/templates/country-card.hbs';

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
        console.log(markup);
        //document.querySelector('.cards');
    })
    .catch(error => console.error(error));
