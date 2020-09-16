/* eslint-disable react/prop-types */
import React from 'react';
import { useFormik } from 'formik';

const FilterForm = ({ updateMeetings }) => {
    const formik = useFormik({
        initialValues: {
            date: 'TODAY',
            search: '',
        },
        onSubmit: async (values) => {
            await updateMeetings(values);
        },
    });

    return (
        <div className="col">
            <h4>Search for meetings</h4>
            <hr />
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <select
                        className="form-control"
                        id="date"
                        name="date"
                        value={formik.values.date}
                        onChange={formik.handleChange}
                    >
                        <option value="ALL">ALL</option>
                        <option value="TODAY">TODAY</option>
                        <option value="PREVIOUS">PREVIOUS</option>
                        <option value="UPCOMING">UPCOMING</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="search">Search for</label>
                    <textarea
                        className="form-control"
                        id="search"
                        name="search"
                        rows="1"
                        value={formik.values.search}
                        onChange={formik.handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={formik.isSubmitting}
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default FilterForm;
