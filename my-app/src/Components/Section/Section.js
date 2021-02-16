import React from 'react';
import styles from './Section.module.css';
import { CSSTransition } from 'react-transition-group';
import './Fade.css';

export default function Section({ title, children }) {
  return (
    <section className={styles.section}>
      <CSSTransition
        in={true}
        appear={true}
        timeout={500}
        classNames="Title-slideIn"
        unmountOnExit
      >
        <p className={styles.title}>{title}</p>
      </CSSTransition>
      {children}
    </section>
  );
}
