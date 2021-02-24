import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Container from './Components/Container/Container';
import Title from './Components/Title/Title';
import ContactForm from './Components/ContactForm/ContactForm';
import ContactList from './Components/ContactList/ContactList';
import Filter from './Components/Filter/Filter';
import Notification from './Components/Notification/Notification';
import { CSSTransition } from 'react-transition-group';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
    message: null,
  };

  setMessage = (note) => {
    this.setState({ message: note });
    setTimeout(() => {
      this.setState({ message: null });
    }, 2500);
  };

  addContact = (name, number) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    if (name === '') {
      this.setMessage('Enter concact name, please!');
      return;
    }
    if (number === '') {
      this.setMessage('Enter concact phone, please!');
      return;
    }
    if (
      this.state.contacts.find(
        (item) => item.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      this.setMessage('Contact already exists!');
      return;
    }
    this.setState((prevState) => {
      return { contacts: [...prevState.contacts, contact] };
    });
  };

  deleteContact = (id) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter((contact) => contact.id !== id),
      };
    });
    this.setState({ filter: '' });
  };

  changeFilter = (filter) => {
    this.setState({ filter });
  };

  getFilteredContactsList = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parselContacts = JSON.parse(contacts);

    if (parselContacts) {
      this.setState({ contacts: parselContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter, message } = this.state;
    const filteredContactsList = this.getFilteredContactsList();

    return (
      <Container>
        <Title />

        <Notification message={message} />

        <ContactForm onAddContact={this.addContact} />

        <Filter
          value={filter}
          onChange={this.changeFilter}
          contacts={contacts}
        />

        <CSSTransition in={contacts.length > 0} timeout={0} ommountOnExit>
          <ContactList
            contacts={filteredContactsList}
            onDelete={this.deleteContact}
          />
        </CSSTransition>
      </Container>
    );
  }
}
