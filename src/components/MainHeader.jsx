import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import BasicModal from './BasicModal';
export function MainHeader({ contactCount, countriesCount, addContact }) {
  const onAddContact = () => {
    addContact();
  };
  return (
    <header className="app-header">
      <section className="container">
        <div className="contacts-title logo">
          <span>My Contacts</span>
        </div>

        <div className="add-contact">
          <IconButton onClick={onAddContact} aria-label="add">
            <AddIcon />
          </IconButton>
          <BasicModal modalHeading={'About your contacts'} modalText={` You got total of ${contactCount} contacts from ${countriesCount} different countries.`} />
        </div>
      </section>
    </header>
  );
}
