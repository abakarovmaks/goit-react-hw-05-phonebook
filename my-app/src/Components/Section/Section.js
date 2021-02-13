import React from 'react';
import styles from './Section.module.css';
import fadeStyles from './fade.module.css';
import { CSSTransition } from 'react-transition-group';

export default function Section({ title, children }) {
  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={500}
      classNames={fadeStyles}
      unmountOnExit
    >
      <section className={styles.section}>
        <p className={styles.title}>{title}</p>
        {children}
      </section>
    </CSSTransition>
    // <section className={styles.section}>
    //   <CSSTransition
    //     in={true}
    //     appear={true}
    //     timeout={500}
    //     classNames={styles}
    //     unmountOnExit
    //   >
    //     <p className={styles.title}>{title}</p>
    //   </CSSTransition>
    //   {children}
    // </section>
  );
}
