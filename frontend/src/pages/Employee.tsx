/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { MoreHorizontal, Plus, Search, Pencil, Trash } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger  } from "@/Components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import AddEmployeeModal from "@/modals/AddEmployeeModal";
import UserRegistration from "@/modals/UserRegistration";
import EditEmployeeModal from "@/modals/EditEmployeeModal";
import ViewEmployeeModal from "@/modals/ViewEmployeeModal";
import DeleteConfirmation from "@/modals/DeleteConfirmation";
import SearchEmployeeModal from "@/modals/SearchEmployeeModal";
import type EmployeeType from "@/interface/employee";
import { fetchData, formatDateAsString, getVersion } from "@/lib/utils";
import { useAppDispatch } from "@/store/store";
import { logout } from "@/slices/userSlice";


function Employee() {
    const [employees, setEmployees] = useState<EmployeeType[]>([]);
    const [editEmployee, setEditEmployee] = useState<EmployeeType | null>(null);
    const [regEmployee, setRegEmployee] = useState<EmployeeType | null>(null);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openUserRegModal, setOpenUserRegModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openSearchModal, setOpenSearchModal] = useState(false);
    const [searchEmployee, setSearchEmployee] = useState<EmployeeType | null>(null);
    const [viewEmployee, setViewEmployee] = useState<EmployeeType | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const [filteredEmployees, setFilteredEmployees] = useState<EmployeeType[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const itemsPerPage = 17;
    const dispatch = useAppDispatch();

    const loadEmployees = useCallback(() => {
        fetchData({
          url: `${getVersion()}/employee/list`,
          query: { limit: itemsPerPage, page: currentPage },
          onSuccess: (data) => {
            setEmployees(data.employees);
            setMaxPage(data.misc.maxPage);
          },
          dispatch,
          logout: () => dispatch(logout())
        });
      }, [itemsPerPage, currentPage, dispatch]);
    
      useEffect(() => {
        loadEmployees();
      }, [loadEmployees]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredEmployees([]); 
        } else {
            const filtered = employees.filter((employee) =>
                employee.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                employee.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                employee.employee_no.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredEmployees(filtered.slice(0, 10));
        }
    }, [searchQuery, employees]);

    const handleSelectEmployee = (employee: EmployeeType) => {
        setSearchEmployee(employee);
        setOpenSearchModal(true);
        setSearchQuery("");
        setFilteredEmployees([]);
    };

    const updateEmployee = (updatedEmployee: EmployeeType | null) => {
        if (updatedEmployee) {
            setEmployees(prevEmployees =>
                prevEmployees.map(employee =>
                    employee.id === updatedEmployee.id ? updatedEmployee : employee
                )
            );
            setEditEmployee(null);
        }
      };

    const registerEmployee = (id: number) => {
        setEmployees(prevEmployees => 
          prevEmployees.map(employee => 
            employee.id === id 
              ? { ...employee, registered_status: true }  // Create a new object with the updated field
              : employee  // Return the original object if no changes are needed
          )
        );
        setRegEmployee(null);
      };

      const addEmployee = (employee: EmployeeType | null) => {
        if (employee) {
            setEmployees(prevEmployees => [...prevEmployees, employee]);
        }
      };

    return(
        <>
            <div className="flex flex-col h-full">
                <div className="flex flex-col h-full relative">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">Employee</h1>
                        <p className="text-sm font-semibold text-[#9E9E9E]">Users / Employee</p>
                    </div>
                    <div className="flex justify-center mt-10">
                        <div className="flex flex-row justify-between w-full">
                            <div className="w-fit flex items-center justify-start ">
                                <h1 className=" text-fontHeading font-bold">All Employee</h1>
                            </div>
                            <div className="flex flex-row w-6/12 space-x-2">
                                <div className="relative w-10/12 ">
                                    <Input
                                        type="search"
                                        placeholder="Search Employee Name / Number"
                                        className="pl-12 border-2 focus:border-none"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    {filteredEmployees.length > 0 && (
                                        <div className="absolute bg-white border border-gray-300 mt-1 w-full z-10 max-h-40 overflow-y-auto text-sm">
                                            {filteredEmployees.map((employee) => (
                                                <div
                                                    key={employee.id}
                                                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                                    onClick={() => handleSelectEmployee(employee)}
                                                >
                                                    {employee.first_name} {employee.last_name} - {employee.employee_no}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>   
                                <Button className="bg-hoverCream text-fontHeading border hover:text-white font-semibold w-40" 
                                    onClick={() => setOpenAddModal(true)}>
                                    <Plus size={20}/><span className="text-sm">Add Employee</span>
                                </Button>
                            </div>    
                        </div>
                    </div>
                    <div className="mt-5 overflow-y-auto overflow-x-auto" style={{ maxHeight: `calc(100vh - ${70 + 270}px)` }}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee Number</TableHead>
                                    <TableHead>First Name</TableHead>
                                    <TableHead>Last Name</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Cost Code</TableHead>
                                    <TableHead>Division</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Date Hired</TableHead>
                                    <TableHead>Registered Status</TableHead>
                                    <TableHead>Active Status</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {employees.map(employee => (
                                    <TableRow key={employee.id}>
                                        <TableCell>{employee.employee_no}</TableCell>
                                        <TableCell>{employee.first_name}</TableCell>
                                        <TableCell>{employee.last_name}</TableCell>
                                        <TableCell>{employee.department_name}</TableCell>
                                        <TableCell>{employee.cost_center_code}</TableCell>
                                        <TableCell>{employee.division}</TableCell>
                                        <TableCell>{employee.company_name}</TableCell>
                                        <TableCell>{formatDateAsString(new Date(employee.date_hired))}</TableCell>
                                        <TableCell>{employee.registered_status ? 'Registered' : 'Not Registered'}</TableCell>
                                        <TableCell>{employee.active_status ? 'Active' : 'Inactive'}</TableCell>
                                        <TableCell className="flex flex-row items-center justify-center">
                                            <Button className="bg-transparent text-black hover:text-white" onClick={() => {
                                                setEditEmployee(employee);
                                                setOpenEditModal(true);
                                            }}><Pencil/>
                                            </Button>
                                            <Button className="bg-transparent text-black hover:text-white"onClick={() => setOpenDeleteModal(true)}><Trash/></Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <Button className="bg-transparent text-fontHeading hover:text-white">
                                                        <MoreHorizontal/>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem onClick={() => {
                                                        setViewEmployee(employee);
                                                        setOpenViewModal(true);
                                                    }}>View Details</DropdownMenuItem>
                                                    <DropdownMenuItem>{employee.active_status ? 'Deactivate' : 'Activate'}</DropdownMenuItem>
                                                    <DropdownMenuItem disabled={employee.registered_status} onClick={() => {
                                                        setRegEmployee(employee);
                                                        setOpenUserRegModal(true);
                                                    }}>Register</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>   
                    </div>
                </div>
                <div className="mt-5 absolute bottom-5 left-1/2">
                    <Pagination>
                        <PaginationContent>
                            {currentPage > 1 && (
                                <PaginationItem>
                                    <PaginationPrevious href="#" onClick={() => handlePageChange(currentPage - 1)} />
                                </PaginationItem>
                            )}
                            {Array.from({ length: maxPage }, (_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        href="#"
                                        onClick={() => handlePageChange(index + 1)}
                                        className={currentPage === index + 1 ? "bg-gray-200" : ""}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            {currentPage < maxPage && (
                                <PaginationItem>
                                    <PaginationNext href="#" onClick={() => handlePageChange(currentPage + 1)} />
                                </PaginationItem>
                            )}
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
            {openAddModal && <AddEmployeeModal addEmployee={addEmployee} onClose={() => setOpenAddModal(false)}/>}
            {openUserRegModal && <UserRegistration registerEmployee={registerEmployee} employee={regEmployee} onClose={() => setOpenUserRegModal(false)}/>}
            {openEditModal && <EditEmployeeModal updateEmployee={updateEmployee} employee={editEmployee} onClose={() => setOpenEditModal(false)}/>}
            {openDeleteModal && <DeleteConfirmation open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}/>}
            {openViewModal && <ViewEmployeeModal 
                employee={viewEmployee} 
                onClose={() => {
                    setOpenViewModal(false);
                    setViewEmployee(null);
                }}/>}
            {openSearchModal && <SearchEmployeeModal employee={searchEmployee} onClose={() => {setOpenSearchModal(false); setSearchEmployee(null);}}/>}
        </>
    );
}

export default Employee