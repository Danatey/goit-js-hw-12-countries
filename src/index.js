import './sass/main.scss';

import debounce from 'lodash.debounce';

import API from './js/add-card';
import getEl from './js/elements';

import countryCardTmpl from './template/country-card.hbs';
import countryLiTmpl from './template/country-item.hbs';

import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

defaultModules.set(PNotifyMobile, {});

alert({
  text: 'Please,enter a random country'
});

const refs = getEl();

function onSearch(evnt) {
    const searchQuery = evnt.target.value.trim();
    if (searchQuery === '') {
        refs.countryContainer.innerHTML = '';
        return;
    }
    
    API.fetchCountry(searchQuery).then(renderCountries).catch(onFetchError);
}

function renderCountries(countries) {
    if (countries.length === 1) {
        const markupCard = countryCardTmpl(countries);
        refs.countryContainer.innerHTML = markupCard;
    } else if (countries.length > 1 && countries.length < 11) {
        const markupList = countryLiTmpl(countries);
        refs.countryContainer.innerHTML = markupList;
    } else if (countries.length >= 11) {
        onRenderError();
    }
}

function onRenderError() {
    alert({
        text: 'Please, type more specific query',
        hide: true,
        delay: 2000,
        sticker: false,
        mode: 'dark',
        width: '100%',
        icons: 'brighttheme',
        closer: true,
        closerHover: false,
    });
}

function onFetchError() {
    alert({
        text: 'ERROR! Check entered symbols!',
        hide: true,
        delay: 4000,
        sticker: false,
        mode: 'dark',
        width: '100%',
        icons: 'brighttheme',
        closer: true,
        closerHover: false,
    });
}

function clearQuery() {
    refs.searchInput.value = '';
}

refs.searchInput.addEventListener('input', debounce(onSearch, 500));
refs.clearButton.addEventListener('click', clearQuery);