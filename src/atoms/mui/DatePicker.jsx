import PropTypes from 'prop-types';
import  { useState } from 'react';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, LocalizationProvider, PickersLayout } from '@mui/x-date-pickers';
import 'dayjs/locale/fr';
import  Popper  from '@mui/material/Popper';
import TextField from '@mui/material/TextField';


// Style for date calendar layout
const StyledPickersLayout = styled(PickersLayout)(({ theme }) => ({

  [`& .${'MuiTouchRipple-root'}`]: {
    ...theme['datePicker-ripple'],
  },

  [`& .${'MuiPickersDay-today'}`]: {
    ...theme['datePicker-today'],
  },

  [`& .${'MuiPickersDay-root'}`]: {
    ...theme['datePicker-day'],
  },
    
  [`& .${'MuiPickersCalendarHeader-root'}`]: {
    ...theme['datePicker-header'],
  },

  [`& .${'MuiPickersCalendarHeader-switchViewIcon, .MuiSvgIcon-root'}`]: {
    ...theme['datePicker-headerIcons'],
  },

}));


const StyledPopper = styled(Popper)(({theme}) => ({

  [`& .${'MuiPaper-root'}`]: {
    ...theme['datePicker-calendar']
  },
}));



// Style for date input
const StyledDatepicker = styled(TextField)(({theme}) => ({

  [`& .${'MuiInputBase-input'}`]: {
    ...theme['input-placeholder'],
    ...theme['datePicker-input'],
  },

  [`& .${'MuiOutlinedInput-root'}`]: {
    ...theme['input-field'],
    paddingRight: 0,
  },
  
  [`& .${'MuiOutlinedInput-notchedOutline'}`]: {
    ...theme['input-border'],
  },
  
  //ripple effect on input calendar icon
  [`& .${'MuiTouchRipple-root'}`]: {
    ...theme['datePicker-ripple'],
  },

  [`& .${'MuiIconButton-edgeEnd'}`]: {
    ...theme['datePicker-button'],
  },
  
}));




const FormDatePicker = ({label, id, name, labelClassName, placeholder, containerClassName, onChange}) => {
  
  const [value, setValue] = useState(null);
  
  const onFormatDate = (date, name) => {
    if( date == null) return;
    const newDate = date ? date.format('L') : '';
    onChange && onChange({ target: { name: name, value: newDate } });
    setValue(newDate);
  }



  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
      <div className={containerClassName}>
        <label htmlFor={id} className={labelClassName}>{label}</label>
        
        <DatePicker
          onChange={(newValue) => onFormatDate(newValue, name)}

          slots={{
            textField: StyledDatepicker,
            popper: StyledPopper,
            layout: StyledPickersLayout,
          }}
          
          slotProps={{
            value: value,

            popper: {
              placement: "bottom",
            },

            textField: {
              id: id,
              name: name,
              placeholder: placeholder, 
              formatDensity:"spacious",
            },
          }}

        />
      </div>
    </LocalizationProvider>
  );
}

export default FormDatePicker;

FormDatePicker.propTypes = {
  containerClassName: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  labelClassName: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};