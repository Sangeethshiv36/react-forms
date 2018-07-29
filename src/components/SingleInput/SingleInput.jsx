import React from 'react';
import PropTypes from 'prop-types';

const SingleInput = (props) => (
    <div className="form-group row">
        <label className="form-label col-sm-4 col-md-4 col-lg-4">{props.title}</label>
        <input
            className="form-input form-control  col-sm-8 col-md-8 col-lg-8"
            id={props.id ? props.id : ''}
            name={"opportunity[" + props.name + "]"}
            type={props.inputType}
            value={props.value}
            disabled={!props.editMode}
            onChange={props.handlerFunction}
            data-setname={props.name}
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