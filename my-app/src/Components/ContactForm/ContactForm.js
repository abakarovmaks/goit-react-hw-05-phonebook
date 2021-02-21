import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  static propTypes = {
    onAddContact: PropTypes.func,
  };

  static defaultProps = {};

  handleSubmitForm = (e) => {
    const { name, number } = this.state;
    e.preventDefault();

    this.props.onAddContact(name, number);
    this.setState({
      name: '',
      number: '',
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={this.handleSubmitForm}>
          <label>
            <input
              className={styles.input}
              type="text"
              value={name}
              name="name"
              placeholder="Name"
              onChange={this.handleChange}
            />
          </label>
          <label>
            <input
              className={styles.input}
              type="tel"
              value={number}
              name="number"
              placeholder="+380"
              onChange={this.handleChange}
            />
          </label>
          <button className={styles.btn} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}
