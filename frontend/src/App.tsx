import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '@/pages/Login'
import Dashboard from './pages/Dashboard'
import Deliveries from './pages/Deliveries'
import Materials from './pages/Materials'
import Employee from './pages/Employee'
import Store from './pages/Store'
import Supplier from './pages/Supplier'
import SelectMaterials from './modals/SelectMaterial'

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        {/* Inventory */}
          <Route path="/deliveries" element={<Deliveries />} />
          <Route path="/materials" element={<Materials />} />
        {/* User */}
          <Route path="/employee" element={<Employee />} />
          <Route path="/store" element={<Store />} />
          <Route path="/supplier" element={<Supplier />} />
          <Route path='/modal' element={<SelectMaterials/>}/>
      </ Routes>
    </ BrowserRouter>
  )
}

export default App
