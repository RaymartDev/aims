import { useEffect, useState } from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger  } from "@/Components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import AddEmployeeModal from "@/modals/AddEmployeeModal";
import UserRegistration from "@/modals/UserRegistration";

const employees = [
    { id: 1, number: "100230456", name: "Leansel Nico", department: "IT Department", costCode: "503604218", division: "IT Asset", company: "KFC Canada", dateHired: "06/17/24", status: "Registered" },
    { id: 2, number: "100230457", name: "Jane Doe", department: "Finance", costCode: "503604219", division: "Accounting", company: "ABC Corp", dateHired: "07/01/23", status: "Not Registered" },
    { id: 3, number: "100230458", name: "John Smith", department: "Marketing", costCode: "503604220", division: "Sales", company: "XYZ Inc", dateHired: "05/21/22", status: "Not Registered" },
    { id: 4, number: "100230458", name: "John Smith", department: "Marketing", costCode: "503604220", division: "Sales", company: "XYZ Inc", dateHired: "05/21/22", status: "Registered" },
    { id: 5, number: "100230458", name: "John Smith", department: "Marketing", costCode: "503604220", division: "Sales", company: "XYZ Inc", dateHired: "05/21/22", status: "Not Registered" },
    { id: 6, number: "100230458", name: "John Smith", department: "Marketing", costCode: "503604220", division: "Sales", company: "XYZ Inc", dateHired: "05/21/22", status: "Registered" },
    { id: 7, number: "100230458", name: "John Smith", department: "Marketing", costCode: "503604220", division: "Sales", company: "XYZ Inc", dateHired: "05/21/22", status: "Not Registered" },
    { id: 8, number: "100230458", name: "John Smith", department: "Marketing", costCode: "503604220", division: "Sales", company: "XYZ Inc", dateHired: "05/21/22", status: "Registered" },
    { id: 9, number: "100230458", name: "John Smith", department: "Marketing", costCode: "503604220", division: "Sales", company: "XYZ Inc", dateHired: "05/21/22", status: "Not Registered" },
    { id: 10, number: "100230458", name: "kMAOTE", department: "Marketing", costCode: "503604220", division: "Sales", company: "XYZ Inc", dateHired: "05/21/22", status: "Not Registered" },
    { id: 11, number: "100230458", name: "SABAW", department: "Marketing", costCode: "503604220", division: "Sales", company: "XYZ Inc", dateHired: "05/21/22", status: "Not Registered" },
    { id: 12, number: "100230458", name: "SABzzxcAW", department: "Marketing", costCode: "503604220", division: "Sales", company: "XYZ Inc", dateHired: "05/21/22", status: "Not Registered" },
    { id: 13, number: "100230458", name: "SABqwewqeAW", department: "Marketing", costCode: "503604220", division: "Sales", company: "XYZ Inc", dateHired: "05/21/22", status: "Not Registered" },
    { id: 14, number: "100230458", name: "asdasd", department: "Marketing", costCode: "503604220", division: "Sales", company: "XYZ Inc", dateHired: "05/21/22", status: "Not Registered" },
    { id: 15, number: "100230456", name: "Leansel Nico", department: "IT Department", costCode: "503604218", division: "IT Asset", company: "KFC Canada", dateHired: "06/17/24", status: "Registered" },
    { id: 16, number: "100230457", name: "Jane Doe", department: "Finance", costCode: "503604219", division: "Accounting", company: "ABC Corp", dateHired: "07/01/23", status: "Registered" },
    { id: 17, number: "100230458", name: "John Smith", department: "Marketing", costCode: "503604220", division: "Sales", company: "XYZ Inc", dateHired: "05/21/22", status: "Not Registered" },
    { id: 18, number: "100230458", name: "John Smith", department: "Marketing", costCode: "503604220", division: "Sales", company: "XYZ Inc", dateHired: "05/21/22", status: "Not Registered" },
    { id: 19, number: "100230458", name: "John Smith", department: "Marketing", costCode: "503604220", division: "Sales", company: "XYZ Inc", dateHired: "05/21/22", status: "Not Registered" },
    { id: 20, number: "100230459", name: "John Smith", department: "Marketing", costCode: "503604220", division: "Sales", company: "XYZ Inc", dateHired: "05/21/22", status: "Not Registered" },
];

function Employee() {
    const [openModal, setOpenModal] = useState(false);
    const [openUserRegModal, setOpenUserRegModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const headerHeight = 70;
    const itemHeight = 50;

    const getItemsPerPage = (height: number): number => {
        const availableHeight = height - headerHeight;
        if (availableHeight <= 0) return 0;
        return Math.floor(availableHeight / itemHeight);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage(window.innerHeight));

    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(getItemsPerPage(window.innerHeight));
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const filteredEmployees = employees.filter(employee =>
        employee.number.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastEmployee = currentPage * itemsPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const totalPages = Math.ceil(filteredEmployees.length  / itemsPerPage);

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
                                <Button className="bg-hoverCream text-fontHeading border hover:text-white" onClick={() => setOpenModal(true)}>
                                    <Plus size={20}/><span className="text-sm">Add Employee</span>
                                </Button>
                            </div>    
                        </div>
                    </div>
                    <div className="mt-5 overflow-y-auto" style={{ maxHeight: `calc(100vh - ${headerHeight + 270}px)` }}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee ID</TableHead>
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
                                        <TableCell>{employee.id}</TableCell>
                                        <TableCell>{employee.number}</TableCell>
                                        <TableCell>{employee.name}</TableCell>
                                        <TableCell>{employee.department}</TableCell>
                                        <TableCell>{employee.costCode}</TableCell>
                                        <TableCell>{employee.division}</TableCell>
                                        <TableCell>{employee.company}</TableCell>
                                        <TableCell>{employee.dateHired}</TableCell>
                                        <TableCell>{employee.status}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <Button className="bg-transparent text-fontHeading hover:text-white">
                                                        <MoreHorizontal/>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
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
            <AddEmployeeModal open={openModal} onClose={() => setOpenModal(false)}/>
            <UserRegistration open={openUserRegModal} onClose={() => setOpenUserRegModal(false)}/>
        </>
    );
}

export default Employee