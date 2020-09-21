import React, { useState, useEffect } from 'react';
import FilterForm from './FilterForm';
import FilterResults from './FilterResults';
import { getUsers, getMeetings, getAllTeams } from '../../../services/getDetails';

const FilterMeetings = () => {
    const [userEmails, setUserEmails] = useState([]);
    const [shortName, setShortName] = useState([]);
    const [meetings, setMeetings] = useState([]);
    const [error, setError] = useState(null);

    const updateMeetings = async ({ date, search }) => {
        try {
            const meetingsResult = await getMeetings({ date, search });
            setMeetings(meetingsResult);
        } catch (err) {
            setError(err);
        }
    };

    const removeMeeting = (index) => {
        const newMeetings = [...meetings];
        newMeetings.splice(index, 1);
        setMeetings(newMeetings);
    };

    useEffect(() => {
        getUsers()
            .then((data) => {
                setUserEmails(data);
            })
            .catch((err) => {
                setError(err);
            });
        getMeetings({ date: 'TODAY', search: '' })
            .then((data) => {
                setMeetings(data);
            })
            .catch((err) => {
                setError(err);
            });
    }, []);

    useEffect(() => {
        async function fetchTeams() {
            try {
                const data = await getAllTeams();
                const project = data.map((team) => ({ username: team.shortname }));
                setShortName(project);
            } catch (err) {
                setError(err.message);
            }
        } fetchTeams();
    }, []);

    return (
        <>
            <FilterForm updateMeetings={updateMeetings} />
            {
                error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )
            }
            <FilterResults
                meetings={meetings}
                removeMeeting={removeMeeting}
                userEmails={[...userEmails, ...shortName]}
            />
        </>

    );
};

export default FilterMeetings;
