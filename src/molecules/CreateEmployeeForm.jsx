import React, { useCallback, useContext, useEffect, useState } from "react";
import employeesDataContext from "../context/employeesData/EmployeesDataContext";
import CreateEmployeeContext from "../context/createEmployee/CreateEmployeeContext"
import SelectField from "../atoms/SelectField";
import SpheresButton from "./SpheresButton";
import SpringModal from "../molecules/Modal";


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

  const {
    isModalOpen,
  } = createEmployeeState;
  const setIsModalOpen = useCallback((payload) => { createEmployeeDispatch({ type: "SET_IS_MODAL_OPEN", payload }) }, [createEmployeeDispatch]);

  const {
    employeesData,
  } = employeesDataState;
  const setEmployeesData = useCallback((payload) => { employeesDataDispatch({ type: "SET_EMPLOYEES_DATA", payload }) }, [employeesDataDispatch]);


  const formFieldsets = [
  
    {
      legend: "Employee Informations",
      input: [
        {label: "Lastname", id: "lastName", labelClassName: "form_input_label", type: "text", placeholder: "Lastname", inputClassName: "form_input_field", defaultValue: "Doe"},
        {label: "Firstname", id: "firstName", labelClassName: "form_input_label", type: "text", placeholder: "Firstname", inputClassName: "form_input_field", defaultValue: "John"},
        {label: "Date of Birth", id: "dateOfBirth", labelClassName: "form_input_label", type: "date", placeholder: "Birthdate", inputClassName: "form_input_field", defaultValue: "01/01/1970"},
        {label: "Start Date", id: "startDate", labelClassName: "form_input_label", type: "date", placeholder: "Start Date", inputClassName: "form_input_field", defaultValue: "01/01/2021"},
      ],
    },
    {
      legend: "Employee Address",
      input: [
        {label: "Street", id: "street", labelClassName: "form_input_label", type: "text", placeholder: "Street", inputClassName: "form_input_field", defaultValue: "1234 Main St"},
        {label: "City", id: "city", labelClassName: "form_input_label", type: "text", placeholder: "City", inputClassName: "form_input_field", defaultValue: "City"},
        {label: "Zip Code", id: "zipCode", labelClassName: "form_input_label", type: "number", placeholder: "Zip Code", inputClassName: "form_input_field", defaultValue: "12345"},
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


  function formatDate(inputDate) {
    const date = new Date(inputDate);
  
    if (isNaN(date)) {
      return '';
    }
  
    const day = String(date.getDate()).padStart(2, '0'); //2 caracteres if only 1 add 0 at the beginning
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
  
    return `${day}-${month}-${year}`;
  }

  function formatState(inputState) {
    if( !inputState || inputState.length !== 2 || /*typeof inputState !== 'string' ||*/ !/^[a-zA-Z]+$/.test(inputState) ) {
      return '';
    }
    inputState = inputState.toUpperCase();
    return inputState;
  }

  function formatOthers(inputOthers) {
    if(!inputOthers) {
      return '';
    } else if (/^\d+$/.test(inputOthers)) { //only numbers
      return inputOthers
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


  const selectFormChange = (name, value) => {
    onInputValue({ target: { name, value } });
  }

  const onInputValue = (e) => {
    let key = e.target.name;
    let value = formatOthers(defaultValueFunction(e.target.value));
    
    if(e.target.name === "state") {
      key = e.target.name;
      value = formatState(defaultValueFunction(e.target.value));

    } else if(e.target.name === "dateOfBirth" || e.target.name === "startDate") {
      key = e.target.name;
      value = formatDate(defaultValueFunction(e.target.value));
    } 

    setNewArrayOfInputsValues({...newArrayOfInputsValues, [key]: value })
  }
  
  const defaultValueFunction = (input) => {
    if(input === null || input === undefined) {
      return '';
    } else {
      return input;
    }
  }

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
                            onInput={onInputValue} // TODO onInput or onBlur
                          />
                        </div>

                        {fieldset.legend === "Employee Address" && input.id === "city" && (
                          <div className="form_input_container">
                            <SelectField 
                              label={'State'}
                              name={'state'}
                              menuItem={arrayOfStates} 
                              onChange={selectFormChange}
                            />
                          </div>
                        )}
                      </React.Fragment>
                    )
                  })}

                  {fieldset.legend === "Employee Informations" && 
                    <SelectField 
                      label={'Department'}
                      name={'department'}  
                      menuItem={arrayOfDepartments} 
                      onChange={selectFormChange}
                    />
                  } 

                </fieldset>
              )
            })}
          </div>

          <SpheresButton type="submit" className="spheres-button_button" onClick={createEmployee} text="Add Employee" />

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