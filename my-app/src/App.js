import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Container from './Components/Container/Container';
import Section from './Components/Section/Section';
import ContactForm from './Components/ContactForm/ContactForm';
import ContactList from './Components/ContactList/ContactList';
import Filter from './Components/Filter/Filter';

const initialState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '+380 93 555 77 88' },
  { id: 'id-2', name: 'Hermione Kline', number: '+380 67 442 74 98' },
  { id: 'id-3', name: 'Eden Clements', number: '+380 63 005 71 84' },
  { id: 'id-4', name: 'Annie Copeland', number: '+380 79 815 07 84' },
];

export default class App extends Component {
  state = {
    contacts: initialState,
    filter: '',
  };

  componentDidMount() {
    const storageContacts = JSON.parse(localStorage.getItem('contacts'));
    if (storageContacts) {
      this.setState({ contacts: storageContacts });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  addContact = (name, number) => {
    const { contacts } = this.state;

    const toLowerCase = (contact) =>
      contact.name.toLowerCase() === name.toLowerCase();

    const contactFind = contacts.find(toLowerCase);

    if (contactFind) {
      alert(`${name} is already in Phonebook`);
      return;
    }

    const newContact = {
      id: uuidv4(),
      name,
      number,
    };

    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));
  };

  handleFilterInput = (e) => {
    const filter = e.currentTarget.value;
    this.setState({ filter });
  };

  handleFilter() {
    const { contacts, filter } = this.state;

    return filter
      ? contacts.filter(({ name }) =>
          name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
        )
      : contacts;
  }

  deleteContact = (e) => {
    const deletedId = e.currentTarget.dataset.id;

    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== deletedId
      ),
    }));
    e.currentTarget.blur();
  };

  render() {
    const { filter } = this.state;

    return (
      <Container>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.addContact} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} onChange={this.handleFilterInput} />
          <ContactList
            contacts={this.handleFilter()}
            deleteHandler={this.deleteContact}
          />
        </Section>
      </Container>
    );
  }
}
