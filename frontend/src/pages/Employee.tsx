/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState } from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger  } from "@/Components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import AddEmployeeModal from "@/modals/AddEmployeeModal";
import UserRegistration from "@/modals/UserRegistration";
import EditEmployeeModal from "@/modals/EditEmployeeModal";
import type EmployeeType from "@/interface/employee";
import { formatDateAsString, getVersion } from "@/lib/utils";
import axios from "axios";


function Employee() {
    const [employees, setEmployees] = useState<EmployeeType[]>([]);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openUserRegModal, setOpenUserRegModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 17;

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${getVersion()}/employee/list?limit=${itemsPerPage}&page=${currentPage}`);
          if (response.status >= 200 && response.status < 300) {
            setEmployees(response.data.employees); // Update state with employee data
        }
        } catch (e) {
          console.error(e);
        }
       };
        fetchData(); // Call the fetch function
      }, [itemsPerPage, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const indexOfLastEmployee = currentPage * itemsPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
    const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const totalPages = Math.ceil(employees.length  / itemsPerPage);

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
                                    <Input type="search" placeholder="Search Employee Number" className="pl-12 border-2 focus:border-none" 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}/>
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>   
                                <Button className="bg-hoverCream text-fontHeading border hover:text-white font-semibold w-40" 
                                    onClick={() => setOpenAddModal(true)}>
                                    <Plus size={20}/><span className="text-sm">Add Employee</span>
                                </Button>
                            </div>    
                        </div>
                    </div>
                    <div className="mt-5 overflow-y-auto" style={{ maxHeight: `calc(100vh - ${70 + 270}px)` }}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee Number</TableHead>
                                    <TableHead>Employee Name</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Cost Code</TableHead>
                                    <TableHead>Division</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Date Hired</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentEmployees.map(employee => (
                                    <TableRow key={employee.id}>
                                        <TableCell>{employee.employee_no}</TableCell>
                                        <TableCell>{`${employee.first_name} ${employee.last_name}`}</TableCell>
                                        <TableCell>{employee.department_name}</TableCell>
                                        <TableCell>{employee.cost_center_code}</TableCell>
                                        <TableCell>{employee.division}</TableCell>
                                        <TableCell>{employee.company_name}</TableCell>
                                        <TableCell>{formatDateAsString(new Date(employee.date_hired))}</TableCell>
                                        <TableCell>{employee.registered_status ? 'Registered' : 'Not Registered'}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <Button className="bg-transparent text-fontHeading hover:text-white">
                                                        <MoreHorizontal/>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => setOpenEditModal(true)}>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem>Deactivate</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => setOpenUserRegModal(true)}>Register</DropdownMenuItem>
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
                            {Array.from({ length: totalPages }, (_, index) => (
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
                            {currentPage < totalPages && (
                                <PaginationItem>
                                    <PaginationNext href="#" onClick={() => handlePageChange(currentPage + 1)} />
                                </PaginationItem>
                            )}
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
            <AddEmployeeModal open={openAddModal} onClose={() => setOpenAddModal(false)}/>
            <UserRegistration open={openUserRegModal} onClose={() => setOpenUserRegModal(false)}/>
            <EditEmployeeModal open={openEditModal} onClose={() => setOpenEditModal(false)}/>
        </>
    );
}

export default Employee