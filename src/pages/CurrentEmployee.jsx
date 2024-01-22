import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeesDataContext from "../context/employeesData/EmployeesDataContext";
import Header from "../molecules/Header";
import DataTable from "../molecules/DataTable";
import SpheresButton from "../molecules/SpheresButton";
import CircleArrowLeft from "../assets/icons/CircleArrowLeft";
import CircleArrowRight from "../assets/icons/CircleArrowRight";

const arrayOfEmployeesDataTitle = [
  //for editing the data create date read only or not
  {
    key: "firstName",
    value: "FirstName",
    editable: true,
  },
  {
    key: "lastName",
    value: "LastName",
  },
  {
    key: "startDate",
    value: "StartDate",
    type: "date",
  },
  {
    key: "department",
    value: "Department",
  },
  {
    key: "dateOfBirth",
    value: "Date Of Birth",
    type: "date",
  },
  {
    key: "street",
    value: "Street",
    type: 'street'
  },
  {
    key: "city",
    value: "City",
  },
  {
    key: "state",
    value: "State",
  },
  {
    key: "zipCode",
    value: "ZipCode",
    type: 'number'
  },
]

//51 mocked employees data
const arrayOfEmployeesDataContents = [
{'firstName': 'Diane', 'lastName': 'Pierce', 'startDate': '11/09/2021', 'department': 'IT', 'dateOfBirth': '23/01/1981', 'street': '017 Harris Plain', 'city': 'North Sharon', 'state': 'NC', 'zipCode': '12492'},
{'firstName': 'Craig', 'lastName': 'Roth', 'startDate': '01/06/2021', 'department': 'HR', 'dateOfBirth': '08/07/1954', 'street': '7119 Leslie Spurs', 'city': 'Port Susanchester', 'state': 'FL', 'zipCode': '74557'},
{'firstName': 'Robert', 'lastName': 'Hinton', 'startDate': '17/04/2023', 'department': 'Finance', 'dateOfBirth': '02/03/1960', 'street': '927 John Meadows Suite 900', 'city': 'Suzannemouth', 'state': 'ME', 'zipCode': '14054'},
{'firstName': 'Sabrina', 'lastName': 'Bartlett', 'startDate': '08/08/2023', 'department': 'Sales', 'dateOfBirth': '13/09/1983', 'street': '4417 John Stream Apt. 613', 'city': 'Port Karenside', 'state': 'NJ', 'zipCode': '04007'},
{'firstName': 'Robin', 'lastName': 'Harris', 'startDate': '10/08/2023', 'department': 'Sales', 'dateOfBirth': '10/09/2004', 'street': '6873 Aaron Brooks Suite 398', 'city': 'New Haley', 'state': 'NM', 'zipCode': '98604'},
{'firstName': 'Jacob', 'lastName': 'Ferguson', 'startDate': '04/03/2021', 'department': 'Marketing', 'dateOfBirth': '27/07/1970', 'street': '8839 Savannah Drive', 'city': 'Fordland', 'state': 'NE', 'zipCode': '10910'},
{'firstName': 'Elizabeth', 'lastName': 'Freeman', 'startDate': '07/03/2022', 'department': 'Marketing', 'dateOfBirth': '18/10/2002', 'street': '820 James Falls Apt. 989', 'city': 'Brendamouth', 'state': 'AZ', 'zipCode': '69873'},
{'firstName': 'Edward', 'lastName': 'Alexander', 'startDate': '28/10/2019', 'department': 'HR', 'dateOfBirth': '21/11/1991', 'street': '97823 Sullivan Fall', 'city': 'Martinshire', 'state': 'CT', 'zipCode': '84721'},
{'firstName': 'Danielle', 'lastName': 'Greene', 'startDate': '14/08/2022', 'department': 'Marketing', 'dateOfBirth': '23/06/1964', 'street': '98382 Martin Motorway', 'city': 'Port Mark', 'state': 'MT', 'zipCode': '40863'},
{'firstName': 'Jackson', 'lastName': 'Miller', 'startDate': '28/07/2023', 'department': 'IT', 'dateOfBirth': '06/01/1981', 'street': '36178 Hutchinson Neck', 'city': 'Stephensville', 'state': 'WA', 'zipCode': '42809'},
{'firstName': 'Frank', 'lastName': 'Mcgee', 'startDate': '26/05/2020', 'department': 'Marketing', 'dateOfBirth': '28/01/1969', 'street': '44554 Berry Street Apt. 553', 'city': 'Port George', 'state': 'NH', 'zipCode': '07130'},
{'firstName': 'Monica', 'lastName': 'Harvey', 'startDate': '06/04/2020', 'department': 'Finance', 'dateOfBirth': '16/05/1995', 'street': '5063 Kathy Mountains Apt. 673', 'city': 'Michealtown', 'state': 'NY', 'zipCode': '37448'},
{'firstName': 'Dawn', 'lastName': 'Powell', 'startDate': '29/08/2022', 'department': 'HR', 'dateOfBirth': '20/01/1959', 'street': '065 Pineda Stravenue', 'city': 'Port Stacy', 'state': 'SC', 'zipCode': '13038'},
{'firstName': 'Thomas', 'lastName': 'Larson', 'startDate': '22/05/2022', 'department': 'IT', 'dateOfBirth': '29/01/1986', 'street': '2334 Daniel Walks Suite 348', 'city': 'Lake Christopher', 'state': 'MI', 'zipCode': '79260'},
{'firstName': 'David', 'lastName': 'Morton', 'startDate': '23/05/2021', 'department': 'Marketing', 'dateOfBirth': '26/11/1961', 'street': '75272 Debbie Common Suite 641', 'city': 'Melendezbury', 'state': 'WY', 'zipCode': '91022'},
{'firstName': 'Alyssa', 'lastName': 'Lyons', 'startDate': '01/06/2022', 'department': 'Finance', 'dateOfBirth': '23/06/2002', 'street': '596 Browning Lakes', 'city': 'Ortizbury', 'state': 'VA', 'zipCode': '37625'},
{'firstName': 'Mark', 'lastName': 'Peters', 'startDate': '11/03/2019', 'department': 'Sales', 'dateOfBirth': '12/12/1972', 'street': '975 Valerie Shores Suite 728', 'city': 'Birdstad', 'state': 'PA', 'zipCode': '13834'},
{'firstName': 'Nathaniel', 'lastName': 'Morales', 'startDate': '24/08/2020', 'department': 'Finance', 'dateOfBirth': '07/07/1965', 'street': '9050 Samuel Rue Suite 195', 'city': 'Charlotteview', 'state': 'CT', 'zipCode': '72064'},
{'firstName': 'Zachary', 'lastName': 'Bowen', 'startDate': '29/06/2023', 'department': 'HR', 'dateOfBirth': '09/10/1965', 'street': '9503 Higgins Parkway', 'city': 'East Laura', 'state': 'OK', 'zipCode': '10503'},
{'firstName': 'Michele', 'lastName': 'Jimenez', 'startDate': '28/06/2021', 'department': 'IT', 'dateOfBirth': '18/01/1981', 'street': '251 Snyder Bridge Apt. 480', 'city': 'Andersonmouth', 'state': 'WY', 'zipCode': '39436'},
{'firstName': 'Julie', 'lastName': 'Marshall', 'startDate': '23/02/2022', 'department': 'Sales', 'dateOfBirth': '21/05/1958', 'street': '37997 Thomas Garden Apt. 807', 'city': 'Stephentown', 'state': 'SC', 'zipCode': '52926'},
{'firstName': 'Jeffrey', 'lastName': 'Smith', 'startDate': '12/03/2020', 'department': 'Sales', 'dateOfBirth': '05/07/1991', 'street': '65253 Timothy Shoals', 'city': 'Port Benjaminton', 'state': 'WY', 'zipCode': '42392'},
{'firstName': 'Juan', 'lastName': 'Dunn', 'startDate': '30/04/2021', 'department': 'Finance', 'dateOfBirth': '30/11/1954', 'street': '625 John Prairie Apt. 117', 'city': 'Grahamstad', 'state': 'MI', 'zipCode': '39570'},
{'firstName': 'Luis', 'lastName': 'Love', 'startDate': '25/05/2021', 'department': 'Marketing', 'dateOfBirth': '13/08/1980', 'street': '3785 Bonilla Villages Suite 478', 'city': 'Salinasfort', 'state': 'FL', 'zipCode': '04999'},
{'firstName': 'Joseph', 'lastName': 'Bell', 'startDate': '14/01/2024', 'department': 'Finance', 'dateOfBirth': '27/12/1975', 'street': '2416 Costa Track Apt. 355', 'city': 'Port Sarah', 'state': 'OR', 'zipCode': '20095'},
{'firstName': 'Yvette', 'lastName': 'Clark', 'startDate': '18/06/2021', 'department': 'HR', 'dateOfBirth': '14/06/1969', 'street': '1572 Solis Forest Apt. 862', 'city': 'Saraland', 'state': 'NC', 'zipCode': '84872'},
{'firstName': 'Eric', 'lastName': 'Rodgers', 'startDate': '18/08/2022', 'department': 'Marketing', 'dateOfBirth': '13/06/1962', 'street': '21169 Michelle Inlet', 'city': 'Lake Lauren', 'state': 'MA', 'zipCode': '88169'},
{'firstName': 'Kenneth', 'lastName': 'Harris', 'startDate': '28/06/2021', 'department': 'HR', 'dateOfBirth': '06/05/1979', 'street': '782 Christopher Garden Apt. 876', 'city': 'Alexahaven', 'state': 'MO', 'zipCode': '79705'},
{'firstName': 'Katherine', 'lastName': 'Gonzalez', 'startDate': '16/07/2023', 'department': 'Finance', 'dateOfBirth': '19/08/1991', 'street': '03495 Blair Centers Suite 650', 'city': 'West Deanport', 'state': 'WV', 'zipCode': '11499'},
{'firstName': 'Christopher', 'lastName': 'Howard', 'startDate': '19/05/2022', 'department': 'Finance', 'dateOfBirth': '07/09/1988', 'street': '043 Green Roads Apt. 040', 'city': 'South Williammouth', 'state': 'MD', 'zipCode': '43256'},
{'firstName': 'Daniel', 'lastName': 'Price', 'startDate': '19/09/2020', 'department': 'IT', 'dateOfBirth': '26/05/1983', 'street': '864 Villegas Roads Apt. 215', 'city': 'North Johnny', 'state': 'NE', 'zipCode': '11682'},
{'firstName': 'Cynthia', 'lastName': 'Buchanan', 'startDate': '29/09/2022', 'department': 'Finance', 'dateOfBirth': '14/08/1991', 'street': '012 Lisa Walk', 'city': 'Martinezton', 'state': 'UT', 'zipCode': '67081'},
{'firstName': 'Lindsay', 'lastName': 'Burke', 'startDate': '17/02/2023', 'department': 'IT', 'dateOfBirth': '02/02/1966', 'street': '530 Newton Streets Apt. 028', 'city': 'Josephfurt', 'state': 'AZ', 'zipCode': '32495'},
{'firstName': 'Billy', 'lastName': 'Kaiser', 'startDate': '24/09/2023', 'department': 'Marketing', 'dateOfBirth': '05/11/1994', 'street': '0425 Smith Land Apt. 795', 'city': 'South Rebeccatown', 'state': 'WY', 'zipCode': '20262'},
{'firstName': 'Edward', 'lastName': 'Harding', 'startDate': '11/03/2019', 'department': 'IT', 'dateOfBirth': '23/05/1979', 'street': '555 Ward Motorway', 'city': 'Richardsonside', 'state': 'AK', 'zipCode': '16905'},
{'firstName': 'Kathryn', 'lastName': 'Davis', 'startDate': '25/11/2022', 'department': 'Sales', 'dateOfBirth': '04/12/1988', 'street': '056 Mosley Gateway Suite 845', 'city': 'Dorseyhaven', 'state': 'FL', 'zipCode': '06494'},
{'firstName': 'Jeffrey', 'lastName': 'Mccoy', 'startDate': '14/09/2019', 'department': 'Marketing', 'dateOfBirth': '02/06/1970', 'street': '55925 Johnson Manors', 'city': 'Port Kimberly', 'state': 'WI', 'zipCode': '65865'},
{'firstName': 'Jon', 'lastName': 'Harding', 'startDate': '15/08/2023', 'department': 'IT', 'dateOfBirth': '03/10/1987', 'street': '4491 Santiago Points', 'city': 'New Robert', 'state': 'NC', 'zipCode': '39364'},
{'firstName': 'Linda', 'lastName': 'Harris', 'startDate': '16/03/2020', 'department': 'IT', 'dateOfBirth': '02/02/2004', 'street': '8380 Kristina Road Suite 934', 'city': 'North Lance', 'state': 'RI', 'zipCode': '50482'},
{'firstName': 'James', 'lastName': 'Smith', 'startDate': '20/06/2022', 'department': 'HR', 'dateOfBirth': '09/02/1984', 'street': '23612 Kevin Locks Apt. 012', 'city': 'Kristinhaven', 'state': 'AR', 'zipCode': '73470'},
{'firstName': 'Cindy', 'lastName': 'Thomas', 'startDate': '23/05/2022', 'department': 'HR', 'dateOfBirth': '28/07/2005', 'street': '42281 Barajas Ridges', 'city': 'Karifurt', 'state': 'AL', 'zipCode': '92380'},
{'firstName': 'Monica', 'lastName': 'Little', 'startDate': '28/10/2023', 'department': 'Sales', 'dateOfBirth': '13/09/1992', 'street': '9178 Kathryn Coves', 'city': 'New Troymouth', 'state': 'ND', 'zipCode': '64803'},
{'firstName': 'Frank', 'lastName': 'Reyes', 'startDate': '30/04/2020', 'department': 'Marketing', 'dateOfBirth': '28/02/1958', 'street': '19566 Mason Parkways Suite 146', 'city': 'South Brian', 'state': 'WI', 'zipCode': '52612'},
{'firstName': 'Ronnie', 'lastName': 'Gonzalez', 'startDate': '06/07/2023', 'department': 'Sales', 'dateOfBirth': '20/05/1975', 'street': '0880 Johnson Burg Suite 489', 'city': 'Lake Tammymouth', 'state': 'LA', 'zipCode': '28018'},
{'firstName': 'Elizabeth', 'lastName': 'Willis', 'startDate': '01/04/2020', 'department': 'Finance', 'dateOfBirth': '13/09/1999', 'street': '42259 Thomas Landing', 'city': 'Port Andrewtown', 'state': 'LA', 'zipCode': '19153'},
{'firstName': 'Susan', 'lastName': 'Larson', 'startDate': '19/11/2022', 'department': 'Marketing', 'dateOfBirth': '06/03/1985', 'street': '46299 Joseph Points', 'city': 'New Austin', 'state': 'KS', 'zipCode': '01729'},
{'firstName': 'Mark', 'lastName': 'Hall', 'startDate': '10/08/2021', 'department': 'HR', 'dateOfBirth': '19/09/1988', 'street': '03370 Regina Land', 'city': 'Tiffanyport', 'state': 'MN', 'zipCode': '76590'},
{'firstName': 'Crystal', 'lastName': 'Diaz', 'startDate': '27/11/2020', 'department': 'Marketing', 'dateOfBirth': '01/05/1962', 'street': '2200 Timothy Oval', 'city': 'West Mark', 'state': 'IN', 'zipCode': '00842'},
{'firstName': 'Valerie', 'lastName': 'Williamson', 'startDate': '11/09/2021', 'department': 'Finance', 'dateOfBirth': '11/08/1956', 'street': '06547 Allison Burg', 'city': 'Grayton', 'state': 'VA', 'zipCode': '32997'},
{'firstName': 'Louis', 'lastName': 'Sanders', 'startDate': '19/07/2019', 'department': 'IT', 'dateOfBirth': '31/05/1964', 'street': '955 Robert Mill Apt. 372', 'city': 'Jamesmouth', 'state': 'ID', 'zipCode': '15527'},
{'firstName': 'Rebecca', 'lastName': 'Green', 'startDate': '15/07/2023', 'department': 'Marketing', 'dateOfBirth': '30/05/1963', 'street': '82607 Cheryl Land Suite 737', 'city': 'Penastad', 'state': 'WV', 'zipCode': '40523'},

]

