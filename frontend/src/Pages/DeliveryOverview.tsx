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
    { id: 1, companyName: "100230457", costCenter: "Jane Doe", storeName: "HP Probook 8GB RAM / 512GB SSD", address: "01/02/24", status: "Received" },
    { id: 2, companyName: "100230457", costCenter: "Jane Doe", storeName: "HP Probook 8GB RAM / 512GB SSD", address: "01/02/24", status: "Shipped" },
    { id: 3, companyName: "100230458", costCenter: "John Smith", storeName: "SONY TV HD 4K IPS Display", address: "01/02/24", status: "Received"  },
    { id: 4, companyName: "100230458", costCenter: "John Smith", storeName: "SONY TV HD 4K IPS Display", address: "01/02/24", status: "Shipped" },
    { id: 5, companyName: "100230458", costCenter: "John Smith", storeName: "SONY TV HD 4K IPS Display", address: "01/02/24", status: "Received" },
    { id: 6, companyName: "100230458", costCenter: "John Smith", storeName: "SONY TV HD 4K IPS Display", address: "01/02/24", status: "Cancelled" },
    { id: 7, companyName: "100230458", costCenter: "John Smith", storeName: "SONY TV HD 4K IPS Display", address: "01/02/24", status: "Received"   },
    { id: 8, companyName: "100230458", costCenter: "John Smith", storeName: "SONY TV HD 4K IPS Display", address: "01/02/24", status: "Shipped" },
    { id: 9, companyName: "100230458", costCenter: "John Smith", storeName: "SONY TV HD 4K IPS Display", address: "01/02/24", status: "Received" },
    { id: 10, companyName: "100230458", costCenter: "kMAOTE", storeName: "SONY TV HD 4K IPS Display", address: "01/02/24", status: "Shipped" },
    { id: 11, companyName: "100230458", costCenter: "SABAW", storeName: "SONY TV HD 4K IPS Display", address: "01/02/24", status: "Received" },
    { id: 12, companyName: "100230457", costCenter: "Jane Doe", storeName: "SONY TV HD 4K IPS Display", address: "01/02/24", status: "Shipped" },
    { id: 13, companyName: "100230457", costCenter: "Jane Doe", storeName: "SONY TV HD 4K IPS Display", address: "01/02/24", status: "Received" },
    { id: 14, companyName: "100230458", costCenter: "John Smith", storeName: "SONY TV HD 4K IPS Display", address: "01/02/24", status: "Shipped" },
    { id: 15, companyName: "100230458", costCenter: "John Smith", storeName: "SONY TV HD 4K IPS Display", address: "01/02/24", status: "Received" },
    { id: 16, companyName: "100230458", costCenter: "John Smith", storeName: "SONY TV HD 4K IPS Display", address: "01/02/24", status: "Shipped" },
    { id: 17, companyName: "100230458", costCenter: "John Smith", storeName: "SONY TV HD 4K IPS Display", address: "01/02/24", status: "Received" },
    { id: 18, companyName: "100230458", costCenter: "John Smith", storeName: "SONY TV HD 4K IPS Display", address: "01/02/24", status: "Shipped"   },
    { id: 19, companyName: "100230458", costCenter: "John Smith", storeName: "SONY TV HD 4K IPS Display", address: "01/02/24", status: "Received" },
    { id: 20, companyName: "100230458", costCenter: "John Smith", storeName: "SONY TV HD 4K IPS Display", address: "01/02/24", status: "Shipped" },
];

function DeliveryOverview() {
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
        delivery.storeName.toLowerCase().includes(searchQuery.toLowerCase())
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
                        <h1 className="text-2xl font-bold">Delivery</h1>
                        <p className="text-sm font-semibold text-[#9E9E9E]">Delivery / Overview</p>
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
                                <Button className="bg-hoverCream text-fontHeading border hover:text-white space-x-1">
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
                                    <TableHead>Shipped By</TableHead>
                                    <TableHead>Shipped Date</TableHead>
                                    <TableHead>Received By</TableHead>
                                    <TableHead>Received Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentDelivery.map(delivery => (
                                    <TableRow key={delivery.id}>
                                        <TableCell>{delivery.companyName}</TableCell>
                                        <TableCell>{delivery.costCenter}</TableCell>
                                        <TableCell>{delivery.address}</TableCell>
                                        <TableCell>{delivery.address}</TableCell>
                                        <TableCell>{delivery.address}</TableCell>
                                        <TableCell>{delivery.status}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <Button className="bg-transparent text-fontHeading hover:text-white">
                                                        <MoreHorizontal/>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => setOpenViewDetailsModal(true)}>View Details</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => setOpenShippedModal(true)}>Shipped</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => setOpenReceivedModal(true)}>Received</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => setOpenCancelModal(true)}>DR Cancel</DropdownMenuItem>
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

export default DeliveryOverview