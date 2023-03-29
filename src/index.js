import './css/styles.css';
import { CountriesAPI} from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const countriesAPI = new CountriesAPI();

const inputSearchCountryEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const onSearchCounry = () => {
    const name = inputSearchCountryEl.value.trim();
    if (!name) {
        return (countryListEl.innerHTML = ''), (countryInfoEl.innerHTML = '')
    };

    countriesAPI.fetchCountries(name)
        .then(data => {
            countryListEl.innerHTML = '';
            countryInfoEl.innerHTML = '';
            if (data.length === 1) {
                countryListEl.insertAdjacentHTML('beforeend', renderCountryList(data));
                countryInfoEl.insertAdjacentHTML('beforeend', renderCountryInfo(data));
            } else if (data.length > 10) {
                alertTooManyMatches();
            } else {
                countryListEl.insertAdjacentHTML('beforeend', renderCountryList(data));
            }

        }).catch(err => {
            countryListEl.innerHTML = '';
            countryInfoEl.innerHTML = '';
            console.log(err);
            alertWrongName();
        
        });
};

function renderCountryList(data) {
    const markup = data
        .map(({ name, flags }) => {
            return `
          <li class="country-list__item">
              <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 30px height = 30px>
              <h2 class="country-list__name">${name.official}</h2>
          </li>
          `
        })
        .join('');
    return markup;
};

function renderCountryInfo(data) {
    const markup = data
        .map(({ capital, population, languages }) => {
            return `
        <ul class="country-info__list">
            <li class="country-info__item"><p><b>Capital: </b>${capital}</p></li>
            <li class="country-info__item"><p><b>Population: </b>${population}</p></li>
            <li class="country-info__item"><p><b>Languages: </b>${Object.values(languages).join(', ')}</p></li>
        </ul>
        `
        })
        .join('');
    return markup;
};

function alertWrongName() {
    Notify.failure(`Oops, there is no country with that name "${inputSearchCountryEl.value.trim()}".`);
}

function alertTooManyMatches() {
    Notify.info('Too many matches found. Please enter a more specific name.');
}

inputSearchCountryEl.addEventListener('input', debounce(onSearchCounry, DEBOUNCE_DELAY));
