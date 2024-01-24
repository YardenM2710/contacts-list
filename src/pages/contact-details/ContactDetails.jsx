import { Link, useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Divider, Typography, useMediaQuery } from '@mui/material';
import { contactService } from '../../services/contactService';
import { useEffect, useState } from 'react';
import ConfirmPrompt from '../../shared-components/ConfirmPropmt';
import Box from '@mui/material/Box';
import { useSnackbar } from 'notistack';
import useIsMobile from '../../custom-hooks/use-is-mobile.hook';

const contactDetailsStyle = {
  background: 'rgba(255, 255, 255, 0.562)',
  minHeight: '95vh',
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  padding: ' 20px',
  borderRadius: '10px',
  color: 'rgb(47, 47, 47)',
  boxShadow: '0px 0px 10px -5px',
  position: 'relative'
};
const contactDetailsHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: ' space-between',
  width: '100%',
  paddingBottom: '20px'
};

const contactDetailsHeaderTopStyle = {
  marginLeft: '-1px',
  marginTop: '-1px',
  height: '100px',
  width: '100px'
};

const InnerDetailsStyle = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  marginTop: '10px'
};
const contactDetailsName = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginLeft: '15px',
  padding: '5px'
};

const textEllipsisSX = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '230px',
  display: 'inline-block'
};

export function ContactDetails() {
  const params = useParams();
  const [contact, setContact] = useState(null);
  const navigate = useNavigate();
  const matches = useMediaQuery('(min-width:500px)');
  const { enqueueSnackbar } = useSnackbar();
  const isMobile = useIsMobile();

  useEffect(() => {
    loadContact();
  }, []);

  const deleteContact = async () => {
    try {
      const name = await contactService.deleteContact(params.id);
      enqueueSnackbar(`Deleted ${name.first} ${name.last} from your contact list`, { variant: 'success' });
      navigate(`/`);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const getLayoutHeight = () => {
    return { minHeight: matches ? '95vh' : '100vh' };
  };

  const getAdressTxt = () => {
    return `${contact.location.street.name} ${contact.location.street.number}, ${contact.location.city}, ${contact.location.country}`;
  };

  const loadContact = async () => {
    const contact = await contactService.getById(params.id);
    setContact(contact);
  };

  return (
    <>
      {contact && (
        <Box sx={{ ...contactDetailsStyle, ...getLayoutHeight() }} className="contact-details">
          <Box sx={contactDetailsHeaderStyle} className="contact-details-header">
            <div>
              <Typography sx={{ fontSize: '19px' }}>About contact</Typography>
            </div>
            <Link to="/">
              <ArrowBackIosIcon sx={{ transform: 'rotate(180deg)' }} />
            </Link>
          </Box>
          <Box sx={{ display: 'flex', position: 'relative' }}>
            <Box sx={contactDetailsHeaderTopStyle} className="contact-details-img">
              <img src={contact.picture.large} alt="user-avatar" />
            </Box>
            <Box sx={{ ...contactDetailsHeaderTopStyle, ...contactDetailsName }} className="contact-details-country">
              <Typography variant="h8" component="h3">
                {contact.name.first}
              </Typography>
              <Typography variant="h8" component="h3">
                {contact.name.last}
              </Typography>
            </Box>
            {isMobile && (
              <Box ml={1}>
                <ConfirmPrompt padding={'5px'} textA="Are you sure you want to delete this contact ?" textB="This contact will be deleted permanently" onConfirm={deleteContact} />
              </Box>
            )}
          </Box>
          <Box sx={InnerDetailsStyle} className="contact-adress">
            <Typography width={100} mr={2} color={'grey'} variant="h6" component="h3">
              ADDRESS:
            </Typography>
            <Typography sx={isMobile ? textEllipsisSX : ''} fontSize={18} variant="h5" component="h2">
              {getAdressTxt()}
            </Typography>
          </Box>
          <Divider sx={{ width: '100%', padding: '5px' }} />
          <Box sx={InnerDetailsStyle} className="contact-mail">
            <Typography width={100} mr={2} color={'grey'} variant="h6" component="h3">
              EMAIL:
            </Typography>
            <Typography sx={isMobile ? textEllipsisSX : ''} fontSize={18} variant="h5" component="h2">
              {contact.email}
            </Typography>
          </Box>
          <Divider sx={{ width: '100%', padding: '5px' }} />
          <Box sx={InnerDetailsStyle} className="contact-phone">
            <Typography width={100} mr={2} color={'grey'} variant="h6" component="h3">
              PHONE:
            </Typography>
            <Typography fontSize={18} variant="h5" component="h2">
              {contact.phone}
            </Typography>
          </Box>
          <Divider sx={{ width: '100%', padding: '5px' }} />
          <Box sx={InnerDetailsStyle} className="contact-age">
            <Typography width={100} mr={2} color={'grey'} variant="h6" component="h3">
              AGE:
            </Typography>
            <Typography fontSize={18} variant="h5" component="h2">
              {contact.dob.age}
            </Typography>
          </Box>
          <Divider sx={{ width: '100%', padding: '5px' }} />
          <Box sx={InnerDetailsStyle} className="contact-dob">
            <Typography width={100} mr={2} color={'grey'} variant="h6" component="h3">
              DATE:
            </Typography>
            <Typography fontSize={18} variant="h5" component="h2">
              {contact.dob.date}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
}
