import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import employeesDataContext from "../context/employeesData/EmployeesDataContext";
import CreateEmployeeContext from "../context/createEmployee/CreateEmployeeContext"
import SelectField from "../atoms/mui/SelectField";
import SpheresButton from "./SpheresButton";
import SpringModal from "../atoms/mui/Modal";
import FormDatePicker from "../atoms/mui/DatePicker";
import dayjs from "dayjs";


  const formFieldsets = [
  {
    legend: "Employee Informations",
    input: [
      {label: "Lastname", id: "lastName", labelClassName: "form_input_label", type: "text", placeholder: "Lastname", inputClassName: "form_input_field"},
      {label: "Firstname", id: "firstName", labelClassName: "form_input_label", type: "text", placeholder: "Firstname", inputClassName: "form_input_field"},
    ],
  },
  {
    legend: "Employee Address",
    input: [
      {label: "Street", id: "street", labelClassName: "form_input_label", type: "text", placeholder: "Street", inputClassName: "form_input_field"},
      {label: "City", id: "city", labelClassName: "form_input_label", type: "text", placeholder: "City", inputClassName: "form_input_field"},
      {label: "Zip Code", id: "zipCode", labelClassName: "form_input_label", type: "text", placeholder: "Zip Code", inputClassName: "form_input_field"},
    ],
  }
]

const arrayOfDepartments = [
  {name: "Sales", abbreviation: "sales"},
  {name: "Marketing", abbreviation: "marketing"},
  {name: "Engineering", abbreviation: "engineering"},
  {name: "Human ressources", abbreviation: "human ressources"},
  {name: "Legal", abbreviation: "legal"},
]

const arrayOfStates = [
  {name: "Alabama", abbreviation: "AL"},
  {name: "Alaska", abbreviation: "AK"},
  {name: "American Samoa", abbreviation: "AS"},
  {name: "Arizona", abbreviation: "AZ"},
  {name: "Arkansas", abbreviation: "AR"},
  {name: "California", abbreviation: "CA"},
  {name: "Colorado", abbreviation: "CO"},
  {name: "Connecticut", abbreviation: "CT"},
  {name: "Delaware", abbreviation: "DE"},
  {name: "District Of Columbia", abbreviation: "DC"},
  {name: "Federated States Of Micronesia", abbreviation: "FM"},
  {name: "Florida", abbreviation: "FL"},
  {name: "Georgia", abbreviation: "GA"},
  {name: "Guam", abbreviation: "GU"},
  {name: "Hawaii", abbreviation: "HI"},
  {name: "Idaho", abbreviation: "ID"},
  {name: "Illinois", abbreviation: "IL"},
  {name: "Indiana", abbreviation: "IN"},
  {name: "Iowa", abbreviation: "IA"},
  {name: "Kansas", abbreviation: "KS"},
  {name: "Kentucky", abbreviation: "KY"},
  {name: "Louisiana", abbreviation: "LA"},
  {name: "Maine", abbreviation: "ME"},
  {name: "Marshall Islands", abbreviation: "MH"},
  {name: "Maryland", abbreviation: "MD"},
  {name: "Massachusetts", abbreviation: "MA"},
  {name: "Michigan", abbreviation: "MI"},
  {name: "Minnesota", abbreviation: "MN"},
  {name: "Mississippi", abbreviation: "MS"},
  {name: "Missouri", abbreviation: "MO"},
  {name: "Montana", abbreviation: "MT"},
  {name: "Nebraska", abbreviation: "NE"},
  {name: "Nevada", abbreviation: "NV"},
  {name: "New Hampshire", abbreviation: "NH"},
  {name: "New Jersey", abbreviation: "NJ"},
  {name: "New Mexico", abbreviation: "NM"},
  {name: "New York", abbreviation: "NY"},
  {name: "North Carolina", abbreviation: "NC"},
  {name: "North Dakota", abbreviation: "ND"},
  {name: "Northern Mariana Islands", abbreviation: "MP"},
  {name: "Ohio", abbreviation: "OH"},
  {name: "Oklahoma", abbreviation: "OK"},
  {name: "Oregon", abbreviation: "OR"},
  {name: "Palau", abbreviation: "PW"},
  {name: "Pennsylvania", abbreviation: "PA"},
  {name: "Puerto Rico", abbreviation: "PR"},
  {name: "Rhode Island", abbreviation: "RI"},
  {name: "South Carolina", abbreviation: "SC"},
  {name: "South Dakota", abbreviation: "SD"},
  {name: "Tennessee", abbreviation: "TN"},
  {name: "Texas", abbreviation: "TX"},
  {name: "Utah", abbreviation: "UT"},
  {name: "Vermont", abbreviation: "VT"},
  {name: "Virgin Islands", abbreviation: "VI"},
  {name: "Virginia", abbreviation: "VA"},
  {name: "Washington", abbreviation: "WA"},
  {name: "West Virginia", abbreviation: "WV"},
  {name: "Wisconsin", abbreviation: "WI"},
  {name: "Wyoming", abbreviation: "WY"},
]


