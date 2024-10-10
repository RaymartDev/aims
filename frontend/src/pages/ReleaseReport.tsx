/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
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
import { formatDateAsString, formatReleaseStatus, fetchData as fetchItem, getVersion, formatReference, fetchData } from "@/lib/utils";
import { useAppDispatch } from "@/store/store";
import { logout } from "@/slices/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import SearchReleaseModal from "@/modals/SearchReleaseModal";
import useDebounce from "@/hooks/useDebounce";

function ReleaseReport() {
    const [cancelRelease, setCancelRelease] = useState<ReleaseType | null>(null);
    const [receiveRelease, setReceiveRelease] = useState<ReleaseType | null>(null);
    const [shipRelease, setShipRelease] = useState<ReleaseType | null>(null);
    const [viewRelease, setViewRelease] = useState<ReleaseType | null>(null);
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

    const [filteredRelease, setFilteredRelease] = useState<ReleaseType[]>([]);
    const debouncedQuery = useDebounce(searchQuery, 250);
    const [openSearchModal, setOpenSearchModal] = useState(false);
    const [searchRelease, setSearchRelease] = useState<ReleaseType | null>(null);

    const handleCancel = async (request: any, id: number) => {
        try {
            const response = await axios.put(`${getVersion()}/release-receipt/cancel/${id}`, {
              ...request,
            });
            if (response.status >= 200 && response.status < 300) {
                toast.success(response.data?.message || 'Successfully cancelled!');
    
                const { materialIds, relead_to, date_out } = request;
    
                setReleases((prevReleases) => {
                    return prevReleases.map((release) => {
                        if (release.id === id) {
                            const isFullCancel = release.details.every((item: any) => materialIds.includes(item.material_id));
    
                            if (isFullCancel) {
                                // Full cancellation
                                return {
                                    ...release,
                                    status: 4,
                                    relead_to,
                                    date_out: new Date(date_out),
                                };
                            } else {
                                // Partial cancellation: Create a new release for the cancelled items
                                const newRelease = {
                                    ...release,
                                    id: Date.now(), // Temporary ID, could be updated after actual creation
                                    status: 4,
                                    relead_to,
                                    date_out: new Date(date_out),
                                    details: release.details.filter((item: any) => materialIds.includes(item.material_id)),
                                };
    
                                // Update the existing release by removing the cancelled items
                                const updatedRelease = {
                                    ...release,
                                    details: release.details.filter((item: any) => !materialIds.includes(item.material_id)),
                                };
    
                                // Return both releases
                                return [updatedRelease, newRelease];
                            }
                        }
                        return release; // Return unchanged release
                    }).flat(); // Flatten the array in case we return two releases for partial cancellation
                });
                setCancelRelease(null);
                setOpenCancelModal(false);
            }
          } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message || 'Something went wrong');
              } else {
                toast.error('Something went wrong');
            }
          }
    }

  const handleShip = async (request: any, id: number) => {
    try {
      const response = await axios.put(`${getVersion()}/release-receipt/ship/${id}`, {
        ...request,
      });
      if (response.status >= 200 && response.status < 300) {
        toast.success(response.data?.message || 'Successfully shipped!.');
        setReleases((prevReleases) => {
            return prevReleases.map(release => {
              if (release.id === id) {
                const newStatus = request.received_by ? 3 : 1; // Check if received_by is not null
                return {
                  ...release,
                  status: newStatus,
                  shipped_by: { name: request.name, date: new Date(request.date) }
                };
              }
              return release; // Return the release unchanged
            });
          });
        setShipRelease(null);
        setOpenShippedModal(false);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
          toast.error(err.response?.data?.message || 'Something went wrong');
        } else {
          toast.error('Something went wrong');
      }
    }
  }

  const handleReceive = async (request: any, id: number) => {
    try {
      const response = await axios.put(`${getVersion()}/release-receipt/receive/${id}`, {
        ...request,
      });
      if (response.status >= 200 && response.status < 300) {
        toast.success(response.data?.message || 'Successfully received!.');
        setReleases((prevReleases) => {
            return prevReleases.map(release => {
              if (release.id === id) {
                const newStatus = request.received_by ? 3 : 2; // Check if received_by is not null
                return {
                  ...release,
                  status: newStatus,
                  received_by: { name: request.name, date: new Date(request.date) }
                };
              }
              return release; // Return the release unchanged
            });
          });
          setReceiveRelease(null);
          setOpenReceivedModal(false);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
          toast.error(err.response?.data?.message || 'Something went wrong');
        } else {
          toast.error('Something went wrong');
      }
    }
  }

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

    useEffect(() => {
        if (debouncedQuery.trim() !== "") {
            fetchData({
                url: `${getVersion()}/release-receipt/search`,
                query: {release: debouncedQuery },
                onSuccess: (data) => {
                    setFilteredRelease(data.releases.slice(0, 10));
                },
                dispatch,
                logout: () => dispatch(logout())
            });
        } else {
            setFilteredRelease([]);
        }
    }, [debouncedQuery, dispatch]);
    

    const handleSelectRelease = (release: ReleaseType) => {
        setSearchRelease(release);
        setOpenSearchModal(true);
        setSearchQuery("");
        setFilteredRelease([]);
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
                                    <Input
                                        type="search"
                                        placeholder="Search DR Number"
                                        className="pl-12 border-2 focus:border-none"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    {filteredRelease.length > 0 && (
                                        <div className="absolute bg-white border border-gray-300 mt-1 w-full z-10 max-h-40 overflow-y-auto text-sm">
                                            {filteredRelease.map((release) => (
                                                <div
                                                    key={release.id}
                                                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                                    onClick={() => handleSelectRelease(release)}
                                                >
                                                    {release.release_number}
                                                </div>
                                            ))}
                                        </div>
                                    )}
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
                                        <TableCell>{formatReference(release.release_number)}</TableCell>
                                        <TableCell>{release.requestor.name}</TableCell>
                                        <TableCell>{release.requestor.employee_no}</TableCell>
                                        <TableCell>{release.requestor.cost_center_code}</TableCell>
                                        <TableCell>{release.shipped_by ? release.shipped_by.name : ''}</TableCell>
                                        <TableCell>{release.shipped_by ? formatDateAsString(new Date(release.shipped_by.date)) : ''}</TableCell>
                                        <TableCell>{release.received_by ? release.received_by.name : ''}</TableCell>
                                        <TableCell>{release.received_by ? formatDateAsString(new Date(release.received_by.date)) : ''}</TableCell>
                                        <TableCell>{formatReleaseStatus(release.status)}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <Button className="bg-transparent text-fontHeading hover:text-white">
                                                        <MoreHorizontal/>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => {
                                                        setViewRelease(release);
                                                        setOpenViewDetailsModal(true);
                                                    }}>View Details</DropdownMenuItem>
                                                    <DropdownMenuItem disabled={release.status === 1 || release.status === 3 || release.status === 4} onClick={() => {
                                                        setShipRelease(release);
                                                        setOpenShippedModal(true);
                                                    }}>Shipped</DropdownMenuItem>
                                                    <DropdownMenuItem disabled={release.status === 2 || release.status === 3 || release.status === 4} onClick={() => {
                                                        setReceiveRelease(release);
                                                        setOpenReceivedModal(true);
                                                    }}>Received</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => {
                                                        setCancelRelease(release);
                                                        setOpenCancelModal(true);
                                                    }}>Cancel</DropdownMenuItem>
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
            {openViewDetailsModal && <ViewDetailsModal release={viewRelease} open={openViewDetailsModal} onClose={() => {
                setViewRelease(null);
                setOpenViewDetailsModal(false);
            }}/>}
            {openShippedModal && <ShippedModal handleShip={handleShip} release={shipRelease} open={openShippedModal} onClose={() => {
                setShipRelease(null);
                setOpenShippedModal(false);
            }}/>}
            {openReceivedModal && <ReceivedModal handleReceive={handleReceive} release={receiveRelease} open={openReceivedModal} onClose={() => {
                setReceiveRelease(null);
                setOpenReceivedModal(false);
            }}/>}
            {openCancelModal && <CancelModal handleCancel={handleCancel} release={cancelRelease} open={openCancelModal} onClose={() => {
                setCancelRelease(null);
                setOpenCancelModal(false);
            }}/>}
            {openSearchModal && <SearchReleaseModal release={searchRelease} onClose={() => {setOpenSearchModal(false); setSearchRelease(null);}}/>}
        </>
    );
}

export default ReleaseReport