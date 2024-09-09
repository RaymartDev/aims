import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '@/pages/Login'
import Layout from '@/Components/appLayout/Layout'
import Dashboard from '@/pages/Dashboard'
import Inventory from '@/pages/Inventory'
import Deliveries from '@/pages/Deliveries'
import Materials from '@/pages/Materials'
import Employee from '@/pages/Employee'
import Store from '@/pages/Store'
import Supplier from '@/pages/Supplier'
import DeliveryOverview from '@/pages/Transactions'
import DeliveryReceipt from '@/pages/Release'
import AcknowledgementReceipt from '@/pages/Return'
import Company from '@/pages/Company'
import Department from '@/pages/Department'
import ChangePassword from '@/pages/ChangePassword'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />} >
            <Route path="/" element={<Dashboard />} />
          {/* Warehouse */}
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/deliveries" element={<Deliveries />} />
            <Route path="/materials" element={<Materials />} />
          {/* User */}
            <Route path="/employee" element={<Employee />} />
            <Route path="/store" element={<Store />} />
            <Route path="/supplier" element={<Supplier />} />
          {/* Order */}
            <Route path="/transactions" element={<DeliveryOverview />} />
            <Route path="/release" element={<DeliveryReceipt/>}/>
          {/* Return */}
            <Route path="/acknowledgement" element={<AcknowledgementReceipt />} />
          {/* Misc */}
            <Route path="/company" element={<Company />} />
            <Route path="/department" element={<Department />} />
          {/*Settings */}
            <Route path='/changepassword' element={<ChangePassword/>}/>
          </Route>
      </ Routes>
    </ BrowserRouter>
  )
}

export default App
