import { Route, Routes } from 'react-router-dom';
import Dashboard from './app/components/adminPanel/Dashboard';
import Students from './app/components/adminPanel/Students';
import Tutors from './app/components/adminPanel/Tutors';
import Signup from './app/components/Signup';
import UserDashboard from './app/components/userPanel/UserDashboard';
import Tutor from './app/components/userPanel/Tutor';
import Books from './app/components/userPanel/Books';
import UserLayout from './app/components/userPanel/Layout';
import Navbar from './app/components/Navbar';
import Login from './app/components/Login';
import LandingPage from './app/LandingPage';
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback="">
      <Routes>
        <Route path="/user/" element={<UserLayout />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="tutor" element={<Tutor />} />
          <Route path="library" element={<Books />} />
        </Route>
        <Route path="/admin/" element={<Navbar />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tutors" element={<Tutors />} />
          <Route path="library" element={<Students />} />
        </Route>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Suspense>
  );
}

export { App };
