import { useEffect, useState } from "react";
import Layout from "@/Components/appLayout/Layout";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger  } from "@/Components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";

const employees = [
    { id: 1, number: "100230456", name: "Leansel Nico", department: "IT Department", costCode: "503604218", division: "IT Asset", company: "KFC Canada", dateHired: "06/17/24" },
    { id: 2, number: "100230457", name: "Jane Doe", department: "Finance", costCode: "503604219", division: "Accounting", company: "ABC Corp", dateHired: "07/01/23" },
    { id: 3, number: "100230458", name: "John Smith", department: "Marketing", costCode: "503604220", division: "Sales", company: "XYZ Inc", dateHired: "05/21/22" },
    { id: 4, number: "100230458", name: "John Smith", department: "Marketing", costCode: "503604220", division: "Sales", company: "XYZ Inc", dateHired: "05/21/22" },
    { id: 5, number: "100230458", name: "John Smith", department: "Marketing", costCode: "503604220", division: "Sales", company: "XYZ Inc", dateHired: "05/21/22" },
    { id: 6, number: "100230458", name: "John Smith", department: "Marketing", costCode: "503604220", division: "Sales", company: "XYZ Inc", dateHired: "05/21/22" },
    { id: 7, number: "100230458", name: "John Smith", department: "Marketing", costCode: "503604220", division: "Sales", company: "XYZ Inc", dateHired: "05/21/22" },
    { id: 8, number: "100230458", name: "John Smith", department: "Marketing", costCode: "503604220", division: "Sales", company: "XYZ Inc", dateHired: "05/21/22" },
    { id: 9, number: "100230458", name: "John Smith", department: "Marketing", costCode: "503604220", division: "Sales", company: "XYZ Inc", dateHired: "05/21/22" },
    { id: 10, number: "100230458", name: "kMAOTE", department: "Marketing", costCode: "503604220", division: "Sales", company: "XYZ Inc", dateHired: "05/21/22" },
    { id: 11, number: "100230458", name: "SABAW", department: "Marketing", costCode: "503604220", division: "Sales", company: "XYZ Inc", dateHired: "05/21/22" },
    { id: 12, number: "100230458", name: "SABzzxcAW", department: "Marketing", costCode: "503604220", division: "Sales", company: "XYZ Inc", dateHired: "05/21/22" },
    { id: 13, number: "100230458", name: "SABqwewqeAW", department: "Marketing", costCode: "503604220", division: "Sales", company: "XYZ Inc", dateHired: "05/21/22" },
    { id: 14, number: "100230458", name: "asdasd", department: "Marketing", costCode: "503604220", division: "Sales", company: "XYZ Inc", dateHired: "05/21/22" },
];

function Employee() {
    const headerHeight = 72;

    const getItemsPerPage = (height: number): number => {
        const availableHeight = height - headerHeight;
        if (availableHeight < 500) return 10;
        return 10;
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

    const indexOfLastEmployee = currentPage * itemsPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
    const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const totalPages = Math.ceil(employees.length / itemsPerPage);

    return(
        <Layout>
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
                                    <Input type="search" placeholder="Search..." className="pl-12 border-2 focus:border-none"/>
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>   
                                <Button className="bg-hoverCream text-fontHeading border">
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
        </Layout>
    );
}

export default Employee