const generateMockedData = (nbEmployees) =>{
  let out = [];
  for (let i = 0; i < nbEmployees; i++) {
    out.push(arrayOfEmployeesDataContents[i % arrayOfEmployeesDataContents.length]);
  }
  return out;
}

const EmployeeList = () => {
  // TODO : document.title dans un useEffect pour s'assurer du rendu du composant et donc affichage après rendu?
  document.title =   document.title = "HRnet | Employee List";
  
  const navigate = useNavigate();
  const {state, dispatch} = useContext(EmployeesDataContext);

  const { 
    employeesData,
  } = state;


  const [resetSettings, setResetSettings] = useState(false);

  const originalEmployeesData = useMemo(() => generateMockedData(51), []);


  const onResetSettings = useCallback(() => {
    setResetSettings(currentState => !currentState)
  }, [setResetSettings]);

  const setEmployeesData = useCallback((payload) => { dispatch({ type: "SET_EMPLOYEES_DATA", payload }) }, [dispatch]);
  
  const addEmployeeLink = () => {
    navigate('/employee-create');
  }

  useEffect(() => {
    setEmployeesData(originalEmployeesData)
  }, [setEmployeesData, originalEmployeesData])



  const onResetData = useCallback(() => {
    setEmployeesData(originalEmployeesData)
  },[setEmployeesData, originalEmployeesData]);




  return (
    <>
      <Header navigateButton_1='/employee-create' textButton_1='Create Employee' />
      <main className="main_wrapper">
        <h2 className="current-employee_page-title">Employee List</h2>

          <DataTable 
            headers={arrayOfEmployeesDataTitle} 
            data={employeesData}
            onResetData={onResetData}
            onResetSettings={onResetSettings}
            resetSettings={resetSettings}
            IconLeft={()=><CircleArrowLeft color1={'#1494B9'} color2={'#1494B9'} rayon={70}/>} //for future dev with background gradient on svg icon
            IconRight={()=><CircleArrowRight color1={'#1494B9'} color2={'#1494B9'} rayon={70} />} //for future dev with background gradient on svg icon
          />

          <SpheresButton 
            type="submit" 
            className="spheres-button_button" 
            onClick={addEmployeeLink} text="Add Employee" 
          />

      </main>
    </>
  );
};

export default EmployeeList;