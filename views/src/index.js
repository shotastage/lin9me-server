import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import './index.scss';
import * as serviceWorker from './serviceWorker';

import { Suspense } from 'react';


import './i18n';



ReactDOM.render(
    <Suspense fallback={(<div>Loading</div>)}>
        <Router/>
    </Suspense>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
