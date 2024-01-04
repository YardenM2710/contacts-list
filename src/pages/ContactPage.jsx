import { createContext, useEffect, useState } from 'react';
import ContactList from '../components/ContactList';
import { ContactsContext } from '../context/context';
import { contactService } from '../services/contactService';
import { MainHeader } from '../components/MainHeader';
import { NoResults } from '../components/NoResults';
import useIsMobile from '../custom-hooks/use-is-mobile.hook';
import { SortCmp } from '../components/SortCmp';
export function ContactPage() {
  const [contacts, setContacts] = useState([]);
  const [countries, setCountries] = useState([]);
  const [isMobileScreen, setIsMobileScreen] = useState();
  const [sortBy, setSortBy] = useState({ field: 'name', order: 'asc' });
  const isMobile = useIsMobile();

  useEffect(() => {
    loadContacts();
  }, [sortBy]);

  useEffect(() => {
    setIsMobileScreen(isMobile);
  }, [isMobile]);

  useEffect(() => {
    countCountries();
  }, [contacts]);

  const handleSort = field => {
    // Toggle sorting order if the same field is clicked again
    const newOrder = sortBy.field === field && sortBy.order === 'asc' ? 'desc' : 'asc';
    setSortBy({ field, order: newOrder });
  };

  const loadContacts = async () => {
    const contacts = await contactService.query(sortBy);
    console.log('loadContacts', contacts);
    setContacts(contacts);
  };

  const addContact = async () => {
    await contactService.addContact();
    loadContacts();
  };
  const deleteContact = async id => {
    await contactService.deleteContact(id);
    loadContacts();
  };

  const countCountries = () => {
    //Removing duplicate countries and keeping the countries array length
    const countries = contacts?.map(contact => contact.location.country);
    const countriesCount = [...new Map(countries?.map(country => [country, country])).values()].length;
    setCountries(countriesCount);
  };

  return (
    <>
      <MainHeader addContact={addContact} contactCount={contacts?.length} countriesCount={countries} />
      <SortCmp sortBy={sortBy} handleSort={handleSort} />
      <ContactsContext.Provider value={{ contacts, isMobileScreen }}>{contacts?.length ? <ContactList deleteContact={deleteContact} /> : <NoResults />}</ContactsContext.Provider>
    </>
  );
}
