
import React from 'react';
import { BrowserRouter as Switch, Route, BrowserRouter } from "react-router-dom";

// Import pages
import App from './App';

import Profile from './pages/Prof';
import LicenseDoc from './pages/License';

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/u/profile" component={Profile}/>
                <Route path="/m/profile" component={Profile}/>
                <Route path="/p/:user" component={Profile}/>
                <Route path="/pg/doc/license" component={LicenseDoc}/>

            </Switch>
        </BrowserRouter>
    );
}

export default Router;
