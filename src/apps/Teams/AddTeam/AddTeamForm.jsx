/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import UserDropdown from '../../../components/UserDropdown';
import { addTeam } from '../../../services/addDetails';

const AddTeamForm = ({ userList, updateTeams }) => {
    const [members, setMembers] = useState([]);
    const [error, setError] = useState(null);

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Required';
        }
        if (!values.shortname) {
            errors.shortname = 'Required';
        } else if (!values.shortname.match(/^@[a-z][\w-]*/)) {
            errors.shortname = 'Team Name should start with \'@\' can only contain letters and \'-\' ';
        }

        if (!values.description) {
            errors.description = 'Required';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            shortname: '',
            description: '',
        },
        validate,
        onSubmit: async (values, {
            resetForm,
        }) => {
            try {
                await addTeam({
                    ...values,
                    members,
                });
                await updateTeams();
                setMembers([]);
                toast.success('Team Created Succesfully', {
                    position: 'bottom-center',
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                resetForm({});
            } catch (err) {
                setError(err.message);
            }
        },
    });

    return (
        <div className="col">
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Team Name</label>
                    <input
                        id="name"
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Team Name"
                        required="required"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                </div>
                {formik.errors.name && (
                    <div className="alert alert-danger">
                        {formik.errors.name}
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="shortname">Short Name</label>
                    <input
                        id="shortname"
                        type="text"
                        className="form-control"
                        name="shortname"
                        placeholder="Short Name"
                        required="required"
                        onChange={formik.handleChange}
                        value={formik.values.shortname}
                    />
                </div>
                {formik.errors.shortname && (
                    <div className="alert alert-danger">
                        {formik.errors.shortname}
                    </div>
                )}
                <ToastContainer />
                <div className="form-group">
                    <label htmlFor="description">
                        Description
                    </label>
                    <input
                        className="form-control"
                        id="description"
                        name="description"
                        type="text"
                        rows="1"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                    />
                </div>
                {formik.errors.description && (
                    <div className="alert alert-danger">
                        {formik.errors.description}
                    </div>
                )}
                {
                    error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )
                }
                <div className="form-group">
                    <UserDropdown
                        value={members}
                        onChange={setMembers}
                        disabled={!formik.isValid}
                        userList={userList}
                    />
                </div>
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

export default AddTeamForm;
