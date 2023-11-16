import { Routes, Route, Navigate, NavLink } from 'react-router-dom'
import Customers from './pages/Customers'
import Trainings from './pages/Trainings'
import Calendar from './pages/Calendar'
import Statistics from './pages/Statistics'
import './Index.css'

function App() {
  return (
    <div>
      <nav className='navbar'>
        <NavLink to="/customers" activeclassname="active">Customers</NavLink>
        <NavLink to="/trainings" activeclassname="active">Trainings</NavLink>
        <NavLink to="/calendar" activeclassname="active">Calendar</NavLink>
        <NavLink to="/statistics" activeclassname="active">Statistics</NavLink>
      </nav>
      <main>
      <Routes>
        <Route path="/" element={<Navigate to="/customers" replace />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/trainings" element={<Trainings />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
      </main>
    </div>
  );
};

export default App
