import React from 'react';
import PropTypes from 'prop-types';

const SelectDropdown = (props) => (
    < div className="form-group row" >
        <label className="form-label col-sm-4 col-md-4 col-lg-4">{props.title}</label>
        <select
            className="form-select form-control col-sm-8 col-md-8 col-lg-8"
            value={props.value}
            onChange={props.handlerFunction}
            data-setname={props.name}
        >
            {props.options.map(opt => {
                return (
                    <option
                        key={opt.id}
                        value={opt.id}>{opt.name}</option>
                );
            }
            )}
        </select>
    </div >
);

SelectDropdown.propTypes = {
    options: PropTypes.array.isRequired,
    selectedOption: PropTypes.string,
    handlerFunction: PropTypes.func.isRequired,
};

export default SelectDropdown;
