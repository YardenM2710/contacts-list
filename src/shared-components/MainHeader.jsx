import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import BasicModal from './BasicModal';
import { ContactFilter } from './ContactFilter';
export function MainHeader({ contactCount, countriesCount, addContact, setFilterBy }) {
  return (
    <header className="app-header">
      <section className="container">
        <div className="contacts-title logo">
          <ContactFilter setFilterBy={setFilterBy} />
        </div>
        <div className="add-contact">
          <IconButton onClick={addContact} aria-label="add">
            <AddIcon />
          </IconButton>
          <BasicModal modalHeading={'About your contacts'} modalText={` You got total of ${contactCount} contacts from ${countriesCount} different countries.`} />
        </div>
      </section>
    </header>
  );
}
