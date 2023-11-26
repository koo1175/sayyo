import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './views/Navigation';
import Copyright from './views/Copyright';
import KaKaoHandeler from './views/AuthForm';
import PopUPModal from './views/PopUpModal';

function App() {
  return (
    <div className="App" style={{ position: 'relative', minHeight: '100vh' }}>
      <Copyright/>
      <Navigation />
      <Router>
        <Routes>
          <Route path="/login/oauth2/callback/kakao" element={<KaKaoHandeler />} />
          <Route exact path="/" component={<PopUPModal/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
