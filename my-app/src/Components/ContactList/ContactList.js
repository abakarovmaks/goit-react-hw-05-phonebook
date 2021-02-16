import React from 'react';
import PropTypes from 'prop-types';
// import Contact from '../Contact/Contact';
import styles from './ContactList.module.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../Section/Fade.css';

export default function ContactList({ contacts, onDelete }) {
  return (
    <TransitionGroup component="ul" className={styles.list}>
      {contacts.map(({ id, name, number }) => (
        <CSSTransition
          key={id}
          timeout={500}
          classNames="List-slideIn"
          unmountOnExit
        >
          <li className={styles.contact}>
            <span className={styles.name}>{name}</span>
            <span className={styles.number}>{number}</span>
            <button
              className={styles.btn}
              onClick={() => {
                onDelete(id);
              }}
            >
              Delete
            </button>
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ),
  onDelete: PropTypes.func.isRequired,
};
