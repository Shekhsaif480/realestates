
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import bg from "./imgs/bg.png"


function App() {

  return (
    <div style={{ backgroundImage: `url(${bg})`,height:"100vh",backgroundSize:"cover",backgroundRepeat:"no-repeat"}}>
    <Navbar/>
    </div>
  );
}

export default App;
