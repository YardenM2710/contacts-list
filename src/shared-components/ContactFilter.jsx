import { InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
export function ContactFilter({ setFilterBy }) {
  const [textFieldValue, setTextFieldValue] = useState('');
  const handleChange = e => {
    setTextFieldValue(e.target.value);
    setFilterBy(e.target.value);
  };
  return (
    <TextField
      id="input-with-icon-textfield"
      placeholder="Search"
      value={textFieldValue}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        )
      }}
      variant="standard"
    />
  );
}
