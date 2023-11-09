import './App.css';
import Navigation from "./views/Navigation";
import Copyright from "./views/Copyright";
import React from 'react';

function App() {
  return (
    <div className="App" style={{ position: 'relative', minHeight: '100vh' }}>
      <Navigation />
      <Copyright/>
    </div>
  );
}

export default App;
