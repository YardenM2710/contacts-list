import React, { useContext } from 'react';
import { ContactsContext } from '../../context/context';
import ContactPreview from './ContactPreview';
import { Box } from '@mui/material';

const contactListStyle = {
  overflowY: 'scroll',
  position: 'relative',
  height: '70vh'
};

export default function ContactList({ deleteContact }) {
  const { contacts } = useContext(ContactsContext);

  return (
    <Box sx={contactListStyle} className="contact-list ">
      {contacts && contacts.map(contact => <ContactPreview key={contact.id} deleteContact={deleteContact} contact={contact} contactsLength={contacts.length} />)}
    </Box>
  );
}
