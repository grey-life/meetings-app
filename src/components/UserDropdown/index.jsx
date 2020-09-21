/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const CheckboxesTags = (props) => {
    const {
        value, onChange, disabled, userList, placeholder,
    } = props;
    const [selected, setSelected] = useState(value);

    return (
        <Autocomplete
            multiple
            options={userList}
            limitTags={1}
            size="small"
            defaultValue={selected}
            onChange={(event, selectedMembers) => {
                onChange(selectedMembers);
                setSelected(selectedMembers);
            }}
            disabled={disabled}
            filterSelectedOptions
            disableCloseOnSelect
            getOptionLabel={(option) => option}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder={placeholder}
                />
            )}
        />
    );
};
export default CheckboxesTags;
