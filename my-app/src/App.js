import './App.css';
import MapComponent from './Map';
import Gyeonggi from './Gyeonggi';
import AboutUs from './AboutUs';
import Community from './Community';
import OrganizationChart from './OrganizationChart';
import Politician from './Politician';
import React from 'react';
import Board from './Board';
import Navigation from './Navigation';
import Search from './Search';
import Test from './Test';
import Test2 from './Test2';
import BoardList from './Test5';
import Chat from './Chat';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';


function App() {
  return (
    <Router>
      <Navigation />
      {/* <Chat /> */}
      <Routes>
      <Route path="/" element={<BoardList/>} />
      <Route path="/Test" element={<Test />} />
      <Route path="/Search" element={<Search />} />
      <Route path="/Gyeonggi" element={<Gyeonggi />} />
      <Route path="/Map" element={<MapComponent />} />
      <Route path="/Board" element={<Board />} />
      <Route path="/Politician" element={<Politician />} />
      <Route path="/AboutUs" element={<AboutUs />} />
      <Route path="/Community" element={<Community />} />
      <Route path="/OrganizationChart" element={<OrganizationChart />} />
    </Routes>
  </Router>
  );
}

export default App;
