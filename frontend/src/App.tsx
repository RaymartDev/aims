import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '@/pages/Login'
import Dashboard from './pages/Dashboard'
import Deliveries from './pages/Deliveries'
import Materials from './pages/Materials'
import Employee from './pages/Employee'
import Supplier from './pages/Supplier'

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/deliveries" element={<Deliveries />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/supplier" element={<Supplier />} />
      </ Routes>
    </ BrowserRouter>
  )
}

export default App
