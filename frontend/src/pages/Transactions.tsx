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
    { id: 1, deliveryNumber: "100230457", shippedBy: "Jane Doe", shippedDate: "01/02/24", receivedBy: "Jack Sparrow", receivedDate: "02/10/24", status: "Received" },
    { id: 2, deliveryNumber: "100230458", shippedBy: "John Smith", shippedDate: "01/15/24", receivedBy: "Alice Johnson", receivedDate: "02/12/24", status: "Received" },
    { id: 3, deliveryNumber: "100230459", shippedBy: "Sarah Connor", shippedDate: "01/25/24", receivedBy: "Bob Brown", receivedDate: "02/15/24", status: "Pending" },
    { id: 4, deliveryNumber: "100230460", shippedBy: "Michael Scott", shippedDate: "02/01/24", receivedBy: "Pam Beesly", receivedDate: "02/18/24", status: "Received" },
    { id: 5, deliveryNumber: "100230461", shippedBy: "Laura Palmer", shippedDate: "02/05/24", receivedBy: "James Hurley", receivedDate: "02/20/24", status: "Pending" },
    { id: 6, deliveryNumber: "100230462", shippedBy: "Tom Riddle", shippedDate: "02/10/24", receivedBy: "Harry Potter", receivedDate: "02/22/24", status: "Received" },
    { id: 7, deliveryNumber: "100230463", shippedBy: "Walter White", shippedDate: "02/15/24", receivedBy: "Jesse Pinkman", receivedDate: "02/25/24", status: "Received" },
    { id: 8, deliveryNumber: "100230464", shippedBy: "Tony Stark", shippedDate: "02/18/24", receivedBy: "Steve Rogers", receivedDate: "02/28/24", status: "Pending" },
    { id: 9, deliveryNumber: "100230465", shippedBy: "Bruce Wayne", shippedDate: "02/20/24", receivedBy: "Clark Kent", receivedDate: "03/01/24", status: "Received" },
    { id: 10, deliveryNumber: "100230466", shippedBy: "Natasha Romanoff", shippedDate: "02/22/24", receivedBy: "Clint Barton", receivedDate: "03/05/24", status: "Pending" },
    { id: 11, deliveryNumber: "100230467", shippedBy: "Peter Parker", shippedDate: "02/25/24", receivedBy: "Mary Jane", receivedDate: "03/10/24", status: "Received" },
    { id: 12, deliveryNumber: "100230468", shippedBy: "Diana Prince", shippedDate: "03/01/24", receivedBy: "Bruce Banner", receivedDate: "03/15/24", status: "Received" },
    { id: 13, deliveryNumber: "100230469", shippedBy: "Clark Kent", shippedDate: "03/05/24", receivedBy: "Lois Lane", receivedDate: "03/20/24", status: "Pending" },
    { id: 14, deliveryNumber: "100230470", shippedBy: "Bruce Banner", shippedDate: "03/10/24", receivedBy: "Thor Odinson", receivedDate: "03/25/24", status: "Received" },
    { id: 15, deliveryNumber: "100230471", shippedBy: "Barry Allen", shippedDate: "03/15/24", receivedBy: "Iris West", receivedDate: "03/30/24", status: "Pending" },
    { id: 16, deliveryNumber: "100230472", shippedBy: "Oliver Queen", shippedDate: "03/20/24", receivedBy: "Felicity Smoak", receivedDate: "04/05/24", status: "Received" },
    { id: 17, deliveryNumber: "100230473", shippedBy: "Hal Jordan", shippedDate: "03/25/24", receivedBy: "John Stewart", receivedDate: "04/10/24", status: "Pending" },
    { id: 18, deliveryNumber: "100230474", shippedBy: "Arthur Curry", shippedDate: "03/30/24", receivedBy: "Mera", receivedDate: "04/15/24", status: "Received" },
    { id: 19, deliveryNumber: "100230475", shippedBy: "Lex Luthor", shippedDate: "04/05/24", receivedBy: "Lena Luthor", receivedDate: "04/20/24", status: "Pending" },
    { id: 20, deliveryNumber: "100230476", shippedBy: "Harvey Dent", shippedDate: "04/10/24", receivedBy: "Rachel Dawes", receivedDate: "04/25/24", status: "Received" },
    { id: 21, deliveryNumber: "200230477", shippedBy: "Bane", shippedDate: "04/15/24", receivedBy: "Talia al Ghul", receivedDate: "04/30/24", status: "Pending" }
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
                        <h1 className="text-2xl font-bold">Transaction</h1>
                        <p className="text-sm font-semibold text-[#9E9E9E]">Order / Transaction</p>
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
                                <Button className="bg-hoverCream text-fontHeading border hover:text-white space-x-1 font-semibold">
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
                                        <TableCell>{delivery.deliveryNumber}</TableCell>
                                        <TableCell>{delivery.shippedBy}</TableCell>
                                        <TableCell>{delivery.shippedDate}</TableCell>
                                        <TableCell>{delivery.receivedBy}</TableCell>
                                        <TableCell>{delivery.receivedDate}</TableCell>
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