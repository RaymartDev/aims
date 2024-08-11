import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Input } from "@/Components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import AddSupplierModal from "@/modals/AddSupplierModal";
import AddSupplierModal2 from "@/modals/AddSupplierModal2";

const suppliers = [
    { id: 1, supplierNumber: "100230456", companyName: "TasteMasters", contactPerson: "Leansel Nico", businessNumber: "503604218", mobileNumber: "09481298472", dateHired: "06/17/24" },
    { id: 2, supplierNumber: "100230457", companyName: "Flavor Fusion", contactPerson: "Sarah Johnson", businessNumber: "503604219", mobileNumber: "09481298473", dateHired: "05/15/23" },
    { id: 3, supplierNumber: "100230458", companyName: "Epicurean Enterprises", contactPerson: "Michael Brown", businessNumber: "503604220", mobileNumber: "09481298474", dateHired: "07/12/22" },
    { id: 4, supplierNumber: "100230459", companyName: "QuickBite Inc", contactPerson: "Emily Davis", businessNumber: "503604221", mobileNumber: "09481298475", dateHired: "03/18/21" },
    { id: 5, supplierNumber: "100230460", companyName: "Savory Delights", contactPerson: "James Wilson", businessNumber: "503604222", mobileNumber: "09481298476", dateHired: "08/22/23" },
    { id: 6, supplierNumber: "100230461", companyName: "Foodie Ventures", contactPerson: "Olivia Martinez", businessNumber: "503604223", mobileNumber: "09481298477", dateHired: "09/30/21" },
    { id: 7, supplierNumber: "100230462", companyName: "InnoWave Corp", contactPerson: "William Garcia", businessNumber: "503604224", mobileNumber: "09481298478", dateHired: "01/10/22" },
    { id: 8, supplierNumber: "100230463", companyName: "Culinary Creations", contactPerson: "Sophia Rodriguez", businessNumber: "503604225", mobileNumber: "09481298479", dateHired: "04/05/20" },
    { id: 9, supplierNumber: "100230464", companyName: "Gourmet Group", contactPerson: "Benjamin Harris", businessNumber: "503604226", mobileNumber: "09481298480", dateHired: "11/14/22" },
    { id: 10, supplierNumber: "100230465", companyName: "Urban Eats", contactPerson: "Ava Clark", businessNumber: "503604227", mobileNumber: "09481298481", dateHired: "06/25/24" },
    { id: 11, supplierNumber: "100230466", companyName: "TasteMakers", contactPerson: "Lucas Lewis", businessNumber: "503604228", mobileNumber: "09481298482", dateHired: "02/09/23" },
    { id: 12, supplierNumber: "100230467", companyName: "Gourmet Solutions", contactPerson: "Mia Walker", businessNumber: "503604229", mobileNumber: "09481298483", dateHired: "08/11/23" },
    { id: 13, supplierNumber: "100230468", companyName: "Cuisine Concepts", contactPerson: "Alexander Hall", businessNumber: "503604230", mobileNumber: "09481298484", dateHired: "10/19/22" },
    { id: 14, supplierNumber: "100230469", companyName: "Dining Dynamics", contactPerson: "Isabella Young", businessNumber: "503604231", mobileNumber: "09481298485", dateHired: "03/21/21" },
    { id: 15, supplierNumber: "100230470", companyName: "Palate Pleasers", contactPerson: "Henry King", businessNumber: "503604232", mobileNumber: "09481298486", dateHired: "05/17/22" },
    { id: 16, supplierNumber: "100230471", companyName: "Feast Factory", contactPerson: "Amelia Scott", businessNumber: "503604233", mobileNumber: "09481298487", dateHired: "01/04/24" },
    { id: 17, supplierNumber: "100230472", companyName: "Cuisine Craft", contactPerson: "Elijah Green", businessNumber: "503604234", mobileNumber: "09481298488", dateHired: "07/23/22" },
    { id: 18, supplierNumber: "100230473", companyName: "FoodQuest Ltd.", contactPerson: "Charlotte Adams", businessNumber: "503604235", mobileNumber: "09481298489", dateHired: "12/09/21" },
    { id: 19, supplierNumber: "100230474", companyName: "Tasty Ventures", contactPerson: "Daniel Baker", businessNumber: "503604236", mobileNumber: "09481298490", dateHired: "09/14/23" },
    { id: 20, supplierNumber: "100230475", companyName: "Flavor Haven", contactPerson: "Harper Phillips", businessNumber: "503604237", mobileNumber: "09481298491", dateHired: "06/07/22" },
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

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const filteredSupplier = suppliers.filter(suppliers =>
        suppliers.supplierNumber.toLowerCase().includes(searchQuery.toLowerCase())
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
        <>
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
                                    <Input type="search" placeholder="Search Supplier Code" className="pl-12 border-2 focus:border-none"
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
        </>
    );
}

export default Supplier