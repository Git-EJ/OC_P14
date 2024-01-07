const CreateEmployee = () => { 

  const formFieldsets = [
  
    {
      legend: "Employee Informations",
      input: [
        {label: "Lastname", id: "lastname", labelClassName: "form_input_label", type: "text", placeholder: "Lastname", inputClassName: "form_input_field"},
        {label: "Firstname", id: "firstname", labelClassName: "form_input_label", type: "text", placeholder: "Firstname", inputClassName: "form_input_field"},
        {label: "Date of Birth", id: "birthdate", labelClassName: "form_input_label", type: "date", placeholder: "Birthdate", inputClassName: "form_input_field"},
        {label: "Start Date", id: "startDate", labelClassName: "form_input_label", type: "date", placeholder: "Start Date", inputClassName: "form_input_field"},
        {label: "Department", id: "department", labelClassName: "form_input_label", type: "text", placeholder: "Department", inputClassName: "form_input_field"},
      ],
    },
    {
      legend: "Employee Address",
      input: [
        {label: "Street", id: "street", labelClassName: "form_input_label", type: "text", placeholder: "Street", inputClassName: "form_input_field"},
        {label: "City", id: "city", labelClassName: "form_input_label", type: "text", placeholder: "City", inputClassName: "form_input_field"},
        {label: "State", id: "state", labelClassName: "form_input_label", type: "text", placeholder: "State", inputClassName: "form_input_field"},
        {label: "Zip Code", id: "zipCode", labelClassName: "form_input_label", type: "text", placeholder: "Zip Code", inputClassName: "form_input_field"},
      ],
    }
  ];

  return (
    <main className="main_wrapper">
      <form className="form_wrapper" name="create_employee" action="">
        <div className="form_fieldsets_wrapper">
          
          {formFieldsets.map((fieldset, index) => {
            return (
              <fieldset className="form_fieldset_container" key={index}>
                <legend className="form_fieldset_legend">{fieldset.legend}</legend>
                
                {fieldset.input.map((input, index) => {
                  return (
                    <div className="form_input_container" key={`input_${index}`}>
                      <label htmlFor={input.id} className={input.labelClassName}>{input.label}</label>
                      <input type={input.type} id={input.id} placeholder={input.placeholder} className={input.inputClassName} />
                    </div>
                  )
                })}
              </fieldset>
            )
          })}
        </div>

        <div className="form_submit_container">
          <button type="submit" className="form_submit_button" >Create Employee</button>
        </div>
      </form>
        
    </main>
  )
}


export default CreateEmployee;