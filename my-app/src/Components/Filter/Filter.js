import React from 'react';
import PropTypes from 'prop-types';
import './Filter.css';
import { CSSTransition } from 'react-transition-group';

export default function Filter({ value, onChange, contacts }) {
  return (
    <CSSTransition
      in={contacts.length > 1}
      timeout={250}
      classNames="Filter-fade"
      unmountOnExit
    >
      <form className="form">
        <label>
          <span className="title">Find contacts by name</span>
          <input
            className="input"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </label>
      </form>
    </CSSTransition>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.object),
};
