import React from 'react';
import PropTypes from 'prop-types';

const ListOptions = (props) => (
    <div className="form-group row">
        <label className="form-label col-sm-4 col-md-4 col-lg-4">{props.title}</label>
        <ul
            className="list-group col-sm-8 col-md-8 col-lg-8"
            name={props.name}>
            {props.options.map(opt => {
                return (
                    <li className="list-group-item"
                        key={opt.id}>{opt.name}
                    </li>
                );
            }
            )}
        </ul>
    </div>
);

ListOptions.propTypes = {
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
};

export default ListOptions;  