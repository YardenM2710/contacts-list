import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState, useContext,useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd'
import { ContactsContext } from '../../context/context';
import ConfirmPrompt from '../../shared-components/ConfirmPropmt';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';


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

export default function ContactPreview({ contact, deleteContact, index, handleSort ,moveCard,id}) {
  const ref = useRef(null)
  const [isHover, setIsHover] = useState(false);
  const { isMobile } = useContext(ContactsContext);
  const navigate = useNavigate();

  const [{ handlerId }, drop] = useDrop({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

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
    position: 'relative',
    opacity : opacity
  };

  return (
    <Box sx={contactPreviewStyle}  ref={ref} data-handler-id={handlerId} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)} className="contact-preview handle">
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
