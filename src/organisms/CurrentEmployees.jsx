import { useNavigate } from "react-router-dom";
import CaretUp from "../assets/icons/Caret_up";
import CaretDown from "../assets/icons/Caret_down";
import SpheresButton from "../molecules/SpheresButton";

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
      firstName: "ATOTO",
      lastName: "ATUTUTITI",
      startDate: "01/10/2024",
      department: "AHuman Ressources",
      dateOfBirth: "02/02/2024",
      street: "20 rue de TOTOVILLE",
      city: "ATOTOVILLE",
      state: "ATV",
      zipCode: "01000",
    },
    {
      firstName: "BTOTO",
      lastName: "BTUTUTITI",
      startDate: "01/01/2024",
      department: "BHuman Ressources",
      dateOfBirth: "10/02/2024",
      street: "2 rue de TOTOVILLE",
      city: "BTOTOVILLE",
      state: "BTV",
      zipCode: "00100",
    },
    {
      firstName: "CTOTO",
      lastName: "CTUTUTITI",
      startDate: "10/01/2024",
      department: "CHuman Ressources",
      dateOfBirth: "02/01/2024",
      street: "02 rue de TOTOVILLE",
      city: "CTOTOVILLE",
      state: "CTV",
      zipCode: "00010",
    },
    {
      firstName: "DTOTO",
      lastName: "DTUTUTITI",
      startDate: "10/01/2023",
      department: "DHuman Ressources",
      dateOfBirth: "02/01/2023",
      street: "10 rue de TOTOVILLE",
      city: "DTOTOVILLE",
      state: "DTV",
      zipCode: "00001",
    },
  ];

  const navigate = useNavigate();


  const EmployeesDataTitle = () => {
    return arrayOfEmployeesDataTitle.map((title, index) => (
      
      <div className={`current-employees_data-table_title_item_${index}`} key={`${index}_${title}`}>
        <p className= "current-employees_data-table_title_item_value">{title}</p>
        <div className="current-employees_data-table_title_item_sorting_container">
          <div className="current-employees_data-table_title_item_sorting_icon-up"><CaretUp /></div>
          <div className="current-employees_data-table_title_item_sorting_icon-down"><CaretDown /></div>
        </div>
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

  const addEmployeeLink = () => {
    navigate('/employee-create');
  }

  return (
    <main className="main_wrapper">
        <h2 className="current-employees_page-title">Employee List</h2>

        <div className="current-employees_data-table_wrapper">

          <div className="current-employees_data-table_options_container">

            {/* TODO Tooltip */}
            <div className="current-employees_data-table_options_entries">
              <label htmlFor="data-table_entries">Show</label>
              <select id="data-table_entries">
                <option value="1" selected>1</option>
                <option value="10">10</option>
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

          <div className="current-employees_data-table_showing_container">

            <div className="current-employees_data-table_showing_entries_container">
              <p className="current-employees_data-table_showing_entries_text">Showing 1 to 3 of 3 entries</p>
            </div>

            <div className="current-employees_data-table_showing_pagination_container">
              <button className="current-employees_data-table_showing_pagination_button_previous">Previous</button>
              <button className="current-employees_data-table_showing_pagination_button_current">1</button>
              <button className="current-employees_data-table_showing_pagination_button_not-current">2</button>
              <button className="current-employees_data-table_showing_pagination_button_next">Next</button>
            </div>

          </div>

          {/* TODO delete employee with checkbox and button delete*/}
          <SpheresButton type="submit" className="spheres-button_button" onClick={addEmployeeLink} text="Add Employee" />


        </div>


    </main>
  )
}

export default CurrentEmployees;