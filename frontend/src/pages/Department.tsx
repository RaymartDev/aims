import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger  } from "@/Components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import { useEffect, useState } from "react";
import AddDepartmentModal from "@/modals/AddDepartmentModal";
import EditDepartmentModal from "@/modals/EditDepartmentModal";

const data = [
    { id: 1,  department: "IT Department", status: "Active" },
    { id: 2,  department: "Human Resources", status: "Inactive" },
    { id: 3,  department: "Marketing", status: "Active" },
    { id: 4,  department: "Sales", status: "Inactive" },
    { id: 5,  department: "Finance", status: "Active" },
    { id: 6,  department: "Research and Development", status: "Inactive" },
    { id: 7,  department: "Customer Support", status: "Active" },
    { id: 8,  department: "Legal", status: "Inactive" },
    { id: 9,  department: "Operations", status: "Active" },
    { id: 10, department: "Engineering", status: "Inactive" },
    { id: 11, department: "Product Management", status: "Active" },
    { id: 12, department: "Quality Assurance", status: "Inactive" },
    { id: 13, department: "Administration", status: "Active" },
    { id: 14, department: "Purchasing", status: "Inactive" },
    { id: 15, department: "Logistics", status: "Active" },
    { id: 16, department: "Public Relations", status: "Inactive" },
    { id: 17, department: "Corporate Strategy", status: "Active" },
    { id: 18, department: "Training and Development", status: "Inactive" },
    { id: 19, department: "Business Development", status: "Active" },
    { id: 20, department: "Health and Safety", status: "Inactive" }
];

function Department() {
    const [openModal, setOpenModal] = useState(false);
    const [editModal, setEditOpenmodal] = useState(false);
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

    const filteredDepartment = data.filter(data =>
        data.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastDepartment = currentPage * itemsPerPage;
    const indexOfFirstDepartment = indexOfLastDepartment - itemsPerPage;
    const currentDepartment = filteredDepartment.slice(indexOfFirstDepartment, indexOfLastDepartment);

    const totalPages = Math.ceil(filteredDepartment.length  / itemsPerPage);

    return(
        <div className="flex flex-col h-full">
            <div className="flex flex-col h-full relative">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">Department</h1>
                    <p className="text-sm font-semibold text-[#9E9E9E]">Miscellaneous / Department</p>
                </div>
                <div className="flex justify-center mt-10">
                    <div className="flex flex-row justify-between w-full">
                        <div className="w-fit flex items-center justify-start ">
                            <h1 className=" text-fontHeading font-bold">All Department</h1>
                        </div>
                        <div className="flex flex-row w-6/12 space-x-2">
                            <div className="relative w-10/12 ">
                                <Input type="search" placeholder="Search Department" className="pl-12 border-2 focus:border-none" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}/>
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>   
                            <Button className="bg-hoverCream text-fontHeading border hover:text-white font-semibold w-48" onClick={() => setOpenModal(true)}>
                                <Plus size={20}/><span className="text-sm">Add Department</span>
                            </Button>
                        </div>    
                    </div>
                </div>
                <div className="mt-5 overflow-y-auto" style={{ maxHeight: `calc(100vh - ${headerHeight + 270}px)` }}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Department</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentDepartment.map(data => (
                                <TableRow key={data.id}>
                                    <TableCell>{data.department}</TableCell>
                                    <TableCell>{data.status}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <Button className="bg-transparent text-fontHeading hover:text-white">
                                                    <MoreHorizontal/>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => setEditOpenmodal(true)}>Edit</DropdownMenuItem>
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
            <AddDepartmentModal open={openModal} onClose={() => setOpenModal(false)}/>
            <EditDepartmentModal open={editModal} onClose={() => setEditOpenmodal(false)}/>
        </div>
    );
}

export default Department