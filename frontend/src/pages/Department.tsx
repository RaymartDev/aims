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
import AddDepartmentModal from "@/modals/AddDepartmentModal";
import EditDepartmentModal from "@/modals/EditDepartmentModal";
import DeleteConfirmation from "@/modals/DeleteConfirmation";
import DeactivateConfirmation from "@/modals/DeactivateConfirmation";
import SearchDepartmentModal from "@/modals/SearchDepartmentModal";
import type DepartmentType from "@/interface/department";
import { fetchData, getVersion } from "@/lib/utils";
import { useAppDispatch } from "@/store/store";
import { logout } from "@/slices/userSlice";

function Department() {
    const [openModal, setOpenModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editDepartment, setEditDepartment] = useState<DepartmentType | null>(null);
    const [openDeleteModal, setopenDeleteModal] = useState(false);
    const [openDeactivateModal, setOpenDeativateModal] = useState(false);
    const [openSearchModal, setOpenSearchModal] = useState(false);
    const [searchDepartment, setSearchDepartment] = useState<DepartmentType | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [departments, setDepartments] = useState<DepartmentType[]>([]);

    const [filteredDepartment, setFilteredDepartment] = useState<DepartmentType[]>([])

    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const itemsPerPage = 17;
    const dispatch = useAppDispatch();

    const loadDepartments = useCallback(() => {
        fetchData({
          url: `${getVersion()}/department/list`,
          query: { limit: itemsPerPage, page: currentPage },
          onSuccess: (data) => {
            setDepartments(data.departments);
            setMaxPage(data.misc.maxPage);
          },
          dispatch,
          logout: () => dispatch(logout())
        });
      }, [itemsPerPage, currentPage, dispatch]);
    
      useEffect(() => {
        loadDepartments();
      }, [loadDepartments]);

      useEffect(() => {
        if (searchQuery.trim() !== "") {
            fetchData({
                url: `${getVersion()}/department/search`,
                query: {name: searchQuery },
                onSuccess: (data) => {
                    setFilteredDepartment(data.departments.slice(0, 10));
                },
                dispatch,
                logout: () => dispatch(logout())
            });
        } else {
            setFilteredDepartment([]);
        }
    }, [searchQuery, dispatch]);

    const handleSelectDepartment = (department: DepartmentType) => {
        setSearchDepartment(department);
        setOpenSearchModal(true);
        setSearchQuery(""); 
        setFilteredDepartment([]); 
    };

    const updateDepartment = (updatedDepartment: DepartmentType | null) => {
    if (updatedDepartment) {
        setDepartments(prevDepartments =>
            prevDepartments.map(department =>
                department.id === updatedDepartment.id ? updatedDepartment : department
            )
        );
        setEditDepartment(null);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const addDepartment = (department: DepartmentType | null) => {
        if (department) {
            setDepartments(prevDepartments => [...prevDepartments, department]);
        }
    };

    return(
        <div className="flex flex-col h-full">
            <div className="flex flex-col h-full relative">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">Department</h1>
                    <p className="text-sm font-semibold text-[#9E9E9E]">Miscellaneous / Department</p>
                </div>
                <div className="flex justify-center mt-10">
                    <div className="flex flex-row justify-between w-full">
                        <div className="w-fit flex items-center justify-start ">
                            <h1 className=" text-fontHeading font-bold">All Department</h1>
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
                                {filteredDepartment.length > 0 && (
                                    <div className="absolute bg-white border border-gray-300 mt-1 w-full z-10 max-h-40 overflow-y-auto text-sm">
                                        {filteredDepartment.map((department) => (
                                            <div
                                                key={department.id}
                                                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                                onClick={() => handleSelectDepartment(department)}
                                            >
                                                {department.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>   
                            <Button className="bg-hoverCream text-fontHeading border hover:text-white font-semibold w-48" onClick={() => setOpenModal(true)}>
                                <Plus size={20}/><span className="text-sm">Add Department</span>
                            </Button>
                        </div>    
                    </div>
                </div>
                <div className="mt-5 overflow-y-auto" style={{ maxHeight: `calc(100vh - ${70 + 270}px)` }}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Department</TableHead>
                                <TableHead>Active Status</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {departments.map(department => (
                                <TableRow key={department.id}>
                                    <TableCell>{department.name}</TableCell>
                                    <TableCell>{department.active_status ? 'Active' : 'Inactive'}</TableCell>
                                    <TableCell className="flex flex-row items-center justify-center">
                                        <Button className="bg-transparent text-black hover:text-white" onClick={() => {
                                            setEditDepartment(department);
                                            setEditModal(true);
                                        }}><Pencil/>
                                        </Button>
                                        <Button className="bg-transparent text-black hover:text-white" onClick={() => setopenDeleteModal(true)}><Trash/></Button>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <Button className="bg-transparent text-fontHeading hover:text-white">
                                                    <MoreHorizontal/>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem onClick={() => setOpenDeativateModal(true)}>{department.active_status ? 'Deactivate' : 'Activate'}</DropdownMenuItem>
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
            {openModal && <AddDepartmentModal addDepartment={addDepartment} onClose={() => setOpenModal(false)}/>}
            {editModal && <EditDepartmentModal updateDepartment={updateDepartment} department={editDepartment} onClose={() => setEditModal(false)}/>}
            {openDeleteModal && <DeleteConfirmation open={openDeleteModal} onClose={() => setopenDeleteModal(false)}/>}
            {openDeactivateModal && <DeactivateConfirmation open={openDeactivateModal} onClose={() => setOpenDeativateModal(false)}/>}
            {openSearchModal && <SearchDepartmentModal department={searchDepartment} onClose={() => {setOpenSearchModal(false); setSearchDepartment(null);}}/>}
        </div>
    );
}

export default Department