import React, { useContext } from 'react';
import { ContactsContext } from '../../context/context';
import ContactPreview from './ContactPreview';
import { Box } from '@mui/material';
import { useRef } from 'react';

const contactListStyle = {
  overflowY: 'scroll',
  position: 'relative',
  height: '70vh'
};

export function ContactList({ deleteContact, saveContacts }) {
  const { contacts } = useContext(ContactsContext);
  const dragPerson = useRef(0);
  const draggedOverPerson = useRef(0);

  const handleSort = () => {
    const contactsClone = [...contacts];
    const temp = contactsClone[dragPerson.current];
    contactsClone[dragPerson.current] = contactsClone[draggedOverPerson.current];
    contactsClone[draggedOverPerson.current] = temp;
    saveContacts(contactsClone);
  };

  return (
    <Box sx={contactListStyle} className="contact-list">
      {contacts &&
        contacts.map((contact, index) => (
          <Box key={contact.id} draggable onDragStart={() => (dragPerson.current = index)} onDragEnter={() => (draggedOverPerson.current = index)} onDragOver={e => e.preventDefault()} onDragEnd={handleSort}>
            <ContactPreview index={index} deleteContact={deleteContact} contact={contact} contactsLength={contacts.length} />
          </Box>
        ))}
    </Box>
  );
}
