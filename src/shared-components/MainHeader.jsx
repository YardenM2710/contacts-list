import AddIcon from '@mui/icons-material/Add';
import { Box, IconButton } from '@mui/material';
import BasicModal from './BasicModal';
import { ContactFilter } from './ContactFilter';

const headerSX = {
  display: 'flex',
  alignitems: 'center',
  justifyContent: ' space-between',
  backgroundColor: 'rgb(249, 249, 249)',
  borderRadius: '15px',
  boxShadow: '0px 0px 16px -12px'
};
export function MainHeader({ contactCount, countriesCount, addContact, setFilterBy }) {
  return (
    <Box className="app-header">
      <Box sx={headerSX} className="container">
        <ContactFilter setFilterBy={setFilterBy} />
        <Box display="flex" className="add-contact">
          <IconButton onClick={addContact} aria-label="add">
            <AddIcon />
          </IconButton>
          <BasicModal modalHeading={'About your contacts'} modalText={` You got total of ${contactCount} contacts from ${countriesCount} different countries.`} />
        </Box>
      </Box>
    </Box>
  );
}
