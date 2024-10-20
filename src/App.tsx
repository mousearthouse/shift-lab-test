import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import AuthPage from './AuthPage';

const App: React.FC = () => {
  const [token, setToken] = useState<string>('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage setToken={setToken}/>} />
        
        <Route path="/profile" element={<ProfilePage token={token} />} />
      </Routes>
    </Router>
  );
};

export default App;