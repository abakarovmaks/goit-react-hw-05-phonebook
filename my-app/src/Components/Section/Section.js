import React from 'react';
import styles from './Section.module.css';
import { CSSTransition } from 'react-transition-group';
import './AppBar.css';

export default function Section({ title, children }) {
  return (
    <section className={styles.section}>
      <CSSTransition
        in={true}
        appear={true}
        timeout={500}
        classNames="Appbar-slideIn"
        unmountOnExit
      >
        <p className={styles.title}>{title}</p>
      </CSSTransition>
      {children}
    </section>
  );
}
