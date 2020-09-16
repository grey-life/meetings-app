import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './apps/Login';
import Signup from './apps/Signup';
import Calendar from './apps/Calendar';
import Meetings from './apps/Meetings';
import Teams from './apps/Teams';

const AppRoute = () => (
    <Router>
        <Switch>
            <Route path="/calendar">
                <Calendar />
            </Route>
            <Route path="/meetings">
                <Meetings />
            </Route>
            <Route path="/teams">
                <Teams />
            </Route>
            <Route path="/signup">
                <Signup />
            </Route>
            <Route path="/">
                <Login />
            </Route>

        </Switch>
    </Router>
);

export default AppRoute;
