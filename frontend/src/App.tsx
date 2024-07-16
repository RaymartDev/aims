import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Components/appLayout/Layout'
import Dashboard from './pages/Dashboard'
import Deliveries from './pages/Deliveries'
import Materials from './pages/Materials'
import Users from './pages/Users'

function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/deliveries" element={<Deliveries />} />
            <Route path="/materials" element={<Materials />} />
            <Route path="/users" element={<Users />} />
        </ Routes>
      </Layout>
    </ BrowserRouter>
  )
}

export default App
