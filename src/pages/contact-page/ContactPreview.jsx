import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState, useContext } from 'react';
import { ContactsContext } from '../../context/context';
import ConfirmPrompt from '../../shared-components/ConfirmPropmt';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const contactPreviewStyle = {
  backgroundColor: 'rgb(247, 247, 247)',
  padding: ' 18px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0px 0px 16px -12px',
  borderRadius: '15px',
  margin: '10px 5px',
  cursor: 'grab',
  transition: '0.3s',
  position: 'relative'
};
const actionsStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '80px',
  alignSelf: 'center',
  transition: '0.3s'
};
const contactEmailSX = {
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '230px',
  display: 'inline-block',
  color: 'grey',
  '&:hover': {
    color: 'rgb(50, 50, 185)'
  }
};

export default function ContactPreview({ contact, deleteContact, index, handleSort }) {
  const [isHover, setIsHover] = useState(false);
  const { isMobile } = useContext(ContactsContext);
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/contact/${contact.id}`);
  }

  const getAvatarBorder = () => {
    const avatarBorder = contact.gender === 'male' ? '#74b9ff' : '#e84393';
    return { border: `2px solid ${avatarBorder}` };
  };

  const setHover = hoverState => {
    setIsHover(hoverState);
  };

  const onDeleteContact = () => {
    deleteContact(contact.id);
  };

  return (
    <Box sx={contactPreviewStyle} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)} className="contact-preview handle">
      <Avatar src={contact.picture.thumbnail} style={getAvatarBorder()}></Avatar>
      <Box ml={2} className="contact-preview-name">
        <Typography variant="h6" component="h1">{`${contact.name.first} ${contact.name.last}`}</Typography>
        <Typography sx={contactEmailSX} variant="h7" component="span" className="contact-email">
          {contact.email}
        </Typography>
      </Box>
      <Box sx={actionsStyle} className="actions">
        {!isMobile ? (
          <Box>
            {isHover && (
              <>
                <ConfirmPrompt padding={1} textA={'Are you sure you want to delete this contact ?'} textB={'This contact will be deleted permanently'} onConfirm={onDeleteContact} />
                <IconButton onClick={() => handleClick()} aria-label="more">
                  <MoreVertIcon />
                </IconButton>
              </>
            )}
          </Box>
        ) : (
          <Box position="absolute" right="15px">
            <IconButton onClick={() => handleClick()} aria-label="more">
              <MoreVertIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
}
