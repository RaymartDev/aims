import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Truck, Package, User2 } from 'lucide-react';

function Sidebar() {
  return (
    <div className="h-screen text-black sm:w-20 xl:w-64 border-r border-black">
      <div className="p-6">
        <h1 className="text-2xl font-extrabold w-full flex items-center justify-center font-montserrat">KFC Inventory</h1>
      </div>
      <nav className="mt-10">
        <ul>
          <li>
            <NavLink to="/dashboard" className={({ isActive }) =>
                `flex items-center sm:justify-center xl:justify-start py-2.5 px-4 h-16 rounded transition duration-200 font-extrabold space-x-2 text-fontGray ${
                  isActive ? 'bg-hoverCream': 'hover:bg-hoverCream' 
                }`
              }>
              <LayoutDashboard />
              <h1 className="sm:hidden xl:inline">Dashboard</h1>
            </NavLink>
          </li>
          <li>
            <NavLink to="/deliveries" className={({ isActive }) =>
                `flex items-center sm:justify-center xl:justify-start py-2.5 px-4 h-16 rounded transition duration-200 font-extrabold space-x-2 text-fontGray ${
                  isActive ? 'bg-hoverCream' : 'hover:bg-hoverCream'
                }`
              }>
              <Truck />
              <h1 className="sm:hidden xl:inline">Deliveries</h1>
            </NavLink>
          </li>
          <li>
            <NavLink to="/materials" className={({ isActive }) =>
                `flex items-center sm:justify-center xl:justify-start py-2.5 px-4 h-16 rounded transition duration-200 font-extrabold space-x-2 text-fontGray ${
                  isActive ? 'bg-hoverCream' : 'hover:bg-hoverCream'
                }`
              }>
              <Package />
              <h1 className="sm:hidden xl:inline">Materials</h1>
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" className={({ isActive }) =>
                `flex items-center sm:justify-center xl:justify-start py-2.5 px-4 h-16 rounded transition duration-200 font-extrabold space-x-2 text-fontGray ${
                  isActive ? 'bg-hoverCream' : 'hover:bg-hoverCream'
                }`
              }>
              <User2 />
              <h1 className="sm:hidden xl:inline">Users</h1>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
