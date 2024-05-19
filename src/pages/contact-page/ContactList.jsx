import update from 'immutability-helper'
import React, { useContext ,useCallback, useEffect} from 'react';
import { ContactsContext } from '../../context/context';
import ContactPreview from './ContactPreview';
import { Box } from '@mui/material';
import { useState } from 'react';

const contactListStyle = {
  overflowY: 'scroll',
  position: 'relative',
  height: '70vh'
};

export function ContactList({ deleteContact, saveContacts }) {
  const { contacts } = useContext(ContactsContext);
  const [localContacts, setLocalContacts] = useState(contacts)


  useEffect(() => {
    // saveContacts(localContacts)
    
  }, [localContacts])

  useEffect(() => {
    console.log('contacts',contacts);
    setLocalContacts(contacts)
  }, [contacts])
  
  

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    let contactsClone
    setLocalContacts((prevContacts) =>{
      contactsClone = update(prevContacts, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevContacts[dragIndex]],
        ],
      })
      saveContacts(contactsClone)
      return contactsClone
    }
   )}, [])

  const renderCard = useCallback((contact, index) => {
    return (
      <ContactPreview
        key={contact.id}
        deleteContact={deleteContact} 
        contact={contact} 
        contactsLength={contacts.length}
        index={index}
        id={contact.id}
        moveCard={moveCard}
      />
    )
  }, [])

  return (
    <Box sx={contactListStyle} className="contact-list">
      {contacts &&
        contacts.map((contact, index) => (
          renderCard(contact,index)
        ))}
    </Box>
  );
}
