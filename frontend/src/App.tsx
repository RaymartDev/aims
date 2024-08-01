import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '@/pages/Login'
import Dashboard from './pages/Dashboard'
import InventoryOverview from './pages/InventoryOverview'
import Deliveries from './pages/Deliveries'
import Materials from './pages/Materials'
import Employee from './pages/Employee'
import Store from './pages/Store'
import Supplier from './pages/Supplier'
import Layout from './Components/appLayout/Layout'
import ChangePassword from './pages/ChangePassword'
import Company from './pages/Company'
import Department from './pages/Department'
import DeliveryReceipt from './pages/DeliveryReceipt'

import Modal from './modals/POSModal'

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Layout />} >
            <Route path="/dashboard" element={<Dashboard />} />
          {/* Inventory */}
            <Route path="/inventory/overview" element={<InventoryOverview />} />
            <Route path="/deliveries" element={<Deliveries />} />
            <Route path="/materials" element={<Materials />} />
            <Route path="/delivery-receipt" element={<DeliveryReceipt/>}/>
          {/* User */}
            <Route path="/employee" element={<Employee />} />
            <Route path="/store" element={<Store />} />
            <Route path="/supplier" element={<Supplier />} />
          {/* Misc */}
            <Route path="/company" element={<Company />} />
            <Route path="/department" element={<Department />} />
          {/*Settings */}
          <Route path='/changepassword' element={<ChangePassword/>}/>
          <Route path='/modals' element={<Modal/>}/>
          </Route>
      </ Routes>
    </ BrowserRouter>
  )
}

export default App
