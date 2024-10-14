import { AuthProvider, useAuth } from './context/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Tasks from './components/Tasks/Tasks';
import Login from './components/Auth/Login';
import LogoutButton from './components/Auth/Logout';
import Register from './components/Auth/Register';
import NotFound from './components/NotFound/NotFound';
import './App.css';
import axios from 'axios';

axios.defaults.withCredentials = true;

const AppContent = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <TaskProvider>
          <Tasks />
        </TaskProvider>
      </div>
      <div className="flex justify-center mb-4">
        <LogoutButton />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
