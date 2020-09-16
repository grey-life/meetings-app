import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AddMeetings from './AddMeeting';
import FilterMeetings from './FilterMeetings';

const MeetingsRoute = () => (
    <Switch>
        <Route path="/meetings/add">
            <AddMeetings />
        </Route>
        <Route path="/meetings">
            <FilterMeetings />
        </Route>
    </Switch>
);

export default MeetingsRoute;
