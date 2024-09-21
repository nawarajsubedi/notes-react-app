import React from 'react'; 
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import ConsoleLayout from '../layouts/ConsoleLayout';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Signup from '../pages/Signup';
import NotFound from '../pages/NotFound';
import Apps from '../pages/Notes';
import NoteEditor from '../pages/NoteEditor';

import AuthProvider from '../hooks/AuthProvider';

import '../App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
            <Route path="signup" element={<Signup />} />
            <Route path="not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Route>
          <Route path="console" element={<ConsoleLayout />}>
            <Route path="" element={<Apps />} />
            <Route path="notes" element={<Apps />} />
            <Route path="note-editor" element={<NoteEditor />} />
            <Route path="note-editor/:id" element={<NoteEditor />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
