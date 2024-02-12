import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from '@mui/material/styles/styled';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';



const StyledSelect = styled(InputBase)(({theme}) => ({
  
  [`&.${'MuiInputBase-root'}`]: {

    [`& .${'MuiInputBase-input'}`]: {
      ...theme['input-field'],
      ...theme['select-field'],
      
      [`&.${'MuiSelect-select'}`]: {
        padding: '0 0.5rem',
      },
    },

    [`& .${'select_placeholder'}`]: {
      ...theme['select-placeholder'],
    },

    [`& .${'MuiSelect-iconOutlined'}`]: {
      ...theme['select-svgIcon'],
    }, 
  },
}));


const StyledMenuItem = styled(MenuItem)(({theme}) => ({

  '&.MuiMenuItem-root': {
    ...theme['select-menuItem'],

    '&.Mui-disabled': {
      ...theme['select-menuItem-disabled'],
    },

    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(20, 149, 185, 0.1  )',
    },
  },
}));


const StyledSelectList = styled('menu')(({theme}) => ({

  '& .MuiMenu-paper': {
    maxHeight: '300px',
    border: `3px solid ${theme.palette.main['primary-color']}`,
    borderRadius: 0,
    overflow: 'hidden',
  },
}));


const SelectField = ({ id, name, label, placeholder, containerClassName, labelClassName, menuItem, onChange }) => {

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

      <FormControl >
        <Select 
          input={<StyledSelect />}
          name={name}
          open={open}
          value={fieldValue}
          onClose={handleClose}
          onOpen={handleOpen}
          onChange={handleChange}
          variant='outlined'
          displayEmpty // to display the placeholder when no value is selected
          native = {false} // if true native browser select is used

          inputProps={{ 
            'aria-label': `${label} select field`, 
            id: id
          }}

          MenuProps={{
            component: StyledSelectList,

            elevation: 15, //shadow depth
            anchorOrigin: {
              vertical: "center",
              horizontal: "center",
            },

            transformOrigin: {
              vertical: 'top',
              horizontal: "center",
            },

            MenuListProps: {
              disablePadding: true,
              dense: true,
              autoFocusItem: false,
            },
          }}
        >

          < StyledMenuItem value="" disabled autoFocus={false} >
            <p className='select_placeholder' >{placeholder ? placeholder : ""}</p>
          </StyledMenuItem>

          {menuItem.map(item => (
            <StyledMenuItem autoFocus={false}
              key={`selectField_${item.abbreviation}`}
              value={item.abbreviation}
            >
              {item.name}
            </StyledMenuItem>
          ))}

        </Select>
      </FormControl>
    </div>
  );
}

export default SelectField;


SelectField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  containerClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  menuItem: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      abbreviation: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};
