/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import UserDropdown from '../../components/UserDropdown';
import { leaveTeam, addMembers } from '../../services/updateDetails';

const Team = ({ team, userList, removeTeam }) => {
    const [members, setMembers] = useState(team.members);
    const [error, setError] = useState(null);

    const updateMeeting = async () => {
        const { _id: teamId } = team;
        try {
            addMembers(teamId, members);
        } catch (err) {
            setError(err);
        }
    };

    const handleClick = async () => {
        const { _id: teamId } = team;
        try {
            await leaveTeam(teamId);
            removeTeam();
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <div className="form-group d-flex justify-content-between">
                    <h5 className="card-title">{team.name}</h5>
                    <p>{team.shortname}</p>
                </div>
                <p className="card-text">{team.description}</p>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleClick}
                >
                    Leave Team
                </button>
                <hr />
                <h5>Members</h5>
                <div className="mb-2">
                    <UserDropdown
                        value={members}
                        onChange={setMembers}
                        userList={userList}
                    />
                </div>
                {
                    error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )
                }
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={updateMeeting}
                >
                    Update Meeting
                </button>
            </div>
        </div>
    );
};

export default Team;
