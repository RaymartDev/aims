/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useCallback, useEffect, useState } from "react";
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
import type ReleaseType from "@/interface/release";
import { formatDateAsString, formatReleaseStatus, fetchData as fetchItem, getVersion } from "@/lib/utils";
import { useAppDispatch } from "@/store/store";
import { logout } from "@/slices/userSlice";


function ReleaseReport() {
    const [openViewDetailsModal, setOpenViewDetailsModal] = useState(false);
    const [openShippedModal, setOpenShippedModal] = useState(false);
    const [openReceivedModal, setOpenReceivedModal] = useState(false);
    const [openCancelModal, setOpenCancelModal] = useState(false);
    const [releases, setReleases] = useState<ReleaseType[]>([]);
    const [maxPage, setMaxPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const headerHeight = 72;
    const itemsPerPage = 17;
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useAppDispatch();

    const loadReleases = useCallback(() => {
        fetchItem({
          url: `${getVersion()}/release-receipt/list`,
          query: { limit: itemsPerPage, page: currentPage }, 
          onSuccess: (data) => {
            setReleases(data.releases);
            setMaxPage(data.misc.maxPage);
          },
          dispatch,
          logout: () => dispatch(logout())
        });
      }, [itemsPerPage, currentPage, dispatch]);
    
      useEffect(() => {
        loadReleases();
      }, [loadReleases]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }; 
    return(
        <>
            <div className="flex flex-col h-full">
                <div className="flex flex-col h-full relative">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">Release Report</h1>
                        <p className="text-sm font-semibold text-[#9E9E9E]">Transaction / Release Report</p>
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
                                    <TableHead>Requestor Name</TableHead>
                                    <TableHead>Employee Number</TableHead>
                                    <TableHead>Cost Center Number</TableHead>
                                    <TableHead>Shipped By</TableHead>
                                    <TableHead>Shipped Date</TableHead>
                                    <TableHead>Received By</TableHead>
                                    <TableHead>Received Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {releases.map(release => (
                                    <TableRow key={release.id}>
                                        <TableCell>{release.release_number}</TableCell>
                                        <TableCell>{release.requestor.name}</TableCell>
                                        <TableCell>{release.requestor.employee_no}</TableCell>
                                        <TableCell>{release.requestor.cost_center_code}</TableCell>
                                        <TableCell>{release.shipped_by ? release.shipped_by.name : ''}</TableCell>
                                        <TableCell>{release.shipped_by ? formatDateAsString(release.shipped_by.date) : ''}</TableCell>
                                        <TableCell>{release.received_by ? release.received_by.name : ''}</TableCell>
                                        <TableCell>{release.received_by ? formatDateAsString(release.received_by.date) : ''}</TableCell>
                                        <TableCell>{formatReleaseStatus(release.status)}</TableCell>
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
                            {Array.from({ length: maxPage }, (_, index) => (
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
                            {currentPage < maxPage && (
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

export default ReleaseReport