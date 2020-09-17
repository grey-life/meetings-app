/* eslint-disable react/prop-types */
import React from 'react';
import './SectionHeading.css';

const SectionHeading = ({ title }) => (
    <div className="col-8 section-heading">
        <h2>{title}</h2>
        <hr />
    </div>
);

export default SectionHeading;
