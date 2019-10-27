import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import './index.scss';
import * as serviceWorker from './serviceWorker';



import en_US from './locales/en_US'
import ja_JP from './locales/ja_JP'
import '@formatjs/intl-pluralrules/polyfill';
import { IntlProvider } from 'react-intl'


const locale = navigator.language.split('_')[0]
const chooseLocale = (locale) => {
  switch(locale) {
    case 'en':
      return en_US
    case 'ja':
      return ja_JP
    default:
      return en_US
  }
}


ReactDOM.render(
<IntlProvider locale={locale} messages={chooseLocale(locale)}>
    <Router/>
</IntlProvider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
