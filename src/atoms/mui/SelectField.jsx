import PropTypes from 'prop-types';
import styled from '@mui/material/styles/styled';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';




const StyledSelect = styled(Select)(({theme}) => ({
  [`& .${'MuiOutlinedInput-root'}`]: {
    ...theme['input-field'],
  },

  [`& .${'MuiOutlinedInput-notchedOutline'}`]: {
    ...theme['input-border'],
  },

  [`& .${'MuiSelect-select'}`]: {
    ...theme['select-input'],
  },
}));

  
  


const SelectField = ({ id, name, label, containerClassName, labelClassName, inputClassName, menuItem, onChange }) => {

  const [fieldValue, setFieldValue] = useState('');
  const [open, setOpen] = useState(false);



  const handleChange = (e) => {
    setFieldValue(e.target.value);
    onChange(e.target.name, e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };


  return (
    <div className={containerClassName}>
      <label htmlFor={id} className={labelClassName}>{label}</label>

      <FormControl> 
        <StyledSelect 
          className={inputClassName}
          id={id}
          name={name}
          open={open}
          value={fieldValue}
          onClose={handleClose}
          onOpen={handleOpen}
          onChange={handleChange}
          displayEmpty // to display the label when no value is selected
        >
          
          <MenuItem value="" disabled>
            {label}
          </MenuItem>

          {menuItem.map(item => (
            <MenuItem value={item.abbreviation} key={`selectField_${item.abbreviation}`}>
              {item.name}
            </MenuItem>

          ))}
        </StyledSelect>
      </FormControl>
    </div>
  );
}

export default SelectField;


SelectField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  containerClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  menuItem: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      abbreviation: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};
