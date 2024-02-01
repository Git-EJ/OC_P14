import PropTypes from 'prop-types';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/fr' //TODO why ts error?
import { grey, red } from '@mui/material/colors';


const FormDatePicker = ({label, id, labelClassName, placeholder, inputClassName, containerClassName}) => {
  
  const [value, setValue] = useState(null);


  const onFormatDate = (date) => {
      if( date == null) return;
      const newDate = date ? date.format('L') : '';
      return newDate;
    }
    
  useEffect(() => {
    console.log('value UE', value)
  }, [value])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
      <div className={containerClassName}>
        <label htmlFor={id} className={labelClassName}>{label}</label>
        
        <DatePicker
          {...console.log('VALUE IN DATE PICKER', value)}
          onChange={(newValue) => setValue(onFormatDate(newValue))}
          slotProps={{ 
              value: value,
              textField: { 
              id: id,
              className: inputClassName,
              placeholder: placeholder, 
              formatDensity:"spacious",
            } 
          }}
          sx={{ 
            input: { 
              // '&::placeholder': { color: '#rgba(117, 117, 117, 0.904)' },
              // '&:hover': { color: red[500] },
              color: grey[900],
              // svg: { color: 'rgba(20, 149, 185, 0.116)' },
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
  label: PropTypes.string,
  id: PropTypes.string,
  labelClassName: PropTypes.string,
  placeholder: PropTypes.string,
  inputClassName: PropTypes.string,
};