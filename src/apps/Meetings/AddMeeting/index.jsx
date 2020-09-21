import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { getUsers } from '../../../services/getDetails';
import UserDropdown from '../UserDropdown';
import { addMeeting } from '../../../services/addDetails';
import padZeros from '../../../helpers/padZeros';

const AddMeetings = () => {
    const [userEmails, setUserEmails] = useState([]);
    const [attendees, setAttendees] = useState([]);
    const [error, setError] = useState(null);

    const addAttendee = (attendee) => {
        const newAttendees = [...attendees];
        if (!newAttendees.includes(attendee)) {
            newAttendees.push(attendee);
            setAttendees(newAttendees);
        }
    };

    const validate = (values) => {
        const errors = {};

        if (!values.date) {
            errors.date = 'Required';
        }

        if (values.startTimeHours > 24 || values.startTimeHours < 0) {
            errors.startTimeHours = 'Hours should be between 0 - 24';
        } else if (values.startTimeMinutes > 59 || values.startTimeMinutes < 0) {
            errors.startTimeHours = 'Hours should be between 0 - 59';
        }

        if (values.endTimeHours > 24 || values.endTimeHours < 0) {
            errors.startTimeHours = 'Hours should be between 0 - 24';
        } else if (values.endTimeMinutes > 59 || values.endTimeMinutes < 0) {
            errors.startTimeHours = 'Hours should be between 0 - 59';
        } else if (values.endTimeHours < values.startTimeHours) {
            errors.endTimeHours = 'End Time cannot be less then Start time';
        } else if (
            (values.endTimeHours === values.startTimeHours)
            && (values.endTimeMinutes < values.startTimeMinutes)
        ) {
            errors.endTimeHours = 'End Time cannot be less then Start time';
        }

        if (!values.description) {
            errors.description = 'Required';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            date: '',
            startTimeHours: '',
            startTimeMinutes: '',
            endTimeHours: '',
            endTimeMinutes: '',
            description: '',
        },
        validate,
        onSubmit: async ({
            startTimeHours,
            startTimeMinutes,
            endTimeHours,
            endTimeMinutes,
            ...rest
        }, {
                resetForm,
            }) => {
            const meeting = {
                ...rest,
                startTime: `${padZeros(startTimeHours)}:${padZeros(startTimeMinutes)}`,
                endTime: `${padZeros(endTimeHours)}:${padZeros(endTimeMinutes)}`,
                attendees,
            };
            try {
                await addMeeting(meeting);
                toast.success('Meeting Added Succesfully', {
                    position: 'bottom-center',
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                resetForm({});
                setAttendees([]);
            } catch (err) {
                setError(err.message);
            }
        },
    });

    useEffect(() => {
        getUsers()
            .then((data) => {
                setUserEmails(data);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);

    return (
        <div className="col">
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        className="form-control"
                        type="date"
                        id="date"
                        name="date"
                        min={moment().format('YYYY-MM-DD')}
                        value={formik.values.date}
                        onChange={formik.handleChange}
                    />
                </div>
                {formik.errors.date && (
                    <div className="alert alert-danger">
                        {formik.errors.date}
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="startTime">Start Time (hh:mm)</label>
                    <div className="startTime">
                        <input
                            type="number"
                            id="startTimeHours"
                            name="startTimeHours"
                            min="0"
                            max="24"
                            value={formik.values.startTimeHours}
                            onChange={formik.handleChange}
                        />
                        {' : '}
                        <input
                            type="number"
                            id="startTimeMinutes"
                            name="startTimeMinutes"
                            min="0"
                            max="59"
                            value={formik.values.startTimeMinutes}
                            onChange={formik.handleChange}
                        />
                    </div>
                </div>
                {formik.errors.startTimeHours && (
                    <div className="alert alert-danger">
                        {formik.errors.startTimeHours}
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="endTime">End Time (hh:mm)</label>
                    <div className="endTime">
                        <input
                            type="number"
                            id="endTimeHours"
                            name="endTimeHours"
                            min="0"
                            max="24"
                            value={formik.values.endTimeHours}
                            onChange={formik.handleChange}
                        />
                        {' : '}
                        <input
                            type="number"
                            id="endTimeMinutes"
                            name="endTimeMinutes"
                            min="0"
                            max="59"
                            value={formik.values.endTimeMinutes}
                            onChange={formik.handleChange}
                        />
                    </div>

                </div>
                {formik.errors.endTimeHours && (
                    <div className="alert alert-danger">
                        {formik.errors.endTimeHours}
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="2"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                    />
                </div>
                {formik.errors.description && (
                    <div className="alert alert-danger">
                        {formik.errors.description}
                    </div>
                )}
                <div className="form-group">
                    { attendees.join(',') }
                </div>
                {
                    error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )
                }
                <ToastContainer />
                <UserDropdown addAttendee={addAttendee} userEmails={userEmails} />
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!formik.isValid}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddMeetings;
