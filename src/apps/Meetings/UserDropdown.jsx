/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const UserDropdown = ({ addAttendee, userEmails }) => {
    const [selected, setSelected] = useState('');
    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    return (
        <div className="form-group d-flex justify-content-between">
            <select
                id="date"
                name="date"
                value={selected}
                onChange={handleChange}
            >
                <option value="" disabled>Please select a username...</option>
                {
                    userEmails.map((user) => (
                        <option
                            key={user.username}
                            value={user.username}
                        >
                            {user.username}
                        </option>
                    ))
                }
            </select>
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => { addAttendee(selected); }}
            >
                Add participant
            </button>
        </div>
    );
};

export default UserDropdown;
