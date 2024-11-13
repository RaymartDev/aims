
/* eslint-disable @typescript-eslint/no-unsafe-call */

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
import type ReturnType from "@/interface/return";
import ExportReturn from "@/modals/ExportReturn";
import { formatReference, fetchData as fetchItem, getVersion, fetchData, formatReleaseStatus } from "@/lib/utils";
import { useAppDispatch } from "@/store/store";
import { logout } from "@/slices/userSlice";
import ViewReturnModal from "@/modals/ViewReturnModal";
import SearchReturnModal from "@/modals/SearchReturnModal";
import useDebounce from "@/hooks/useDebounce";
  
function ReturnReport() {
    const [openViewDetailsModal, setOpenViewDetailsModal] = useState(false);
    const [openSearchModal, setOpenSearchModal] = useState(false);
    const [openReturnModal, setOpenReturnModal]= useState(false);
    const [returns, setReturns] = useState<ReturnType[]>([]);
    const [maxPage, setMaxPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredReturn, setFilteredReturn] = useState<ReturnType[]>([]);
    const debouncedQuery = useDebounce(searchQuery, 250);
    const [searchRelease, setSearchRelease] = useState<ReturnType | null>(null);

    const headerHeight = 72;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const dispatch = useAppDispatch();
    const itemsPerPage = 17;

    const loadReleases = useCallback(() => {
        fetchItem({
          url: `${getVersion()}/return-receipt/list`,
          query: { limit: itemsPerPage, page: currentPage }, 
          onSuccess: (data) => {
            setReturns(data.returns);
            setMaxPage(data.misc.maxPage);
          },
          dispatch,
          logout: () => dispatch(logout())
        });
      }, [itemsPerPage, currentPage, dispatch]);
    
      useEffect(() => {
        loadReleases();
      }, [loadReleases]);

      useEffect(() => {
        if (debouncedQuery.trim() !== "") {
            fetchData({
                url: `${getVersion()}/return-receipt/search`,
                query: {returnQuery: debouncedQuery },
                onSuccess: (data) => {
                    setFilteredReturn(data.returns.slice(0, 10));
                },
                dispatch,
                logout: () => dispatch(logout())
            });
        } else {
            setFilteredReturn([]);
        }
    }, [debouncedQuery, dispatch]);

    const handleSelectReturn = (returnQuery: ReturnType) => {
        setSearchRelease(returnQuery);
        setOpenSearchModal(true);
        setSearchQuery("");
        setFilteredReturn([]);
    };

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
                                <h1 className=" text-fontHeading font-bold">Acknowledge Receipt Masterlist</h1>
                            </div>
                            <div className="flex flex-row justify-end w-6/12 space-x-2">
                                <div className="relative w-2/3">
                                    <Input
                                        type="search"
                                        placeholder="Search AR Number"
                                        className="pl-12 border-2 focus:border-none"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    {filteredReturn.length > 0 && (
                                        <div className="absolute bg-white border border-gray-300 mt-1 w-full z-10 max-h-40 overflow-y-auto text-sm">
                                            {filteredReturn.map((returnQuery) => (
                                                <div
                                                    key={returnQuery.id}
                                                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                                    onClick={() => handleSelectReturn(returnQuery)}
                                                >
                                                    {formatReference(returnQuery.release_number)} - {returnQuery.return_number}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div> 
                                <Button className="bg-hoverCream text-fontHeading border hover:text-white space-x-1 font-semibold w-36">
                                    <Download size={20}/><span className="text-sm" onClick={() => setOpenReturnModal(true)}>Export</span>
                                </Button>  
                            </div>    
                        </div>
                    </div>
                    <div className="mt-5 overflow-y-auto" style={{ maxHeight: `calc(100vh - ${headerHeight + 270}px)` }}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>AR Number</TableHead>
                                    <TableHead>DR Number</TableHead>
                                    <TableHead>Requestor Name</TableHead>
                                    <TableHead>Tagged Item As</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {returns.map(arReturn => (
                                    <TableRow key={arReturn.id}>
                                        <TableCell>{formatReference(arReturn.return_number)}</TableCell>
                                        <TableCell>{formatReference(arReturn.release_number)}</TableCell>
                                        <TableCell>{arReturn.requestor.name}</TableCell>
                                        <TableCell>{arReturn.tag}</TableCell>
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
                {openReturnModal && <ExportReturn open={openReturnModal} onClose={() => setOpenReturnModal(false)} link="your-link-here" />}
                {openViewDetailsModal && <ViewReturnModal onClose={() => {
                    setOpenViewDetailsModal(false);
                }}/>}
                {openSearchModal && <SearchReturnModal 
                returns={searchRelease} 
                onClose={() => {
                    setOpenSearchModal(false); 
                    setSearchRelease(null);
                }}/>}
            </div>
        </>
    );
}

export default ReturnReport