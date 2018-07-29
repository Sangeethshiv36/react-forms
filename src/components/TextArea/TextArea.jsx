import React from 'react';
import PropTypes from 'prop-types';

const TextArea = (props) => (
    <div className="form-group row">
        <label className="form-label col-sm-4 col-md-4 col-lg-4">{props.title}</label>
        <textarea
            className="form-input form-control col-sm-8 col-md-8 col-lg-8"
            style={props.resize ? null : { resize: 'none' }}
            name={"opportunity[" + props.name + "]"}
            rows={props.rows}
            value={props.value}
            disabled={!props.editMode}
            data-setname={props.name}
            onChange={props.handlerFunction}
        />
    </div>
);

TextArea.propTypes = {
    title: PropTypes.string.isRequired,
    rows: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    resize: PropTypes.bool,
    handlerFunction: PropTypes.func.isRequired
};

export default TextArea;  