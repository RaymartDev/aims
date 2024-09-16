/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState } from "react";
import KFC from "../../images/KFC_LOGO.png";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BarChart,
  Warehouse,
  UsersRound,
  Settings,
  LogOut,
  Truck,
  Boxes,
  UserRound,
  Store,
  Container,
  UserRoundCog,
  Building2,
  Briefcase,
  Archive,
  Package,
  ReceiptText,
  Undo2,
  ArrowRightLeft,
  ClipboardPaste,
  ClipboardCopy,
  KeyRound,
  BoxesIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useAppDispatch } from "@/store/store";
import { logout } from "@/slices/userSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { getVersion } from "@/lib/utils";

function Sidebar() {
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${getVersion()}/user/logout`);
      if (response.status >= 200 && response.status < 300) {
        toast.success("Successfully logged out");
        setTimeout(() => {
          dispatch(logout());
        }, 700);
      }
    }  catch (err) {
      if (axios.isAxiosError(err)) {
          toast.error(err.response?.data?.message || 'Something went wrong');
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="h-screen relative sm:w-20 xl:w-64 border-r border-black">
      <div onClick={() => navigate('/')} className="cursor-pointer flex p-6 space-x-2">
        <img src={KFC} className="h-12 block" />
        <h1 className="text-center text-2xl text-black font-extrabold w-full items-center justify-center font-montserrat hidden xl:block">
          Asset Inventory
        </h1>
      </div>
      <nav className="mt-10">
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center sm:justify-center xl:justify-start py-2.5 px-4 h-12 transition duration-200 font-extrabold space-x-2  ${
                  isActive ? "bg-hoverCream" : "hover:bg-hoverCream"
                }`
              }
            >
              <BarChart />
              <h1 className="sm:hidden xl:inline">Dashboard</h1>
            </NavLink>
          </li>

          {/* Inventory */}
          <li>
            <Accordion
              type="single"
              collapsible
              value={openItem}
              onValueChange={(value) => setOpenItem(value)}
            >
              <AccordionItem value="inventory">
                <AccordionTrigger className="mx-5 h-12">
                  <div className="flex space-x-2 font-extrabold">
                    <Warehouse />
                    <span className="sm:hidden xl:inline">Warehouse</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="my-0 py-0 border-b">
                  <NavLink
                    to="/inventory"
                    className={({ isActive }) =>
                      `flex items-center transition duration-200 h-12 ${
                        isActive ? "bg-hoverCream" : "hover:bg-hoverCream"
                      }`
                    }
                  >
                    <div className="xl:mx-14 sm:mx-0 xl:text-sm sm:text-[12px] font-bold flex justify-center items-center space-x-2">
                      <Archive className="sm:hidden xl:inline"/>
                      <span>Inventory</span>
                    </div>
                  </NavLink>
                </AccordionContent>
                <AccordionContent className="my-0 py-0 border-b">
                  <NavLink
                    to="/deliveries"
                    className={({ isActive }) =>
                      `flex items-center transition duration-200 h-12 ${
                        isActive ? "bg-hoverCream" : "hover:bg-hoverCream"
                      }`
                    }
                  >
                    <div className="xl:mx-14 sm:mx-0 xl:text-sm sm:text-[12px] font-bold flex justify-center items-center space-x-2">
                      <Truck className="sm:hidden xl:inline"/>
                      <span >Deliveries</span>
                    </div>
                  </NavLink>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>

          {/* Materials */}
          <li>
            <Accordion
              type="single"
              collapsible
              value={openItem}
              onValueChange={(value) => setOpenItem(value)}
            >
              <AccordionItem value="materials">
                <AccordionTrigger className="mx-5 h-12">
                  <div className="flex space-x-2 font-extrabold">
                    <BoxesIcon />
                    <span className="sm:hidden xl:inline">Materials</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="my-0 py-0 border-b">
                  <NavLink
                    to="/materials"
                    className={({ isActive }) =>
                      `flex items-center transition duration-200 h-12 ${
                        isActive ? "bg-hoverCream" : "hover:bg-hoverCream"
                      }`
                    }
                  >
                    <div className="xl:mx-14 sm:mx-0 xl:text-sm sm:text-[12px] font-bold flex justify-center items-center space-x-2">
                      <Archive className="sm:hidden xl:inline"/>
                      <span>Products</span>
                    </div>
                  </NavLink>
                </AccordionContent>
                <AccordionContent className="my-0 py-0 border-b">
                  <NavLink
                    to="/category"
                    className={({ isActive }) =>
                      `flex items-center transition duration-200 h-12 ${
                        isActive ? "bg-hoverCream" : "hover:bg-hoverCream"
                      }`
                    }
                  >
                    <div className="xl:mx-14 sm:mx-0 xl:text-sm sm:text-[12px] font-bold flex justify-center items-center space-x-2">
                      <Truck className="sm:hidden xl:inline"/>
                      <span>Category</span>
                    </div>
                  </NavLink>
                </AccordionContent>
                <AccordionContent className="my-0 py-0">
                  <NavLink
                    to="/types"
                    className={({ isActive }) =>
                      `flex items-center transition duration-200 h-12 ${
                        isActive ? "bg-hoverCream" : "hover:bg-hoverCream"
                      }`
                    }
                  >
                    <div className="xl:mx-14 sm:mx-0 xl:text-sm sm:text-[12px] font-bold flex justify-center items-center space-x-2">
                      <Boxes className="sm:hidden xl:inline"/>
                      <span>Types</span>
                    </div>
                  </NavLink>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
          
          {/* Users */}
          <li>
            <Accordion
              type="single"
              collapsible
              value={openItem}
              onValueChange={(value) => setOpenItem(value)}
            >
              <AccordionItem value="users">
                <AccordionTrigger className="mx-5 h-12">
                  <div className="flex space-x-2 font-extrabold">
                    <UsersRound />
                    <span className="sm:hidden xl:inline">Users</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="my-0 py-0 border-b">
                  <NavLink
                    to="/employee"
                    className={({ isActive }) =>
                      `flex items-center transition duration-200 h-12 ${
                        isActive ? "bg-hoverCream" : "hover:bg-hoverCream"
                      }`
                    }
                  >
                    <div className="xl:mx-14 sm:mx-0 xl:text-sm sm:text-[12px] font-bold flex justify-center items-center space-x-2">
                      <UserRound className="sm:hidden xl:inline"/>
                      <span>Employee</span>
                    </div>
                  </NavLink>
                </AccordionContent>
                <AccordionContent className="my-0 py-0 border-b">
                  <NavLink
                    to="/store"
                    className={({ isActive }) =>
                      `flex items-center transition duration-200 h-12 ${
                        isActive ? "bg-hoverCream" : "hover:bg-hoverCream"
                      }`
                    }
                  >
                    <div className="xl:mx-14 sm:mx-0 xl:text-sm sm:text-[12px] font-bold flex justify-center items-center space-x-2">
                      <Store className="sm:hidden xl:inline"/>
                      <span>Store</span>
                    </div>
                  </NavLink>
                </AccordionContent>
                <AccordionContent className="my-0 py-0">
                  <NavLink
                    to="/supplier"
                    className={({ isActive }) =>
                      `flex items-center transition duration-200 h-12 ${
                        isActive ? "bg-hoverCream" : "hover:bg-hoverCream"
                      }`
                    }
                  >
                    <div className="xl:mx-14 sm:mx-0 xl:text-sm sm:text-[12px] font-bold flex justify-center items-center space-x-2">
                      <Container className="sm:hidden xl:inline"/>
                      <span>Supplier</span>
                    </div>
                  </NavLink>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>

          {/* Order */}
          <li>
            <Accordion
              type="single"
              collapsible
              value={openItem}
              onValueChange={(value) => setOpenItem(value)}
            >
              <AccordionItem value="order">
                <AccordionTrigger className="mx-5 h-12">
                  <div className="flex space-x-2 font-extrabold">
                    <Package />
                    <span className="sm:hidden xl:inline">Order</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="my-0 py-0 border-b">
                  <NavLink
                    to="/release"
                    className={({ isActive }) =>
                      `flex items-center transition duration-200 h-12 ${
                        isActive ? "bg-hoverCream" : "hover:bg-hoverCream"
                      }`
                    }
                  >
                    <div className="xl:mx-14 sm:mx-0 xl:text-sm sm:text-[12px] font-bold flex justify-center items-center space-x-2">
                      <ReceiptText className="sm:hidden xl:inline"/>
                      <span>Release</span>
                    </div>
                  </NavLink>
                </AccordionContent>
                <AccordionContent className="my-0 py-0 border-b">
                  <NavLink
                    to="/acknowledgement"
                    className={({ isActive }) =>
                      `flex items-center transition duration-200 h-12 ${
                        isActive ? "bg-hoverCream" : "hover:bg-hoverCream"
                      }`
                    }
                  >
                    <div className="xl:mx-14 sm:mx-0 xl:text-sm sm:text-[12px] font-bold flex justify-center items-center space-x-2">
                      <Undo2 className="sm:hidden xl:inline"/>
                      <span>Return</span>
                    </div>
                  </NavLink>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>

          {/* Transactions */}
          <li>
            <Accordion
              type="single"
              collapsible
              value={openItem}
              onValueChange={(value) => setOpenItem(value)}
            >
              <AccordionItem value="transactions">
                <AccordionTrigger className="mx-5 h-12">
                  <div className="flex space-x-2 font-extrabold">
                    <ArrowRightLeft />
                    <span className="sm:hidden xl:inline">Transactions</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="my-0 py-0 border-b">
                  <NavLink
                    to="/releasereport"
                    className={({ isActive }) =>
                      `flex items-center transition duration-200 h-12 ${
                        isActive ? "bg-hoverCream" : "hover:bg-hoverCream"
                      }`
                    }
                  >
                    <div className="xl:mx-14 sm:mx-0 xl:text-sm sm:text-[12px] font-bold flex justify-center items-center space-x-2">
                      <ClipboardPaste className="sm:hidden xl:inline"/>
                      <span>Release Report</span>
                    </div>
                  </NavLink>
                </AccordionContent>
                <AccordionContent className="my-0 py-0 border-b">
                  <NavLink
                    to="/returnreport"
                    className={({ isActive }) =>
                      `flex items-center transition duration-200 h-12 ${
                        isActive ? "bg-hoverCream" : "hover:bg-hoverCream"
                      }`
                    }
                  >
                    <div className="xl:mx-14 sm:mx-0 xl:text-sm sm:text-[12px] font-bold flex justify-center items-center space-x-2">
                      <ClipboardCopy className="sm:hidden xl:inline"/>
                      <span>Return Report</span>
                    </div>
                  </NavLink>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>

          {/* Misc */}
          <li>
            <Accordion
              type="single"
              collapsible
              value={openItem}
              onValueChange={(value) => setOpenItem(value)}
            >
              <AccordionItem value="misc">
                <AccordionTrigger className="mx-5 h-12">
                  <div className="flex space-x-2 font-extrabold">
                    <UserRoundCog />
                    <span className="sm:hidden xl:inline">Miscellaneous</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="my-0 py-0 border-b">
                  <NavLink
                    to="/company"
                    className={({ isActive }) =>
                      `flex items-center transition duration-200 h-12 ${
                        isActive ? "bg-hoverCream" : "hover:bg-hoverCream"
                      }`
                    }
                  >
                    <div className="xl:mx-14 sm:mx-0 xl:text-sm sm:text-[12px] font-bold flex justify-center items-center space-x-2">
                      <Building2 className="sm:hidden xl:inline"/>
                      <span>Company</span>
                    </div>
                  </NavLink>
                </AccordionContent>
                <AccordionContent className="my-0 py-0 border-b">
                  <NavLink
                    to="/department"
                    className={({ isActive }) =>
                      `flex items-center transition duration-200 h-12 ${
                        isActive ? "bg-hoverCream" : "hover:bg-hoverCream"
                      }`
                    }
                  >
                    <div className="xl:mx-14 sm:mx-0 xl:text-sm sm:text-[10px] font-bold flex justify-center items-center space-x-2">
                      <Briefcase className="sm:hidden xl:inline"/>
                      <span>Department</span>
                    </div>
                  </NavLink>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>

          {/* Settings */}
          <li>
            <Accordion
              type="single"
              collapsible
              value={openItem}
              onValueChange={(value) => setOpenItem(value)}
            >
              <AccordionItem value="settings">
                <AccordionTrigger className="mx-5">
                  <div className="flex space-x-2 font-extrabold">
                    <Settings />
                    <span className="sm:hidden xl:inline">Settings</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="my-0 py-0 border-b">
                  <NavLink
                    to="/changepassword"
                    className={({ isActive }) =>
                      `flex items-center transition duration-200 h-14 ${
                        isActive ? "bg-hoverCream" : "hover:bg-hoverCream"
                      }`
                    }
                  >
                    <div className="xl:mx-14 sm:mx-0 xl:text-sm sm:text-[12px] font-bold flex justify-center items-center space-x-2">
                      <KeyRound className="sm:hidden xl:inline"/>
                      <span>Password</span>
                    </div>
                  </NavLink>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
        </ul>
      </nav>
      <Button
        onClick={(e) => handleLogout(e)}
        className="absolute flex justify-start bottom-5 h-12 w-full rounded-none bg-white text-[#1A1C20] font-bold space-x-2 hover:bg-hoverCream"
      >
        <LogOut />
        <span className="sm:hidden xl:inline">Logout</span>
      </Button>
    </div>
  );
}

export default Sidebar;
