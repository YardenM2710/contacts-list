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

async function query(sortBy) {
  try {
    const savedContacs = storageService.load(KEY)
    if (savedContacs) return sortContacts(savedContacs, sortBy)
    const { data } = await axios.get(_getUrl())
    storageService.store(KEY, data)
    return sortContacts(data, sortBy)
  } catch (err) {
    console.log(err)
  }
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

// function sortContacts(contacts, sortBy) {
//   if (!sortBy) return contacts.sort((a, b) => a.name.first.localeCompare(b.name.first))
//   if (sortBy.name == 'DESC') {
//     return contacts.sort((a, b) => {
//       if (a.name.first > b.name.first) return -1;
//       if (b.name.first > a.name.first) return 1;
//       return 0;
//     });
//   }
//   if (sortBy.age === 'ASC') {
//     return contacts.sort((a, b) => a.dob.age - b.dob.age)
//   }
//   if (sortBy.age === 'DESC') {
//     return contacts.sort((a, b) => b.dob.age - a.dob.age)
//   }
//   return contacts.sort((a, b) => a.name.first.localeCompare(b.name.first)
//   )

// }

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
    const newContacts = contacts.filter(contact => contact.id !== id)
    storageService.store(KEY, newContacts)
  } catch (err) {
    console.log(err)
  }
}

async function addContact() {
  try {
    const contacts = storageService.load(KEY)
    const { data } = await axios.get('https://randomuser.me/api')
    const { gender, name, email, picture, location, login, phone, dob } = data.results[0]
    contacts.push({ id: login.uuid, gender, name, email, picture, location, phone, dob })
    storageService.store(KEY, contacts)
  } catch (err) {
    console.log(err)
  }
}

