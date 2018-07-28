import React from 'react';
import PropTypes from 'prop-types';

const SelectDropdown = (props) => (
    < div className="form-group" >
        <label className="form-label">{props.title}</label>
        <select
            className="form-select"
            name={props.name}
            value={props.selectedOption}
            onChange={props.handlerFunction}
        >
            <option value=''>{props.value}</option>
            {props.options.map(opt => {
                return (
                    <option
                        key={opt.id}
                        value={opt.name}>{opt.name}</option>
                );
            }
            )}
        </select>
    </div >
);

SelectDropdown.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    selectedOption: PropTypes.string,
    handlerFunction: PropTypes.func.isRequired,
};

export default SelectDropdown;
