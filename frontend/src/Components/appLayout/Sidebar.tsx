import { NavLink } from 'react-router-dom';
import { BarChart, ClipboardList, UsersRound, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';

function Sidebar() {

  return (
    <div className="h-screen relative sm:w-20 xl:w-64 border-r border-black">
      <div className="p-6">
        <h1 className="text-2xl text-black font-extrabold w-full flex items-center justify-center font-montserrat">KFC Inventory</h1>
      </div>
      <nav className="mt-10">
        <ul>
          <li>
            <NavLink to="/dashboard" className={({ isActive }) =>
                `flex items-center sm:justify-center xl:justify-start py-2.5 px-4 h-16 rounded transition duration-200 font-extrabold space-x-2  ${
                  isActive ? 'bg-hoverCream': 'hover:bg-hoverCream' 
                }`
              }>
              <BarChart />
              <h1 className="sm:hidden xl:inline">Overview</h1>
            </NavLink>
          </li>
          <li>
            <NavLink to="/deliveries" className={({ isActive }) =>
                `flex items-center sm:justify-center xl:justify-start py-2.5 px-4 h-16 rounded transition duration-200 font-extrabold space-x-2  ${
                  isActive ? 'bg-hoverCream' : 'hover:bg-hoverCream'
                }`
              }>
              <ClipboardList />
              <h1 className="sm:hidden xl:inline">Inventory</h1>  
            </NavLink>
          </li>
          <li>
            <NavLink to="/materials" className={({ isActive }) =>
                `flex items-center sm:justify-center xl:justify-start py-2.5 px-4 h-16 rounded transition duration-200 font-extrabold space-x-2  ${
                  isActive ? 'bg-hoverCream' : 'hover:bg-hoverCream'
                }`
              }>
              <Settings />
              <h1 className="sm:hidden xl:inline">Settings</h1>
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" className={({ isActive }) =>
                `flex items-center sm:justify-center xl:justify-start py-2.5 px-4 h-16 rounded transition duration-200 font-extrabold space-x-2  ${
                  isActive ? 'bg-hoverCream' : 'hover:bg-hoverCream'
                }`
              }>
              <UsersRound />
              <h1 className="sm:hidden xl:inline">Users</h1>
            </NavLink>
          </li>
        </ul>
      </nav> 
      <Button className="absolute flex justify-start bottom-0 w-full rounded-none bg-white text-[#1A1C20] hover:text-white font-bold space-x-2 "><LogOut /><span>Logout</span>
      </Button>    
    </div>
  );
}

export default Sidebar;
