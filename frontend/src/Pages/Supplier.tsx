import { useEffect, useState } from "react";
import Layout from "@/Components/appLayout/Layout";
import { Button } from "@/Components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Input } from "@/Components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import AddSupplierModal from "@/modals/AddSupplierModal";
import AddSupplierModal2 from "@/modals/AddSupplierModal2";

const suppliers = [
    { id: 1, supplierNumber: "100230456", companyName: "Leansel Nico", contactPerson: "IT Department", businessNumber: "503604218", mobileNumber: "IT Asset", dateHired: "06/17/24" },
    { id: 2, supplierNumber: "100230457", companyName: "Jane Doe", contactPerson: "Finance", businessNumber: "503604219", mobileNumber: "Accounting", dateHired: "07/01/23" },
    { id: 3, supplierNumber: "100230458", companyName: "John Smith", contactPerson: "Marketing", businessNumber: "503604220", mobileNumber: "Sales", dateHired: "05/21/22" },
    { id: 4, supplierNumber: "100230458", companyName: "John Smith", contactPerson: "Marketing", businessNumber: "503604220", mobileNumber: "Sales", dateHired: "05/21/22" },
    { id: 5, supplierNumber: "100230458", companyName: "John Smith", contactPerson: "Marketing", businessNumber: "503604220", mobileNumber: "Sales", dateHired: "05/21/22" },
    { id: 6, supplierNumber: "100230458", companyName: "John Smith", contactPerson: "Marketing", businessNumber: "503604220", mobileNumber: "Sales", dateHired: "05/21/22" },
    { id: 7, supplierNumber: "100230458", companyName: "John Smith", contactPerson: "Marketing", businessNumber: "503604220", mobileNumber: "Sales", dateHired: "05/21/22" },
    { id: 8, supplierNumber: "100230458", companyName: "John Smith", contactPerson: "Marketing", businessNumber: "503604220", mobileNumber: "Sales", dateHired: "05/21/22" },
    { id: 9, supplierNumber: "100230458", companyName: "John Smith", contactPerson: "Marketing", businessNumber: "503604220", mobileNumber: "Sales", dateHired: "05/21/22" },
    { id: 10, supplierNumber: "100230458", companyName: "kMAOTE", contactPerson: "Marketing", businessNumber: "503604220", mobileNumber: "Sales", dateHired: "05/21/22" },
    { id: 11, supplierNumber: "100230458", companyName: "SABAW", contactPerson: "Marketing", businessNumber: "503604220", mobileNumber: "Sales", dateHired: "05/21/22" },
    { id: 12, supplierNumber: "100230456", companyName: "Leansel Nico", contactPerson: "IT Department", businessNumber: "503604218", mobileNumber: "IT Asset", dateHired: "06/17/24" },
    { id: 13, supplierNumber: "100230457", companyName: "Jane Doe", contactPerson: "Finance", businessNumber: "503604219", mobileNumber: "Accounting",  dateHired: "07/01/23" },
    { id: 14, supplierNumber: "100230458", companyName: "John Smith", contactPerson: "Marketing", businessNumber: "503604220", mobileNumber: "Sales", dateHired: "05/21/22" },
    { id: 15, supplierNumber: "100230458", companyName: "John Smith", contactPerson: "Marketing", businessNumber: "503604220", mobileNumber: "Sales", dateHired: "05/21/22" },
    { id: 16, supplierNumber: "100230458", companyName: "John Smith", contactPerson: "Marketing", businessNumber: "503604220", mobileNumber: "Sales", dateHired: "05/21/22" },
    { id: 17, supplierNumber: "100230458", companyName: "John Smith", contactPerson: "Marketing", businessNumber: "503604220", mobileNumber: "Sales", dateHired: "05/21/22" },
    { id: 18, supplierNumber: "100230458", companyName: "John Smith", contactPerson: "Marketing", businessNumber: "503604220", mobileNumber: "Sales", dateHired: "05/21/22" },
    { id: 19, supplierNumber: "100230458", companyName: "John Smith", contactPerson: "Marketing", businessNumber: "503604220", mobileNumber: "Sales", dateHired: "05/21/22" },
    { id: 20, supplierNumber: "100230458", companyName: "kMAOTE", contactPerson: "Marketing", businessNumber: "503604220", mobileNumber: "Sales", dateHired: "05/21/22" },
];

function Supplier() {
    const [openModal, setOpenModal] = useState(false);
    const [openNextModal, setOpenNextModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const headerHeight = 72;
    const itemHeight = 50;

    const getItemsPerPage = (height: number): number => {
        const availableHeight = height - headerHeight;
        if (availableHeight < 0) return 0;
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

    const filteredSupplier = suppliers.filter(suppliers =>
        suppliers.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastSupplier = currentPage * itemsPerPage;
    const indexOfFirstSupplier = indexOfLastSupplier - itemsPerPage;
    const currentSupplier = filteredSupplier.slice(indexOfFirstSupplier, indexOfLastSupplier);

    const totalPages = Math.ceil(filteredSupplier.length / itemsPerPage);

    const handleNextModal = () => {
        setOpenModal(false);
        setOpenNextModal(true);
    };

    const handleBack = () => {
        setOpenNextModal(false);
        setOpenModal(true);
    };


    return(
        <Layout>
            <div className="flex flex-col h-full">
                <div className="flex flex-col h-full relative">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">Supplier</h1>
                        <p className="text-sm font-semibold text-[#9E9E9E]">Users / Supplier</p>
                    </div>
                    <div className="flex justify-center mt-10">
                        <div className="flex flex-row justify-between w-full">
                            <div className="w-fit flex items-center justify-start ">
                                <h1 className=" text-fontHeading font-bold">All Supplier</h1>
                            </div>
                            <div className="flex flex-row w-6/12 space-x-2">
                                <div className="relative w-10/12">
                                    <Input type="search" placeholder="Search..." className="pl-12 border-2 focus:border-none"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}/>
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>   
                                <Button className="bg-hoverCream text-fontHeading border hover:text-white" onClick={() => setOpenModal(true)}>
                                    <Plus size={20}/><span className="text-sm">Add Supplier</span>
                                </Button>
                            </div>    
                        </div>
                    </div>
                    <div className="mt-5 overflow-y-auto" style={{ maxHeight: `calc(100vh - ${headerHeight + 270}px)` }}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Supplier Code</TableHead>
                                    <TableHead>Company Name</TableHead>
                                    <TableHead>Contact Person</TableHead>
                                    <TableHead>Business Number</TableHead>
                                    <TableHead>Mobile Number</TableHead>
                                    <TableHead>Date Hired</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentSupplier.map(suppliers => (
                                    <TableRow key={suppliers.id}>
                                        <TableCell>{suppliers.supplierNumber}</TableCell>
                                        <TableCell>{suppliers.companyName}</TableCell>
                                        <TableCell>{suppliers.contactPerson}</TableCell>
                                        <TableCell>{suppliers.businessNumber}</TableCell>
                                        <TableCell>{suppliers.mobileNumber}</TableCell>
                                        <TableCell>{suppliers.dateHired}</TableCell>
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
            <AddSupplierModal open={openModal} onClose={() => setOpenModal(false)} onNext={handleNextModal}/>
            <AddSupplierModal2 open={openNextModal} onClose={() => setOpenNextModal(false)} onBack={handleBack}/>
        </Layout>
    );
}

export default Supplier