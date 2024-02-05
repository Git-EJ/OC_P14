import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, LocalizationProvider, PickersLayout } from '@mui/x-date-pickers';
import  { useState } from 'react';
import 'dayjs/locale/fr';


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



// Style for date input
const StyledDatepicker = styled(DatePicker)(({theme}) => ({

  [`& #${'MuiInputBase-root'}`]: {
    ...theme['input-field'],
  },

  [`& .${'MuiOutlinedInput-notchedOutline'}`]: {
    ...theme['input-border'],
  },
  
  [`& .${'MuiInputBase-input'}`]: {
    ...theme['input-placeholder'],
    ...theme['datePicker-input'],
  },
  
  //ripple effect on input calendar icon
  [`& .${'MuiTouchRipple-root'}`]: {
    ...theme['datePicker-ripple'],
  },

  [`& .${'MuiIconButton-edgeEnd'}`]: {
    ...theme['datePicker-button'],
  },


}));


const FormDatePicker = ({label, id, name, labelClassName, placeholder, inputClassName, containerClassName, onChange}) => {
  
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
        
        <StyledDatepicker
          onChange={(newValue) => onFormatDate(newValue, name)}
          
          slots={{
            layout: StyledPickersLayout,
          }}
          
          slotProps={{
            value: value,
            popper: {
              placement: "bottom",
              className: "datepicker_popper", //acces to all classes in the popper, use in datepicker.scss
            },
            textField: { 
              name: name,
              id: id,
              className: inputClassName,
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
  inputClassName: PropTypes.string,
  onChange: PropTypes.func,
};