import React, { useState, useEffect } from 'react';
import FilterForm from './FilterForm';
import FilterResults from './FilterResults';
import { getUsers, getMeetings } from '../../../services/getDetails';

const FilterMeetings = () => {
    const [userEmails, setUserEmails] = useState([]);
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
                userEmails={userEmails}
            />
        </>

    );
};

export default FilterMeetings;
