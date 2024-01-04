import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState, useContext } from 'react';
import { ContactsContext } from '../context/context';
import ConfirmPrompt from './ConfirmPropmt';
import { Link, useNavigate } from 'react-router-dom';

export default function ContactPreview({ contact, deleteContact }) {
  const [isHover, setIsHover] = useState(false);
  const { isMobileScreen } = useContext(ContactsContext);
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
    <>
      <div onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)} className="contact-preview">
        <Avatar src={contact.picture.thumbnail} style={getAvatarBorder()}></Avatar>
        <div className="contact-preview-name">
          <h1>{contact.name.first + ' ' + contact.name.last}</h1>
          <a className="contact-email">{contact.email}</a>
        </div>
        <div className="actions">
          {!isMobileScreen ? (
            <div>
              {isHover && (
                <>
                  <ConfirmPrompt textA={'Are you sure you want to delete this contact ?'} textB={'This contact will be deleted permanently'} onConfirm={onDeleteContact} />
                  <IconButton onClick={() => handleClick()} aria-label="more">
                    <MoreVertIcon />
                  </IconButton>
                </>
              )}
            </div>
          ) : (
            <IconButton onClick={() => handleClick()} aria-label="more">
              <MoreVertIcon />
            </IconButton>
          )}
        </div>
      </div>
    </>
  );
}
