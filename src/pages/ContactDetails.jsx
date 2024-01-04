import { Link, Route, useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Divider } from '@mui/material';
import { contactService } from '../services/contactService';
import { useEffect, useState } from 'react';
import ConfirmPrompt from '../components/ConfirmPropmt';
export function ContactDetails() {
  const params = useParams();
  const [contact, setContact] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadContact();
  }, []);

  const deleteContact = async () => {
    await contactService.deleteContact(params.id);
    navigate(`/`);

    // loadContacts();
  };

  const getAvatarBorder = () => {
    const avatarBorder = contact.gender === 'male' ? '#74b9ff' : '#e84393';
    return { border: `1px solid ${avatarBorder}` };
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
        <section className="contact-details">
          <div className="contact-details-header">
            <ConfirmPrompt textA={'Are you sure you want to delete this contact ?'} textB={'This contact will be deleted permanently'} onConfirm={deleteContact} />
            <div>
              <h1>About contact</h1>
            </div>
            <span className="back">
              <Link to="/">
                <ArrowBackIosIcon style={{ transform: 'rotate(180deg)' }} />
              </Link>
            </span>
          </div>
          <div className="contact-details-top">
            <div style={getAvatarBorder()} className="contact-details-img">
              <img src={contact.picture.large} />
            </div>
            <div style={getAvatarBorder()} className="contact-details-country">
              <h1>{contact.name.first}</h1>
              <h1>{contact.name.last}</h1>
            </div>
          </div>
          <div className="contact-adress">
            <h3>ADDRESS: </h3>
            <h2> {getAdressTxt()}</h2>
          </div>
          <Divider style={{ width: '100%', padding: '5px' }} />
          <div className="contact-mail">
            <h3>EMAIL: </h3>
            <h2>{contact.email}</h2>
          </div>
          <Divider style={{ width: '100%', padding: '5px' }} />
          <div className="contact-phone">
            <h3>PHONE: </h3>
            <h2>{contact.phone}</h2>
          </div>
          <Divider style={{ width: '100%', padding: '5px' }} />
          <div className="contact-age">
            <h3>AGE: </h3>
            <h2>{contact.dob.age}</h2>
          </div>
          <Divider style={{ width: '100%', padding: '5px' }} />
          <div className="contact-dob">
            <h3>DATE: </h3>
            <h2>{contact.dob.date}</h2>
          </div>
        </section>
        // <Card>
        //   <CardActionArea>
        //     <CardMedia component="img" height="250" image={contact.picture.large} alt="contact profile" />
        //     <CardContent>
        //       <Typography gutterBottom variant="h5" component="div">
        //         {contact.name.first + ' ' + contact.name.last}
        //       </Typography>
        //       <Typography variant="body2" color="text.secondary">
        //         Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
        //       </Typography>
        //     </CardContent>
        //   </CardActionArea>
        // </Card>
      )}
    </>
  );
}
