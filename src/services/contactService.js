// const Axios = require('axios')
import Axios from 'axios'
import { storageService } from './storageService'
var axios = Axios.create()

const KEY = 'contactsDB'

export const contactService = {
  query,
  getById,
  deleteContact,
  addContact
}

function _getUrl(id = '') {
  const BASE_URL = process.env.NODE_ENV !== 'development' ? '/api/contacts' : '//localhost:3030/api/contacts'
  return `${BASE_URL}/${id}`
}

async function query(sortBy, filterBy) {
  try {
    const savedContacs = storageService.load(KEY)
    const filteredContacts = filterContacts(savedContacs, filterBy)
    console.log('filteredContacts', filteredContacts);
    if (filteredContacts) return sortContacts(filteredContacts, sortBy)
    const { data } = await axios.get(_getUrl())
    storageService.store(KEY, data)
    return sortContacts(data, sortBy)
  } catch (err) {
    //add better error handling
    console.log(err)
  }
}

function filterContacts(contacts, filterBy) {
  if (!filterBy) return contacts
  const filteredList = contacts.filter(contact => {
    const name = contact.name.first.toLowerCase()
    return name.includes(filterBy)
  })
  return filteredList
}

function sortContacts(contacts, sortBy) {
  if (
    !sortBy ||
    (sortBy.field !== 'name' && sortBy.field !== 'age') ||
    (sortBy.order !== 'asc' && sortBy.order !== 'desc')
  ) {
    console.error('Invalid sortBy object');
    return;
  }

  // Sort the contacts array based on the sortBy criteria
  contacts.sort((a, b) => {
    const valueA = sortBy.field === 'name' ? a.name.first : a.dob.age;
    const valueB = sortBy.field === 'name' ? b.name.first : b.dob.age;

    // Handle string comparison for 'name' field
    if (sortBy.field === 'name') {
      const comparison = valueA.localeCompare(valueB);
      return sortBy.order === 'asc' ? comparison : -comparison;
    }

    // For 'age' field
    return sortBy.order === 'asc' ? valueA - valueB : valueB - valueA;
  });

  return contacts;
}

async function getById(contactId) {
  try {
    const savedContacs = storageService.load(KEY)
    return savedContacs.find(contact => contact.id === contactId)
  } catch (err) {
    console.log(err)
  }
}

async function deleteContact(id) {
  try {
    const contacts = storageService.load(KEY)
    const { name } = await getById(id)
    const newContacts = contacts.filter(contact => contact.id !== id)
    storageService.store(KEY, newContacts)
    return Promise.resolve(name)
  } catch (err) {
    throw { message: 'Failed to delete contact', statusCode: 500 }
  }
}

async function addContact() {
  try {
    const contacts = storageService.load(KEY)
    const { data } = await axios.get('https://randomuser.me/api')
    const { gender, name, email, picture, location, login, phone, dob } = data.results[0]
    contacts.push({ id: login.uuid, gender, name, email, picture, location, phone, dob })
    storageService.store(KEY, contacts)
    return Promise.resolve(name)
  } catch (err) {
    throw { message: 'Failed to add contact', statusCode: 500 }
  }
}

