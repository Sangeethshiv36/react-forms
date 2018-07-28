import React from 'react';
import PropTypes from 'prop-types';

const SingleInput = (props) => (
    <div className="form-group">
        <label className="form-label">{props.title}</label>
        <input
            className="form-input"
            name={props.name}
            type={props.inputType}
            value={props.value}
            disabled={!props.editMode}
            onChange={props.handlerFunction}
        />
    </div>
);

SingleInput.propTypes = {
    inputType: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    handlerFunction: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    editMode: PropTypes.bool.isRequired,
};

export default SingleInput;