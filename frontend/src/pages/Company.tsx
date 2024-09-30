/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { MoreHorizontal, Pencil, Plus, Search, Trash } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger  } from "@/Components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import { useCallback, useEffect, useState } from "react";
import AddCompanyModal from "@/modals/AddCompanyModal";
import EditCompanyModal from "@/modals/EditCompanyModal";
import DeleteConfirmation from "@/modals/DeleteConfirmation";
import DeactivateConfirmation from "@/modals/DeactivateConfirmation";
import SearchCompanyModal from "@/modals/SearchCompanyModal";
import type CompanyType from "@/interface/company";
import { fetchData, getVersion } from "@/lib/utils";
import { useAppDispatch } from "@/store/store";
import { logout } from "@/slices/userSlice";
import useDebounce from "@/hooks/useDebounce";

function Company() {
    const [openModal, setOpenModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openDeactivateModal, setOpenDeactivateModal] = useState(false);
    
    const [openSearchModal, setOpenSearchModal] = useState(false);
    const [searchCompany, setSearchCompany] = useState<CompanyType | null>(null);
    const [companies, setCompanies] = useState<CompanyType[]>([])
    const [editCompany, setEditCompany] = useState<CompanyType | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedQuery = useDebounce(searchQuery, 250);

    const [deleteCompany, setDeleteCompany] = useState<CompanyType | null>(null);
    const [toggleCompany, setToggleCompany] = useState<CompanyType | null>(null);

    const [filteredCompany, setFilteredCompany] = useState<CompanyType[]>([]);

    const itemsPerPage = 17;
    const [maxPage, setMaxPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useAppDispatch();

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDelete = (company: CompanyType | null) => {
        if (company) {
            setCompanies((prevCompanies) =>
                prevCompanies.filter((c) => c.id !== company.id)
            );
            setDeleteCompany(null);
        }
    }

    const handleToggle = (company: CompanyType | null) => {
        if (company) {
          setCompanies((prevCompanies) =>
            prevCompanies.map((c) =>
              c.id === company.id ? { ...c, active_status: !c.active_status } : c
            )
          );
        }
      };

    const updateCompany = (updatedCompany: CompanyType | null) => {
        if (updatedCompany) {
            setCompanies(prevCompanies =>
                prevCompanies.map(company =>
                    company.id === updatedCompany.id ? updatedCompany : company
                )
            );
            setEditCompany(null);
        }
      };

    const loadCompanies = useCallback(() => {
        fetchData({
          url: `${getVersion()}/company/list`,
          query: { limit: itemsPerPage, page: currentPage },
          onSuccess: (data) => {
            setCompanies(data.companies);
            setMaxPage(data.misc.maxPage);
          },
          dispatch,
          logout: () => dispatch(logout())
        });
      }, [itemsPerPage, currentPage, dispatch]);
    
      useEffect(() => {
        loadCompanies();
      }, [loadCompanies]);


    useEffect(() => {
        if (debouncedQuery.trim() !== "") {
            fetchData({
                url: `${getVersion()}/company/search`,
                query: {name: debouncedQuery },
                onSuccess: (data) => {
                    setFilteredCompany(data.companies.slice(0, 10));
                },
                dispatch,
                logout: () => dispatch(logout())
            });
        } else {
            setFilteredCompany([]);
        }
    }, [debouncedQuery, dispatch]);

    const handleSelectCompany = (company: CompanyType) => {
        setSearchCompany(company);
        setOpenSearchModal(true);
        setSearchQuery("");
        setFilteredCompany([]);
    }

    const addCompany = (company: CompanyType) => {
        if (company) {
            setCompanies(prevCompanies => [...prevCompanies, company]);
        }
    }

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
                                <Input
                                    type="search"
                                    placeholder="Search Category"
                                    className="pl-12 border-2 focus:border-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                {filteredCompany.length > 0 && (
                                    <div className="absolute bg-white border border-gray-300 mt-1 w-full z-10 max-h-40 overflow-y-auto text-sm">
                                        {filteredCompany.map((company) => (
                                            <div
                                                key={company.id}
                                                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                                onClick={() => handleSelectCompany(company)}
                                            >
                                                {company.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>   
                            <Button className="bg-hoverCream text-fontHeading border hover:text-white font-semibold w-48" onClick={() => setOpenModal(true)}>
                                <Plus size={20}/><span className="text-sm">Add Company</span>
                            </Button>
                        </div>    
                    </div>
                </div>
                <div className="mt-5 overflow-y-auto" style={{ maxHeight: `calc(100vh - ${70 + 270}px)` }}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Company Name</TableHead>
                                <TableHead>Active Status</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {companies.map(company => (
                                <TableRow key={company.id}>
                                    <TableCell>{company.name}</TableCell>
                                    <TableCell>{company.active_status ? 'Active' : 'Inactive'}</TableCell>
                                    <TableCell className="flex flex-row items-center justify-center">
                                        <Button className="bg-transparent text-black hover:text-white" onClick={()=> {
                                            setEditCompany(company);
                                            setEditModal(true);
                                        }}><Pencil/>
                                        </Button>
                                        <Button className="bg-transparent text-black hover:text-white" onClick={() => {
                                            setDeleteCompany(company);
                                            setOpenDeleteModal(true);
                                        }}><Trash/></Button>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <Button className="bg-transparent text-fontHeading hover:text-white">
                                                    <MoreHorizontal/>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem onClick={() => {
                                                    setToggleCompany(company);
                                                    setOpenDeactivateModal(true);
                                                }}>{company.active_status ? 'Deactivate' : 'Activate'}</DropdownMenuItem>
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
            {openModal && <AddCompanyModal addCompany={addCompany} onClose={() => setOpenModal(false)}/>}
            {editModal && <EditCompanyModal updateCompany={updateCompany} company={editCompany} onClose={() => setEditModal(false)}/>}
            {openDeleteModal && <DeleteConfirmation handleDelete={() => handleDelete(deleteCompany)} link={`company/delete/${deleteCompany?.id || 0}`} open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}/>}
            {openDeactivateModal && <DeactivateConfirmation active_status={toggleCompany?.active_status || true} handleToggle={() => handleToggle(toggleCompany)} link={`company/toggle/${toggleCompany?.id || 0}`} open={openDeactivateModal} onClose={() => setOpenDeactivateModal(false)} />}
            {openSearchModal && <SearchCompanyModal company={searchCompany} onClose={() => {setOpenSearchModal(false); setSearchCompany(null);}}/>}
        </div>
    );
}

export default Company