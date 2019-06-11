import * as React from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

// @ts-ignore
import App from  "App/App"

const Routes = () => (
    <Router>
        <Switch>
            <Route path={`/all/:sort?/:order?`} component={App} />
            <Route path={`/all/:sort/:order`} component={App} />
            <Route path={`/:sort/:order/:page`} component={App} />
            <Route path={`/`} component={App} />
            <Route component={App} />
        </Switch>
    </Router>
)

export default Routes
export { Routes }