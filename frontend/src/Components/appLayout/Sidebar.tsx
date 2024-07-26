import { useState } from 'react';
import KFC from '../../images/KFC_LOGO.png';
import { NavLink } from 'react-router-dom';
import { BarChart, ClipboardList, UsersRound, Settings, LogOut, Truck, Boxes, UserCog, Store, Container } from 'lucide-react';
import { Button } from '../ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

function Sidebar() {
  const [openItem, setOpenItem] =  useState<string | undefined>(undefined);

  return (
    <div className="h-screen relative sm:w-20 xl:w-64 border-r border-black">
      <div className="flex p-6 space-x-2">
        <img src={KFC} className="h-12 block lg:hidden" />
        <h1 className="text-2xl text-black font-extrabold w-full items-center justify-center font-montserrat hidden lg:block">KFC Inventory</h1>
      </div>
      <nav className="mt-10">
        <ul>
          <li>
            <NavLink to="/overview" className={({ isActive }) =>
                `flex items-center sm:justify-center xl:justify-start py-2.5 px-4 h-12 transition duration-200 font-extrabold space-x-2  ${
                  isActive ? 'bg-hoverCream': 'hover:bg-hoverCream' 
                }`
              }>
              <BarChart />
              <h1 className="sm:hidden xl:inline">Overview</h1>
            </NavLink>
          </li>

          {/* Inventory */}
          <li>
          <Accordion type="single" collapsible value={openItem} onValueChange={(value) => setOpenItem(value)}>
              <AccordionItem value="inventory">
                <AccordionTrigger className='mx-5 h-12'>
                  <div className='flex space-x-2 font-extrabold'>
                    <ClipboardList />
                    <span className="sm:hidden xl:inline">Inventory</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="my-0 py-0 border-b">
                    <NavLink to="/deliveries" className={({ isActive }) =>
                      `flex items-center transition duration-200 h-12 ${
                        isActive ? 'bg-hoverCream' : 'hover:bg-hoverCream'
                      }`
                    }>
                    <div className="mx-14 font-bold flex justify-center items-center space-x-2"><Truck /><span>Deliveries</span></div>
                  </NavLink>
                </AccordionContent>
                <AccordionContent className="my-0 py-0">
                    <NavLink to="/materials" className={({ isActive }) =>
                        `flex items-center transition duration-200 h-12 ${
                          isActive ? 'bg-hoverCream' : 'hover:bg-hoverCream'
                        }`
                      }>
                      <div className="mx-14 font-bold flex justify-center items-center space-x-2"><Boxes /><span>Materials</span></div>
                    </NavLink>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>

          {/* Users */}
          <li>
            <Accordion type="single" collapsible value={openItem} onValueChange={(value) => setOpenItem(value)}>
              <AccordionItem value="users">
                <AccordionTrigger className='mx-5 h-12'>
                  <div className='flex space-x-2 font-extrabold'>
                    <UsersRound />
                    <span className="sm:hidden xl:inline">Users</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="my-0 py-0 border-b">
                    <NavLink to="/employee" className={({ isActive }) =>
                      `flex items-center transition duration-200 h-12 ${
                        isActive ? 'bg-hoverCream' : 'hover:bg-hoverCream'
                      }`
                    }>
                    <div className="mx-14 font-bold flex justify-center items-center space-x-2"><UserCog/><span>Employee</span></div>
                  </NavLink>
                </AccordionContent>
                <AccordionContent className="my-0 py-0 border-b">
                    <NavLink to="/store" className={({ isActive }) =>
                      `flex items-center transition duration-200 h-12 ${
                        isActive ? 'bg-hoverCream' : 'hover:bg-hoverCream'
                      }`
                    }>
                    <div className="mx-14 font-bold flex justify-center items-center space-x-2"><Store /><span>Store</span></div>
                  </NavLink>
                </AccordionContent>
                <AccordionContent className="my-0 py-0">
                    <NavLink to="/supplier" className={({ isActive }) =>
                        `flex items-center transition duration-200 h-12 ${
                          isActive ? 'bg-hoverCream' : 'hover:bg-hoverCream'
                        }`
                      }>
                      <div className="mx-14 font-bold flex justify-center items-center space-x-2"><Container /><span>Supplier</span></div>
                    </NavLink>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>

          {/* Settings */}
          <li>
            <Accordion type="single" collapsible value={openItem} onValueChange={(value) => setOpenItem(value)}>
                <AccordionItem value="settings">
                  <AccordionTrigger className='mx-5'>
                    <div className='flex space-x-2 font-extrabold'>
                      <Settings />
                      <span className="sm:hidden xl:inline">Settings</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="my-0 py-0 border-b">
                      <NavLink to="/employee" className={({ isActive }) =>
                        `flex items-center transition duration-200 h-14 ${
                          isActive ? 'bg-hoverCream' : 'hover:bg-hoverCream'
                        }`
                      }>
                      <h1 className="mx-14 font-bold">Edit Profile</h1>
                    </NavLink>
                  </AccordionContent>
                  <AccordionContent className="my-0 py-0 border-b">
                      <NavLink to="/changepassword" className={({ isActive }) =>
                        `flex items-center transition duration-200 h-14 ${
                          isActive ? 'bg-hoverCream' : 'hover:bg-hoverCream'
                        }`
                      }>
                      <h1 className="mx-14 font-bold">Change Password</h1>
                    </NavLink>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
          </li>
        </ul>
      </nav> 
      <Button className="absolute flex justify-start bottom-5 h-12 w-full rounded-none bg-white text-[#1A1C20] hover:text-white font-bold space-x-2 ">
        <LogOut /><span className="sm:hidden xl:inline">Logout</span>
      </Button>    
    </div>
  );
}

export default Sidebar;
