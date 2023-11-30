import React from 'react';
<<<<<<< HEAD:sayo/src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './views/Navigation';
import Copyright from './views/Copyright';
import KaKaoHandeler from './views/AuthForm';
import PopUPModal from './views/PopUpModal';
=======
import Chat from "./views/Chat";
>>>>>>> origin/suchan:src/App.js

function App() {

  return (
    <div className="App" style={{ position: 'relative', minHeight: '100vh' }}>
      <Copyright/>
<<<<<<< HEAD:sayo/src/App.js
      <Navigation />
      <Router>
        <Routes>
          <Route path="/login/oauth2/callback/kakao" element={<KaKaoHandeler />} />
          <Route exact path="/" component={<PopUPModal/>} />
        </Routes>
      </Router>
=======
      
>>>>>>> origin/suchan:src/App.js
    </div>
  );
}

export default App;
