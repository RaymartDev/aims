import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger  } from "@/Components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import { useEffect, useState } from "react";
import AddCompanyModal from "@/modals/AddCompanyModal";

const company = [
    { id: 1,  companyName: "TechNova Solutions", status: "Active" },
    { id: 2,  companyName: "InnoWave Corp", status: "Inactive" },
    { id: 3,  companyName: "FusionWorks Ltd.", status: "Active" },
    { id: 4,  companyName: "Pioneer Ventures", status: "Inactive" },
    { id: 5,  companyName: "Skyline Innovations", status: "Active" },
    { id: 6,  companyName: "Quantum Dynamics", status: "Inactive" },
    { id: 7,  companyName: "Vertex Technologies", status: "Active" },
    { id: 8,  companyName: "Apex Industries", status: "Inactive" },
    { id: 9,  companyName: "NexGen Enterprises", status: "Active" },
    { id: 10, companyName: "Blue Horizon Inc.", status: "Inactive" },
    { id: 11, companyName: "StellarTech", status: "Active" },
    { id: 12, companyName: "FuturePath Systems", status: "Inactive" },
    { id: 13, companyName: "OmniTech Solutions", status: "Active" },
    { id: 14, companyName: "Visionary Labs", status: "Inactive" },
    { id: 15, companyName: "Synergy Global", status: "Active" },
    { id: 16, companyName: "EcoVision Technologies", status: "Inactive" },
    { id: 17, companyName: "UrbanGrid", status: "Active" },
    { id: 18, companyName: "AstraEdge", status: "Inactive" },
    { id: 19, companyName: "Zenith Solutions", status: "Active" },
    { id: 20, companyName: "PrimeWave", status: "Inactive" }
];


function Company() {
    const [openModal, setOpenModal] = useState(false);
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

    const filteredCompany = company.filter(company =>
        company.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastCompany = currentPage * itemsPerPage;
    const indexOfFirstCompany = indexOfLastCompany - itemsPerPage;
    const currentCompany = filteredCompany.slice(indexOfFirstCompany, indexOfLastCompany);

    const totalPages = Math.ceil(filteredCompany.length  / itemsPerPage);

    return(
        <div className="flex flex-col h-full">
            <div className="flex flex-col h-full relative">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">Company</h1>
                    <p className="text-sm font-semibold text-[#9E9E9E]">Miscellaneous / Company</p>
                </div>
                <div className="flex justify-center mt-10">
                    <div className="flex flex-row justify-between w-full">
                        <div className="w-fit flex items-center justify-start ">
                            <h1 className=" text-fontHeading font-bold">All Company</h1>
                        </div>
                        <div className="flex flex-row w-6/12 space-x-2">
                            <div className="relative w-10/12 ">
                                <Input type="search" placeholder="Search Company" className="pl-12 border-2 focus:border-none" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}/>
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>   
                            <Button className="bg-hoverCream text-fontHeading border hover:text-white font-semibold" onClick={() => setOpenModal(true)}>
                                <Plus size={20}/><span className="text-sm">Add Company</span>
                            </Button>
                        </div>    
                    </div>
                </div>
                <div className="mt-5 overflow-y-auto" style={{ maxHeight: `calc(100vh - ${headerHeight + 270}px)` }}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Company Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentCompany.map(company => (
                                <TableRow key={company.id}>
                                    <TableCell>{company.companyName}</TableCell>
                                    <TableCell>{company.status}</TableCell>
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
            <AddCompanyModal open={openModal} onClose={() => setOpenModal(false)}/>
        </div>
    );
}

export default Company