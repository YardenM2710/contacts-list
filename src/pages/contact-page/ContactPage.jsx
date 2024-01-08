import { useEffect, useState } from 'react';
import ContactList from './ContactList';
import { ContactsContext } from '../../context/context';
import { contactService } from '../../services/contactService';
import { MainHeader } from '../../shared-components/MainHeader';
import { NoResults } from '../../shared-components/NoResults';
import useIsMobile from '../../custom-hooks/use-is-mobile.hook';
import { SortCmp } from './SortCmp';
import { useSnackbar } from 'notistack';

export function ContactPage() {
  const [contacts, setContacts] = useState([]);
  const [countries, setCountries] = useState([]);
  const [sortBy, setSortBy] = useState({ field: 'name', order: 'asc' });
  const isMobile = useIsMobile();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    loadContacts();
  }, [sortBy]);

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
    setContacts(contacts);
  };
  const setFilterBy = async value => {
    const contacts = await contactService.query(sortBy, value);
    console.log('setFilterBy', contacts);
    setContacts(contacts);
  };

  const addContact = async () => {
    try {
      const name = await contactService.addContact();
      loadContacts();
      enqueueSnackbar(`Added ${name.first} ${name.last} to your contact list`, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const deleteContact = async id => {
    try {
      const name = await contactService.deleteContact(id);
      loadContacts();
      enqueueSnackbar(`Deleted ${name.first} ${name.last} from your contact list`, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const countCountries = () => {
    //Removing duplicate countries and keeping the countries array length
    const countries = contacts?.map(contact => contact.location.country);
    const countriesCount = [...new Map(countries?.map(country => [country, country])).values()].length;
    setCountries(countriesCount);
  };

  return (
    <>
      <MainHeader setFilterBy={setFilterBy} addContact={addContact} contactCount={contacts?.length} countriesCount={countries} />
      <SortCmp sortBy={sortBy} handleSort={handleSort} />
      <ContactsContext.Provider value={{ contacts, isMobile }}>{contacts?.length ? <ContactList deleteContact={deleteContact} /> : <NoResults />}</ContactsContext.Provider>
    </>
  );
}
