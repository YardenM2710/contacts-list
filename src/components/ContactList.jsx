import React, { useContext, useState } from 'react';
import { ContactsContext } from '../context/context';
import ContactPreview from './ContactPreview';
import List from '@mui/material/List';

export default function ContactList({ deleteContact }) {
  const { contacts } = useContext(ContactsContext);

  return <div className="contact-list ">{contacts && contacts.map(contact => <ContactPreview key={contact.id} deleteContact={deleteContact} contact={contact} contactsLength={contacts.length} />)}</div>;
}
