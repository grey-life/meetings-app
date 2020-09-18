import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './apps/Login';
import Users from './apps/AdminView/Users';
import AdminTeamsView from './apps/AdminView/Teams';
import AdminMeetingssView from './apps/AdminView/Meetings';
import Signup from './apps/Signup';
import Calendar from './apps/Calendar';
import Meetings from './apps/Meetings';
import Teams from './apps/Teams';

const AppRoute = () => (
    <Router>
        <Switch>
            <Route path="/admin/users">
                <Users />
            </Route>
            <Route path="/admin/meetings">
                <AdminMeetingssView />
            </Route>
            <Route path="/admin/teams">
                <AdminTeamsView />
            </Route>
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
