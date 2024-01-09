import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const clickCreateEmployee = () => {
    navigate ('/create-employee');
  }

  return (
    <div>
      <h1 onClick={clickCreateEmployee}>Home</h1>
    </div>
  );
};

export default Home;