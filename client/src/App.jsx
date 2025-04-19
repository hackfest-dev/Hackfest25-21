import React from 'react'
import Login from './pages/login/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile/Profile'
import ChatBot from './pages/chat/ChatBot';
import Records from './pages/records/Records';
import Permissions from './pages/permissions/Permissions';
import Dashboard from './pages/dashboard/Dashboard';
import Home from './pages/home/Home';
import Private from './components/Private';

const App = () => {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="permissions"  element={<Permissions />} />
            <Route path="records" element={<Records />} />
            <Route path="chat" element={<ChatBot />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App