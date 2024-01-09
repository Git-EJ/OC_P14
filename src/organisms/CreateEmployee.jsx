import React, { useState } from "react";
import SelectField from "../atoms/SelectField";
import Modal from '../atoms/Modal';

const CreateEmployee = () => { 

  const [isModalOpen, setIsModalOpen] = useState(false);

  const formFieldsets = [
  
    {
      legend: "Employee Informations",
      input: [
        {label: "Lastname", id: "lastname", labelClassName: "form_input_label", type: "text", placeholder: "Lastname", inputClassName: "form_input_field"},
        {label: "Firstname", id: "firstname", labelClassName: "form_input_label", type: "text", placeholder: "Firstname", inputClassName: "form_input_field"},
        {label: "Date of Birth", id: "birthdate", labelClassName: "form_input_label", type: "date", placeholder: "Birthdate", inputClassName: "form_input_field"},
        {label: "Start Date", id: "startDate", labelClassName: "form_input_label", type: "date", placeholder: "Start Date", inputClassName: "form_input_field"},
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

  // this array or npm usa-states??
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
    {name: "Wyoming", abbreviation: "WY"}
  ];

  const createEmployee = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }


  return (
    <>
      <main className={`main_wrapper ${isModalOpen ? 'main_modal-opacity' : ''}`}>
      {/* <main className="main_wrapper"> */}
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
                          <input type={input.type} id={input.id} placeholder={input.placeholder} className={input.inputClassName} />
                        </div>

                        {fieldset.legend === "Employee Address" && input.id === "city" && (
                          <div className="form_input_container">
                            <SelectField label={'State'} menuItem={arrayOfStates} />
                          </div>
                        )}
                      </React.Fragment>
                    )
                  })}

                  {fieldset.legend === "Employee Informations" && <SelectField label={'Department'}  menuItem={arrayOfDepartments} />} 

                </fieldset>
              )
            })}
          </div>

          <div className="form_submit_container">
            <div className="form_submit_outside-circle"></div>
            <div className="form_submit_middleOut-circle"></div>
            <div className="form_submit_middleIn-circle"></div>
            <div className="form_submit_inside-circle"></div>
            <button type="submit" className="form_submit_button" onClick={createEmployee} >Create Employee</button>
            <div className="form_submit_inside-circle"></div>
            <div className="form_submit_middleIn-circle"></div>
            <div className="form_submit_middleOut-circle"></div>
            <div className="form_submit_outside-circle"></div>
          </div>

        </form>
      </main>

      {isModalOpen && <Modal closeModal={closeModal} />}
    </>
  )
}


export default CreateEmployee;