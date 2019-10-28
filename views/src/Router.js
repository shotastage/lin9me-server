
import React from 'react';
import { BrowserRouter as Switch, Route, BrowserRouter } from "react-router-dom";

// Import pages
import App from './App';

import Profile from './pages/Prof';

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/u/profile" component={Profile}/>

            </Switch>
        </BrowserRouter>
    );
}

export default Router;
