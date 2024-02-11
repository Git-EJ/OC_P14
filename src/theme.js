import { createTheme } from "@mui/material/styles";


const palette = {
  main: {
    ['primary-color']: '#1494B9',
    ['secondary-color']: '#0E3C55',
    ['input-placeholder']: '#757575',
    ['primary_radial-gradient']: 'radial-gradient(circle at center, #1494B9 0%, #0E3C55 100%)',
    ['secondary_linear-gradient']: 'linear-gradient(to right, #1494B9, #0E3C55)',
    ['tertiary_linear-gradient']: 'linear-gradient(to bottom, #1494B9, #0E3C55)',
    ['quartery_linear-gradient']: 'linear-gradient(90deg, #0E3C55 0% ,#1494B9 50%, #0E3C55 100%)',
  }
}

const flexCenter = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const typography = {
  ['roboto']: "'Roboto', sans-serif",
}

export const themeDatePicker = {

  ['datePicker-input']: {
    fontFamily: typography['roboto'],
    fontSize: "0.9rem",
    padding: 0,
  },

  ['datePicker-button']: {
    height: '3rem',
    width: '3rem',
    margin: '0rem',
    padding: '0.2rem',
    transform: 'translateX(.5rem)',
    color: palette.main['primary-color'],
    
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  
  //ripple effect on input datePicker button
  ['datePicker-ripple']: {
    color: palette.main['primary-color'],
  },

  
  //START - CALENDAR
  ['datePicker-today']: {
      
    ['&:not(.Mui-selected)']: {
        border: `1px solid ${palette.main['primary-color']}`,

      '&:focus': {
        backgroundColor:'transparent',
      },
      
      '&:hover': {
        backgroundColor: palette.main['primary-color'],
        color: '#fff',
      },
    },
  },


  ['datePicker-day']: {

    color: palette.main['secondary-color'],

    ['&.Mui-selected']: {
      backgroundColor: palette.main['primary-color'],
      color: '#fff',

      '&:focus': {
        backgroundColor: palette.main['primary-color'],
        color: '#fff',
      },
    },
  },

  ['datePicker-header']: {
    background: palette.main['primary_radial-gradient'],
    color: '#fff',
    margin: 0,
    padding: '2rem 0.7rem',
    textTransform: 'uppercase',
  },

  ['datePicker-headerIcons']: {
    color: '#fff',
  },

  //END - CALENDAR
};

export const themeSelect = {

  ['select-field'] : {
    justifyContent: 'flex-start',
  },

  ['select-placeholder']: {
    color: palette.main['input-placeholder'],
  },

  ['select-svgIcon']: {
    ...flexCenter,
    top: '15%',
    right: '0.5rem',

    ['& > path']: {
      fill: palette.main['primary-color'],
    },
  },

  ['select-menuItem']: {

    fontSize: "0.8rem",
    padding: '0 1rem',

    '&:hover': {
      backgroundColor: palette.main['primary-color'],
      color: '#fff',
    },

    '&.Mui-selected': {
      backgroundColor: palette.main['primary-color'],
      color: '#fff',

      '&:focus': {
        backgroundColor: palette.main['primary-color'],
        color: '#fff',
      },
    },
  },

  ['select-menuItem-disabled']: {
    backgroundColor: 'white',
    color: '#fff',
    opacity: 1,
    fontSize: "1rem",
    background: palette.main['primary_radial-gradient'],
  },
};



const theme = {
  
  ['palette']: {...palette},
  
  ['typography']: {...typography},
  
  ['flexCenter'] : {...flexCenter,},
  
  ['flexRow'] : {
    ...flexCenter,
    flexDirection: "row",
  },
  
  ['flexColumn'] : {
    ...flexCenter,
    flexDirection: "column",
  },
  
  ['input-field'] : {
    ...flexCenter,
    width: '200px',
    height:'35px',
    marginBottom: '0.5rem',
    border: `1px solid ${palette.main['primary-color']}`,
    fontFamily: "'Roboto', sans-serif",
    fontSize: '0.9rem',
    borderRadius: '0',
    boxSizing: 'border-box',
  },

  ['input-border']: {
    borderRadius: '0px',
    borderStyle: 'none',
    borderWidth: '0px',
    borderColor: 'transparent',
  },

  ['input-placeholder'] : {
    [`&::placeholder`]: {
      color: palette.main['input-placeholder'],
      opacity: 1,
    },
  },

  ...themeDatePicker,
  ...themeSelect,
};


  
export default createTheme(theme);
