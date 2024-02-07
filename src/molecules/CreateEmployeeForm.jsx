import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import employeesDataContext from "../context/employeesData/EmployeesDataContext";
import CreateEmployeeContext from "../context/createEmployee/CreateEmployeeContext"
import SelectField from "../atoms/mui/SelectField";
import SpheresButton from "./SpheresButton";
import SpringModal from "../atoms/mui/Modal";
import FormDatePicker from "../atoms/mui/DatePicker";
import dayjs from "dayjs";


// TODO REGEX INPUT
const CreateEmployeeForm = () => { 

  const [newArrayOfInputsValues, setNewArrayOfInputsValues] = useState({
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

  const { state: createEmployeeState, dispatch: createEmployeeDispatch } = useContext(CreateEmployeeContext);
  const { state: employeesDataState, dispatch: employeesDataDispatch } = useContext(employeesDataContext);

  const { isModalOpen } = createEmployeeState;
  const setIsModalOpen = useCallback((payload) => { createEmployeeDispatch({ type: "SET_IS_MODAL_OPEN", payload }) }, [createEmployeeDispatch]);

  const { employeesData } = employeesDataState;
  const setEmployeesData = useCallback((payload) => { employeesDataDispatch({ type: "SET_EMPLOYEES_DATA", payload }) }, [employeesDataDispatch]);

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
        {label: "Zip Code", id: "zipCode", labelClassName: "form_input_label", type: "number", placeholder: "Zip Code", inputClassName: "form_input_field"},
      ],
    }
  ];

  const arrayOfDepartments = [
    {name: "Sales", abbreviation: "sales"},
    {name: "Marketing", abbreviation: "marketing"},
    {name: "Engineering", abbreviation: "engineering"},
    {name: "Human Ressources", abbreviation: "human ressources"},
    {name: "Legal", abbreviation: "legal"},
  ];

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
    {name: "Test toUpperCase", abbreviation: "tu"},
    {name: "Test notLetters", abbreviation: '123'},
    {name: "Test length", abbreviation: 'TLH'},
    // {name: "Test notString", abbreviation: 456},
  ];


  function camelToNotCamel(str) {
    return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (match) => match.toUpperCase())
      .trim();
  }


  const selectFormChange = (name, value) => {
    onInputChange({ target: { name, value } });
  }

  function formatState(inputState) {
    if( !inputState || inputState.length !== 2 || !/^[a-zA-Z]+$/.test(inputState) ) {
      return '';
    }
    inputState = inputState.toUpperCase();
    return inputState;
  }
  
  function formatDepartment(inputDepartment) {
    if(!inputDepartment) {
      return '';
    } else {
      return inputDepartment.charAt(0).toUpperCase() + inputDepartment.slice(1).toLowerCase();
    }
  }
  
  const [inputError, setInputError] = useState({});

  const regexDate = useMemo(() => /^(0?[1-9]|1[0-9]|2[0-9]|3[0-1])[/](0[1-9]|1[0-2])[/]([0-9]{4})$/, []);


  const formatDate = useCallback((inputDate, key) => {

    if(!inputDate || typeof inputDate !== 'string' || typeof key !== 'string') {
      console.log('%c' + 'INPUTDATE-ERROR' + key + ' ' + inputDate + ' invalid input => falsy or type !== string', 'color: red;');
      return '';

    } else if (!inputDate.match(regexDate)) {
      console.log('%c' + 'INPUTDATE-ERROR ' + key + ' ' + inputDate + ' invalid date => date format', 'color: red;');
      setInputError(prevErrors => ({
        ...prevErrors,
        [key]:`Invalid ${camelToNotCamel(key)}`
      }));
      return '';

    } else if(key === 'dateOfBirth' && dayjs().isBefore(dayjs(inputDate, 'DD/MM/YYYY'))) {
      console.log('%c' + 'INPUTDATE-ERROR ' + key + ' ' + inputDate + ", are in the future Marty!!!", 'color: red;');
      setInputError(prevErrors => ({
        ...prevErrors,
        [key]:`Your ${camelToNotCamel(key)} cannot be in the future McFly!`
      }));
      return '';

    } else {
      setInputError(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[key];
        // return the error object update, 
        // return :reflects the state of the form with the remaining errors if there are any
        return newErrors; 
      });
      return inputDate;
    }  
  }, [regexDate]);

  // DEV
  useEffect(() => {
    formatDate('112/2021', 'dateOfBirth');
    formatDate(2021, 'startDate');
  }, [formatDate])




  function formatOthers(inputOthers, key) {
    console.log ('key', key, 'inputOthers', inputOthers)

    if(!inputOthers) {
      return '';
    } 
    
    const inputValue = inputOthers.replace(/\s+/g, ' '); //s for space, tab,line break, and others space characters


    const formattedInputValue = inputValue.includes('-') ? 

       inputValue.split(/[\s-]+/).map((word) => { 
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }).join('-') 
    : 
      inputValue.split(' ').map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }).join(' ');

    return formattedInputValue;
  }


  const onInputChange = (e) => {
    let key = e.target.name;
    let value;

    if(e.target.name === "state") {
      key = e.target.name;
      console.log('key', key)
      value = formatState(defaultValueFunction(e.target.value));

    } else if(e.target.name === "dateOfBirth" || e.target.name === "startDate") {
      key = e.target.name;
      value = formatDate(defaultValueFunction(e.target.value), key);

    } else if(e.target.name === "department") {
      key = e.target.name;
      value = formatDepartment(defaultValueFunction(e.target.value));
    } else {
      value = formatOthers(defaultValueFunction(e.target.value), key);
    }

    setNewArrayOfInputsValues({...newArrayOfInputsValues, [key]: value })
  }


  // const onInputBlur = () => {
  //   setNewArrayOfInputsValues({...newArrayOfInputsValues})
  // }

  
  const defaultValueFunction = (input) => {
    if(input === null || input === undefined) {
      return '';
    } else {
      return input;
    }
  }

  // DEV
  useEffect(() => {
    console.log('newArrayOfInputsValues', newArrayOfInputsValues)
  }, [newArrayOfInputsValues])





  const createEmployee = (e) => {
    // TODO data validation
    e.preventDefault();
    setIsModalOpen(true);
    setEmployeesData([...employeesData, newArrayOfInputsValues]);
  }

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
                            value={newArrayOfInputsValues[input.id]}
                            onChange={onInputChange}
                            // onBlur={onInputBlur}
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
                              inputClassName={'form_input_field'}
                              onChange={onInputChange}
                            />
                            {inputError['dateOfBirth'] && <div className="form_input_error">{inputError['dateOfBirth']}</div>}
                            
                            {console.log('JSX--inputError', inputError['dateOfBirth'])}

                            <FormDatePicker 
                              id={'startDate'}
                              name={'startDate'}
                              label={'Start Date'}
                              placeholder={'Start Date'}
                              containerClassName={'form_input_container'}
                              labelClassName={'form_input_label'}
                              inputClassName={'form_input_field'}
                              onChange={onInputChange}
                            />
                            {inputError['startDate'] && <div className="form_input_error">{inputError['startDate']}</div>}
                          </>
                        )}

                        {fieldset.legend === "Employee Address" && input.id === "city" && (
                          <SelectField
                            id={'state'}
                            name={'state'}
                            label={'State'}
                            containerClassName="form_input_container"
                            labelClassName={'form_input_label'}
                            inputClassName={'form_input_field'}
                            menuItem={arrayOfStates} 
                            onChange={selectFormChange}
    
                          />
                        )}
                      </React.Fragment>
                    )
                  })}

                  {fieldset.legend === "Employee Informations" && 
                    <SelectField
                      id={'department'}
                      name={'department'} 
                      label={'Department'}
                      containerClassName="form_input_container"
                      labelClassName={'form_input_label'}
                      inputClassName={'form_input_field'}
                      menuItem={arrayOfDepartments} 
                      onChange={selectFormChange}
                    />
                  } 

                </fieldset>
              )
            })}
          </div>

          <SpheresButton 
            className="spheres-button_button" 
            onClick={createEmployee} 
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