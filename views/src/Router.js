
import React from 'react';
import { BrowserRouter as Switch, Route, BrowserRouter } from "react-router-dom";

// Import pages
import App from './App';

import Profile from './pages/Prof';
import LicenseDoc from './pages/License';
import PrivacyPolicy from './pages/PrivacyPolicy';

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/u/profile" component={Profile}/>
                <Route path="/m/profile" component={Profile}/>
                <Route path="/p/:user" component={Profile}/>
                <Route path="/pg/license" component={LicenseDoc}/>
                <Route path="/pg/privacy-policy" component={PrivacyPolicy}/>

            </Switch>
        </BrowserRouter>
    );
}

export default Router;
