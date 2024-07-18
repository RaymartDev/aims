import { NavLink } from 'react-router-dom';
import { BarChart, ClipboardList, UsersRound } from 'lucide-react';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

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
          <Accordion type="single" collapsible>
              <AccordionItem value="item-2" >
                <AccordionTrigger className='mx-5'>
                  <div className='flex space-x-2 font-extrabold'>
                    <ClipboardList />
                    <span className="sm:hidden xl:inline">Inventory</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="my-0 py-0 border-b">
                    <NavLink to="/deliveries" className={({ isActive }) =>
                      `flex items-center transition duration-200 h-14 ${
                        isActive ? 'bg-hoverCream' : 'hover:bg-hoverCream'
                      }`
                    }>
                    <h1 className="mx-14 font-bold">Deliveries</h1>
                  </NavLink>
                </AccordionContent>
                <AccordionContent className="my-0 py-0">
                    <NavLink to="/materials" className={({ isActive }) =>
                        `flex items-center transition duration-200 h-14 ${
                          isActive ? 'bg-hoverCream' : 'hover:bg-hoverCream'
                        }`
                      }>
                      <h1 className="mx-14 font-bold">Materials</h1>
                    </NavLink>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
          <li>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-2" >
                <AccordionTrigger className='mx-5'>
                  <div className='flex space-x-2 font-extrabold'>
                    <UsersRound />
                    <span className="sm:hidden xl:inline">Users</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="my-0 py-0 border-b">
                    <NavLink to="/employee" className={({ isActive }) =>
                      `flex items-center transition duration-200 h-14 ${
                        isActive ? 'bg-hoverCream' : 'hover:bg-hoverCream'
                      }`
                    }>
                    <h1 className="mx-14 font-bold">Employee</h1>
                  </NavLink>
                </AccordionContent>
                <AccordionContent className="my-0 py-0">
                    <NavLink to="/supplier" className={({ isActive }) =>
                        `flex items-center transition duration-200 h-14 ${
                          isActive ? 'bg-hoverCream' : 'hover:bg-hoverCream'
                        }`
                      }>
                      <h1 className="mx-14 font-bold">Supplier</h1>
                    </NavLink>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
        </ul>
      </nav> 
      <Button className="absolute flex justify-start bottom-0 w-full rounded-none bg-white text-[#1A1C20] hover:text-white font-bold space-x-2 "><LogOut /><span>Logout</span>
      </Button>    
    </div>
  );
}

export default Sidebar;
