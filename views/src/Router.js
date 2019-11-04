
import React from 'react';
import { BrowserRouter as Switch, Route, BrowserRouter } from "react-router-dom";

// Import pages
import App from './App';

import Profile from './pages/Prof';
import ProfileManager from './pages/ProfManager';

import Login from './pages/Login';
import Logout from './pages/Logout';
import SignUp from './pages/SignUp';
import Warning from './pages/Warning';
import LicenseDoc from './pages/License';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Dashboard from './pages/Dashboard';

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/m/signin" component={Login}/>
                <Route path="/m/signup" component={SignUp}/>
                <Route path="/m/logout" component={Logout}/>
                <Route path="/m/dash+profile" component={ProfileManager}/>
                <Route path="/m/dash" component={Dashboard}/>
                <Route path="/p/:user" component={Profile}/>
                <Route path="/pg/license" component={LicenseDoc}/>
                <Route path="/pg/privacy-policy" component={PrivacyPolicy}/>
                <Route path="/warning/:ID" component={Warning}/>

            </Switch>
        </BrowserRouter>
    );
}

export default Router;
