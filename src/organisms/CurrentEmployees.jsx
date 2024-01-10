const CurrentEmployees = () => {

  const arrayOfEmployeesDataTitle = [
    "FirstName", //0
    "LastName", //1
    "Start Date", //2
    "Department", //3
    "Date of Birth", //4
    "Street", //5
    "City", //6
    "State", //7
    "Zip Code", //8
  ];

  const arrayOfEmployeesDataContents = [
    {
      firstName: "TOTO",
      lastName: "TUTUTITI",
      startDate: "01/01/2024",
      department: "Human Ressources",
      dateOfBirth: "02/02/2024",
      street: "222 rue de TOTOVILLE",
      city: "TOTOVILLE",
      state: "TV",
      zipCode: "00000",
    },
    {
      firstName: "TOTO",
      lastName: "TUTUTITI",
      startDate: "01/01/2024",
      department: "Human Ressources",
      dateOfBirth: "02/02/2024",
      street: "222 rue de TOTOVILLE",
      city: "TOTOVILLE",
      state: "TV",
      zipCode: "00000",
    },
    {
      firstName: "TOTO",
      lastName: "TUTUTITI",
      startDate: "01/01/2024",
      department: "Human Ressources",
      dateOfBirth: "02/02/2024",
      street: "222 rue de TOTOVILLE",
      city: "TOTOVILLE",
      state: "TV",
      zipCode: "00000",
    },
  ];


  const EmployeesDataTitle = () => {
    return arrayOfEmployeesDataTitle.map((title, index) => (
      
      <div className={`current-employees_data-table_title_item_${index}`} key={`${index}_${title}`}>
        <p className= "current-employees_data-table_title_item_value">{title}</p>
      </div>
    ));
  };


  const EmployeesDataContent = () => {
    return arrayOfEmployeesDataContents.map((content, index) => (
          
      <div className="current-employees_data-table_content-line_container" key={`${index}_${content.firstName}-${content.lastName}`}>
       
        {Object.values(content).map((value, i) => (
          <div className={`current-employees_data-table_content-line_item_${i}`} key={`item_${i}_${value}`}>
            <p className="current-employees_data-table_content-line_item_value">{value}</p>
          </div>
        ))}

      </div>
    ));
  };

  return (
    <main className="main_wrapper">
        <h2 className="current-employees_page-title">Employee List</h2>

        <div className="current-employees_data-table_wrapper">

          <div className="current-employees_data-table_options_container">

            <div className="current-employees_data-table_options_entries">
              <label htmlFor="data-table_entries">Show</label>
              <select id="data-table_entries">
                <option value="10" selected>10</option>
                <option value="25">25</option>
                <option value="50" >50</option>
                <option value="100">100</option>
              </select>
              <label htmlFor="data-table_entries">entries</label>
            </div>

            <div className="current-employees_data-table_options_search">
              <label htmlFor="data-table_search">Search:</label>
              <input id="data-table_search" type="text" placeholder="" />
            </div>
          </div>

          <div className="current-employees_data-table_titles_container">
            <EmployeesDataTitle />
          </div>

          <div className="current-employees_data-table_content-lines_container">
            <EmployeesDataContent />
          </div>




        </div>


    </main>
  )
}

export default CurrentEmployees;