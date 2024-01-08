import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';


const SelectField = ({ label, menuItem }) => {

  const [fieldValue, setFieldValue] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setFieldValue(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <> 
      <FormControl>
      <label htmlFor="select_field" className="form_input_label">{label}</label>
        <Select className='form_input_field'
          labelId="select_label"
          id="select_field"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={fieldValue}
          onChange={handleChange}
        >
          {menuItem.map(item => (
            <MenuItem value={item.abbreviation} key={`selectField_${item.abbreviation}`}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default SelectField;


SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  menuItem: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      abbreviation: PropTypes.string.isRequired,
    })
  ).isRequired,
};