const CreateEmployeeForm = () => { 
  
  const { state: createEmployeeState, dispatch: createEmployeeDispatch } = useContext(CreateEmployeeContext);
  const { state: employeesDataState, dispatch: employeesDataDispatch } = useContext(employeesDataContext);
  
  const { isModalOpen } = createEmployeeState;
  const setIsModalOpen = useCallback((payload) => { createEmployeeDispatch({ type: "SET_IS_MODAL_OPEN", payload }) }, [createEmployeeDispatch]);
  
  const { employeesData } = employeesDataState;
  const setEmployeesData = useCallback((payload) => { employeesDataDispatch({ type: "SET_EMPLOYEES_DATA", payload }) }, [employeesDataDispatch]);
  
  const [isValid, setIsValid] = useState({});
  const [inputError, setInputError] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [submitAnimation, setSubmitAnimation] = useState(false);
  const [newArrayOfValues, setNewArrayOfValues] = useState({
    lastName: '',
    firstName: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    zipCode: '',
    state: '',
    department: '',
  });


  const regexPatterns = useMemo(() => {
    const onlyLettersHyphenSpace= /^[a-zA-ZÀ-ÿ- ]{1,30}$/;
    const dateFR= /^(0?[1-9]|1[0-9]|2[0-9]|3[0-1])[/](0[1-9]|1[0-2])[/]([0-9]{4})$/;
    
    return {
      lastName: onlyLettersHyphenSpace,
      firstName: onlyLettersHyphenSpace,
      dateOfBirth: dateFR,
      startDate: dateFR,
      street: /^(?!.*\.\.)[a-zA-Z0-9-. ]+$/,
      city: onlyLettersHyphenSpace,
      zipCode: /^\d{5}$/,
    };
  }, []);

  const camelToNotCamel= useCallback((str) => {
    return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (match) => match.toUpperCase())
      .trim();
  }, []);


  const regexErrorMessages = useCallback((key) => {
    const baseMessage = `Invalid ${camelToNotCamel(key)}`;
  
    switch (key) {
      case 'lastName':
      case 'firstName':
        return `${baseMessage}, only - and letters are allowed, max 30 characters`;
      case 'dateOfBirth':
      case 'startDate':
        return `${baseMessage} format, must be DD/MM/YYYY`;
      case 'street':
        return `${baseMessage}, only letters, numbers, . (not ..) and - are allowed, max 50 characters`;
      case 'city':
        return `${baseMessage}, only - and letters are allowed, max 30 characters`;
      case 'zipCode':
        return `${baseMessage}, only 5 digits are allowed`;
      default:
        return `${baseMessage}, input format`;
    }
  }, [camelToNotCamel]);


  const customErrorMessages = useCallback((key, errorType) => {
    switch (errorType) {
      case 'invalidType':
        return `Invalid ${camelToNotCamel(key)}`;
      case 'dateInTheFuture':
        return `${camelToNotCamel(key)} cannot be in the future McFly!!!`;
      default:
        return `Invalid ${camelToNotCamel(key)}`;
    }
  }, [camelToNotCamel]);


  const consoleErrorMessages = useCallback((key, input, log) => {
    switch (log) {
      case 'type':
        return console.log('%c' + 'INPUT-ERROR ' + key + ' ' + input + ' invalid input => falsy or type !== string', 'color: red;');
      case 'regex':
        return console.log('%c' + 'INPUT-ERROR ' + key + ' ' + input + ' ' + `invalid ${key} => ${key} format`, 'color: red;');
      case 'dateInTheFuture':
        return  console.log('%c' + 'INPUTDATE-ERROR ' + key + ' ' + input + ", are in the future Marty!!!", 'color: red;');
      default:
        return console.log('%c' + 'INPUT-ERROR ' + key + ' ' + input + ' invalid input', 'color: red;');
    }
  }, []);


  const validateAndFormatInput = useCallback((input, key) => {

    if(!input || typeof input !== 'string' || typeof key !== 'string') {
      consoleErrorMessages(key, input, 'type');
      setInputError(prevErrors => ({
        ...prevErrors,
        [key]:customErrorMessages(key,'invalidType')
      }));
      setIsValid(prevIsValid => ({...prevIsValid, [key]: false}));
      return '';  
    }

    if(regexPatterns[key] && !input.match(regexPatterns[key])) {
      consoleErrorMessages(key, input, 'regex');
      setInputError(prevErrors => ({
        ...prevErrors,
        [key]:regexErrorMessages(key)
      }));
      setIsValid(prevIsValid => ({...prevIsValid, [key]: false}));
      return '';
    }

    if(key === 'dateOfBirth' && dayjs().isBefore(dayjs(input, 'DD/MM/YYYY'))) {
      consoleErrorMessages(key, input, 'dateInTheFuture');
      setInputError(prevErrors => ({
        ...prevErrors,
        [key]:customErrorMessages(key, 'dateInTheFuture')
      }));
      setIsValid(prevIsValid => ({...prevIsValid, [key]: false}));
      return '';
    }

    setInputError(prevErrors => {
      const newErrors = { ...prevErrors };
      delete newErrors[key];
      return newErrors;
    });
    setIsValid(prevIsValid => ({...prevIsValid, [key]: true}));
    return input;

  }, [regexPatterns, regexErrorMessages, customErrorMessages, consoleErrorMessages]);


  const onInputChange = useCallback((e) => {
    let key = e.target.name;
    let value = e.target.value;

    if(e.target.name === "state") {
      setNewArrayOfValues(prevArray => ({...prevArray, [key]: validateAndFormatInput(value, key)}));

    } else if(e.target.name === "dateOfBirth" || e.target.name === "startDate") {
      setNewArrayOfValues(prevArray => ({...prevArray, [key]: validateAndFormatInput(value, key)}));

    } else if(e.target.name === "department") {
      setNewArrayOfValues(prevArray => ({...prevArray, [key]: validateAndFormatInput(value, key)}));

    } else {
      validateAndFormatInput(value, key);
    }

  }, [validateAndFormatInput]);


  const onSelectChange = useCallback((name, value) => {
    onInputChange({ target: { name, value } });
  }, [onInputChange]);


  const onInputBlur = useCallback((e) => {
    let key = e.target.name;
    
    let value = e.target.value
    .replace(/\s+/g, ' ') // if several spaces leave only one space
    .replace(/-+/g, '-') // if several - leave only one -
    .replace(/\s?-\s?/g, '-') // if space- or -space remove space
    .replace(/^-+|-+$|^\s+|\s+$/g, '') // Remove - and spaces at the start and end
    .split(' ')
    .map(segment =>
      segment.includes('-')
        ? segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('-')
        : segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase()
    )
    .join(' ');
    
    setNewArrayOfValues(prevArray => ({...prevArray, [key]: value}));
  }, []);


  const createEmployee = (e) => {
    e.preventDefault();
    
    const allFieldsFilled = Object.values(newArrayOfValues).every(value => value.trim() !== '');
    if (allFieldsFilled && Object.values(isValid).every(value => value === true)) {
      setSubmitError('');
      setSubmitAnimation(false);
      setIsModalOpen(true);
      setEmployeesData([...employeesData, newArrayOfValues]);
    
    } else {
      setSubmitError('Please fill all the fields, and fill it correctly');

      if (submitError) {
      setSubmitAnimation(false);
      setTimeout(() => setSubmitAnimation(true), 10);
      }
    }
  }
  
  // DEV
  useEffect(() => {
    if (process.env.NODE_ENV === "development" ) {
      console.log('newArrayOfValues', newArrayOfValues)
      console.log('isValid', isValid)
    }
  }, [newArrayOfValues, isValid])

  //   // DEV for formatDate test error format
  // useEffect(() => {
  // if (process.env.NODE_ENV === "development" ) {
  //     formatDate('112/2021', 'dateOfBirth');
  //     formatDate(2021, 'startDate');
  //   }
  // }, [formatDate]);


  return (
    <>
      <main className={`main_wrapper ${isModalOpen ? 'main_modal-opacity' : ''}`}>
        <form className="form_wrapper" name="create_employee" action="">
          <div className="form_fieldsets_wrapper"> 

            {formFieldsets.map((fieldset, index) => {
              return (
                <fieldset className="form_fieldset_container" key={index}>
                  <legend className="form_fieldset_legend">{fieldset.legend}</legend>
                  
                  {fieldset.input.map((input, inputIndex) => {
                    return (
                      <React.Fragment key={`input_${inputIndex}`}>
                        <div className="form_input_container">
                          <label htmlFor={input.id} className={input.labelClassName}>{input.label}</label>
                          <input type={input.type} 
                            id={input.id} 
                            name={input.id}
                            placeholder={input.placeholder} 
                            className={input.inputClassName} 
                            onChange={onInputChange}
                            onBlur={onInputBlur}
                          />
                          {inputError[input.id] && <div className="form_input_error">{inputError[input.id]}</div>}

                        </div>

                        {fieldset.legend === "Employee Informations" && input.id === "firstName" && (
                          <>
                            <FormDatePicker 
                              id={'dateOfBirth'}
                              name={'dateOfBirth'}
                              label={'Date of Birth'}
                              placeholder={'Birthdate'}
                              containerClassName={'form_input_container'}
                              labelClassName={'form_input_label'}
                              onChange={onInputChange}
                            />
                            {inputError['dateOfBirth'] && <div className="form_input_error">{inputError['dateOfBirth']}</div>}

                            <FormDatePicker 
                              id={'startDate'}
                              name={'startDate'}
                              label={'Start Date'}
                              placeholder={'Start Date'}
                              containerClassName={'form_input_container'}
                              labelClassName={'form_input_label'}
                              onChange={onInputChange}
                            />
                            {inputError['startDate'] && <div className="form_input_error">{inputError['startDate']}</div>}
                          </>
                        )}

                        {fieldset.legend === "Employee Address" && input.id === "city" && (
                          <>
                            <SelectField
                              id={'select-state'}
                              name={'state'}
                              label={'State'}
                              placeholder={'State'}
                              containerClassName="form_input_container"
                              labelClassName={'form_input_label'}
                              menuItem={arrayOfStates} 
                              onChange={onSelectChange}
                            />
                            {inputError['state'] && <div className="form_input_error">{inputError['state']}</div>}
                          </>
                        )}
                      </React.Fragment>
                    )
                  })}

                  {fieldset.legend === "Employee Informations" && 
                    <>
                      <SelectField
                        id={'select-department'}
                        name={'department'} 
                        label={'Department'}
                        placeholder={'Department'}
                        containerClassName="form_input_container"
                        labelClassName={'form_input_label'}
                        menuItem={arrayOfDepartments} 
                        onChange={onSelectChange}
                      />
                      {inputError['department'] && <div className="form_input_error">{inputError['department']}</div>}
                    </>
                  }

                </fieldset>
              )
            })}
          </div>

          
          {submitError && 
            <div className={`form_submit_error ${submitAnimation ? 'form_submit_error_animation' : ''}`}>
              {submitError}
            </div>
          }

          <SpheresButton 
            className="spheres-button_button" 
            onClick= {createEmployee}
            text="Add Employee" 
            container = {window}
            maxRadius = {80}
          />

        </form>
      </main>

      {isModalOpen && 
        <SpringModal 
          prefix={"modal"} 
          anim1={"modal_shake"} 
          anim2={"modal_heart-beat"} 
          text={'Employee successfully Created!'}
        />
      }
    </>
  )
}


export default CreateEmployeeForm;