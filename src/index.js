import './css/styles.css';
import { CountriesAPI, CountriesAPI } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const CountriesAPI = new CountriesAPI();

const inputSearchCountryEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('#country-list');
const countryInfoEl = document.querySelector('#country-info');



