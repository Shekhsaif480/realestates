import './App.css';
import Navbar from './Components/Navbar/Navbar';
import bg from "./imgs/bg.png";
import PropertiesDisplayPage from '../src/Components/Properties/PropertiesDisplayPage';
import PropertyDetail from './Components/Properties/PropertyDetail';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hero from './Components/Hero/Hero';
import PropertySlider from './Components/Slider/PropertiesSliderPage';

const Home = () => {
  return (
    <div style={{ backgroundImage: `url(${bg})`, height: "auto", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
      <Navbar />
      <Hero/>
      <PropertySlider/>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Properties" element={<PropertiesDisplayPage />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
