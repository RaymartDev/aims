import { useEffect, useState } from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Download, MoreHorizontal, Search } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import ShippedModal from "@/modals/ShippedModal";
import ReceivedModal from "@/modals/ReceivedModal";
import CancelModal from "@/modals/CancelModal";
import ViewDetailsModal from "@/modals/ViewDetailsModal";

const delivery = [
    { id: 1, deliveryNumber: "100230457", taggedItemAs: "Billing", name: "Jack Sparrow" },
    { id: 2, deliveryNumber: "100230458", taggedItemAs: "Original Unit", name: "John Doe" },
    { id: 3, deliveryNumber: "100230459", taggedItemAs: "Return Demo Unit", name: "Jane Doe" },
    { id: 4, deliveryNumber: "100230460", taggedItemAs: "Return Service Unit", name: "Alice Smith" },
    { id: 5, deliveryNumber: "100230461", taggedItemAs: "Safekeep", name: "Bob Johnson" },
    { id: 6, deliveryNumber: "100230462", taggedItemAs: "For Repair", name: "Charlie Brown" },
    { id: 7, deliveryNumber: "100230463", taggedItemAs: "Pull Out", name: "David Williams" },
    { id: 8, deliveryNumber: "100230464", taggedItemAs: "P. Transfer", name: "Eve Davis" },
    { id: 9, deliveryNumber: "100230465", taggedItemAs: "Original Unit", name: "Frank Moore" },
    { id: 10, deliveryNumber: "100230466", taggedItemAs: "Billing", name: "Grace Taylor" },
    { id: 11, deliveryNumber: "100230467", taggedItemAs: "Return Demo Unit", name: "Hank Wilson" },
    { id: 12, deliveryNumber: "100230468", taggedItemAs: "Return Service Unit", name: "Ivy Martin" },
    { id: 13, deliveryNumber: "100230469", taggedItemAs: "Safekeep", name: "Jack Thompson" },
    { id: 14, deliveryNumber: "100230470", taggedItemAs: "For Repair", name: "Kara White" },
    { id: 15, deliveryNumber: "100230471", taggedItemAs: "Pull Out", name: "Leo Harris" },
    { id: 16, deliveryNumber: "100230472", taggedItemAs: "P. Transfer", name: "Mia Clark" },
    { id: 17, deliveryNumber: "100230473", taggedItemAs: "Original Unit", name: "Nina Lewis" },
    { id: 18, deliveryNumber: "100230474", taggedItemAs: "Billing", name: "Oscar Allen" },
    { id: 19, deliveryNumber: "100230475", taggedItemAs: "Return Demo Unit", name: "Paul Young" },
    { id: 20, deliveryNumber: "100230476", taggedItemAs: "Return Service Unit", name: "Quinn King" },
  ];
  
function ReturnReport() {
    const [openViewDetailsModal, setOpenViewDetailsModal] = useState(false);
    const [openShippedModal, setOpenShippedModal] = useState(false);
    const [openReceivedModal, setOpenReceivedModal] = useState(false);
    const [openCancelModal, setOpenCancelModal] = useState(false);

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

    const filteredDelivery = delivery.filter(delivery =>
        delivery.deliveryNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastDelivery = currentPage * itemsPerPage;
    const indexOfFirstDelivery = indexOfLastDelivery - itemsPerPage;
    const currentDelivery= filteredDelivery.slice(indexOfFirstDelivery, indexOfLastDelivery);

    const totalPages = Math.ceil(filteredDelivery.length / itemsPerPage);
    return(
        <>
            <div className="flex flex-col h-full">
                <div className="flex flex-col h-full relative">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">Return Report</h1>
                        <p className="text-sm font-semibold text-[#9E9E9E]">Transaction / Return Report</p>
                    </div>
                    <div className="flex justify-center mt-10">
                        <div className="flex flex-row justify-between w-full">
                            <div className="w-fit flex items-center justify-start ">
                                <h1 className=" text-fontHeading font-bold">Delivery Receipt Masterlist</h1>
                            </div>
                            <div className="flex flex-row justify-end w-6/12 space-x-2">
                                <div className="relative w-2/3">
                                    <Input type="search" placeholder="Search DR Number" className="pl-12 border-2 focus:border-none" 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}/>
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div> 
                                <Button className="bg-hoverCream text-fontHeading border hover:text-white space-x-1 font-semibold w-36">
                                    <Download size={20}/><span className="text-sm">Export</span>
                                </Button>  
                            </div>    
                        </div>
                    </div>
                    <div className="mt-5 overflow-y-auto" style={{ maxHeight: `calc(100vh - ${headerHeight + 270}px)` }}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>DR Number</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Tagged Item As</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentDelivery.map(delivery => (
                                    <TableRow key={delivery.id}>
                                        <TableCell>{delivery.deliveryNumber}</TableCell>
                                        <TableCell>{delivery.name}</TableCell>
                                        <TableCell>{delivery.taggedItemAs}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <Button className="bg-transparent text-fontHeading hover:text-white">
                                                        <MoreHorizontal/>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => setOpenViewDetailsModal(true)}>View Details</DropdownMenuItem>
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
            <ViewDetailsModal open={openViewDetailsModal} onClose={() => setOpenViewDetailsModal(false)}/>
            <ShippedModal open={openShippedModal} onClose={() => setOpenShippedModal(false)}/>
            <ReceivedModal open={openReceivedModal} onClose={() => setOpenReceivedModal(false)}/>
            <CancelModal open={openCancelModal} onClose={() => setOpenCancelModal(false)}/>
        </>
    );
}

export default ReturnReport