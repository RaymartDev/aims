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
import AddTypeModal from "@/modals/AddTypesModal";
import DeleteConfirmation from "@/modals/DeleteConfirmation";
import SearchTypeModal from "@/modals/SearchTypeModal";
// import EditTypeModal from "@/modals/EditTypeModal";
import type TypeInterface from "@/interface/types";
import { fetchData, getVersion } from "@/lib/utils";
import EditTypeModal from "@/modals/EditTypeModal";
import { useAppDispatch } from "@/store/store";
import { logout } from "@/slices/userSlice";
import DeactivateConfirmation from "@/modals/DeactivateConfirmation";

function Types() {
    const [openModal, setOpenModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [viewType, setViewType] = useState<TypeInterface | null>(null);
    const [types, setTypes] = useState<TypeInterface[]>([])
    const [editType, setEditType] = useState<TypeInterface | null>(null);

    const [filteredType, setFilteredType] = useState<TypeInterface[]>([]);

    const itemsPerPage = 17;
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openDeactivateModal, setOpenDeactivateModal] = useState(false);
    const [deleteType, setDeleteType] = useState<TypeInterface | null>(null);
    const [toggleType, setToggleType] = useState<TypeInterface | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [maxPage, setMaxPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useAppDispatch();

    const loadTypes = useCallback(() => {
        fetchData({
          url: `${getVersion()}/material-type/list`,
          query: { limit: itemsPerPage, page: currentPage },
          onSuccess: (data) => {
            setTypes(data.materialTypes);
            setMaxPage(data.misc.maxPage);
          },
          dispatch,
          logout: () => dispatch(logout())
        });
      }, [itemsPerPage, currentPage, dispatch]);
    
      useEffect(() => {
        loadTypes();
      }, [loadTypes]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredType([]);
        } else {
            const filtered = types.filter((type) =>
                type.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredType(filtered.slice(0, 10));
        }
    }, [searchQuery, types]);

    const handleSelectType = (type: TypeInterface) => {
        setViewType(type);
        setOpenViewModal(true);
        setSearchQuery("");
        setFilteredType([]);
    };

    const handleDelete = (type: TypeInterface | null) => {
        if (type) {
            setTypes((prevCompanies) =>
                prevCompanies.filter((c) => c.id !== type.id)
            );
            setDeleteType(null);
        }
    }

    const handleToggle = (type: TypeInterface | null) => {
        if (type) {
            setTypes((prevCompanies) =>
            prevCompanies.map((c) =>
              c.id === type.id ? { ...c, active_status: !c.active_status } : c
            )
          );
        }
      };

    const updateType = (updatedType: TypeInterface | null) => {
        if (updatedType) {
            setTypes(prevTypes =>
                prevTypes.map(type =>
                    type.id === updatedType.id ? updatedType : type
                )
            );
            setEditType(null);
        }
    };

    const addType = (type: TypeInterface | null) => {
        if (type) {
            setTypes(prevTypes => [...prevTypes, type]);
        }
    }

    return(
        <div className="flex flex-col h-full">
            <div className="flex flex-col h-full relative">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">Types</h1>
                    <p className="text-sm font-semibold text-[#9E9E9E]">Product Types</p>
                </div>
                <div className="flex justify-center mt-10">
                    <div className="flex flex-row justify-between w-full">
                        <div className="w-fit flex items-center justify-start ">
                            <h1 className=" text-fontHeading font-bold">All Types</h1>
                        </div>
                        <div className="flex flex-row w-6/12 space-x-2">
                            <div className="relative w-10/12 ">
                                <Input
                                    type="search"
                                    placeholder="Search Type"
                                    className="pl-12 border-2 focus:border-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                {filteredType.length > 0 && (
                                    <div className="absolute bg-white border border-gray-300 mt-1 w-full z-10 max-h-40 overflow-y-auto text-sm">
                                        {filteredType.map((type) => (
                                            <div
                                                key={type.id}
                                                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                                onClick={() => handleSelectType(type)}
                                            >
                                                {type.description}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>   
                            <Button className="bg-hoverCream text-fontHeading border hover:text-white font-semibold w-48" onClick={() => setOpenModal(true)}>
                                <Plus size={20}/><span className="text-sm">Add Type</span>
                            </Button>
                        </div>    
                    </div>
                </div>
                <div className="mt-5 overflow-y-auto" style={{ maxHeight: `calc(100vh - ${70 + 270}px)` }}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Type Description</TableHead>
                                <TableHead>Active Status</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {types.map(type => (
                                <TableRow key={type.id}>
                                    <TableCell>{type.description}</TableCell>
                                    <TableCell>{type.active_status ? 'Active' : 'Inactive'}</TableCell>
                                    <TableCell className="flex flex-row items-center justify-center">
                                        <Button className="bg-transparent text-black hover:text-white" onClick={()=> {
                                            setEditType(type);
                                            setEditModal(true);
                                        }}><Pencil/>
                                        </Button>
                                        <Button className="bg-transparent text-black hover:text-white" onClick={() => {
                                            setDeleteType(type);
                                            setOpenDeleteModal(true);
                                        }}><Trash/></Button><DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <Button className="bg-transparent text-fontHeading hover:text-white">
                                                    <MoreHorizontal/>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                            <DropdownMenuItem onClick={() => {
                                                    setToggleType(type);
                                                    setOpenDeactivateModal(true);
                                                }}>{type.active_status ? 'Deactivate' : 'Activate'}</DropdownMenuItem>
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
            {openModal && <AddTypeModal addType={addType} onClose={() => setOpenModal(false)}/>}
            {editModal && <EditTypeModal updateType={updateType} type={editType} onClose={() => setEditModal(false)}/>}
            {openDeleteModal && <DeleteConfirmation handleDelete={() => handleDelete(deleteType)} link={`material-type/delete/${deleteType?.id || 0}`} open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}/>}
            {openDeactivateModal && <DeactivateConfirmation active_status={toggleType?.active_status || true} handleToggle={() => handleToggle(toggleType)} link={`material-type/toggle/${toggleType?.id || 0}`} open={openDeactivateModal} onClose={() => setOpenDeactivateModal(false)} />}
            {openViewModal && <SearchTypeModal type={viewType} onClose={() => {setOpenViewModal(false); setViewType(null);}}/>}
        </div>
    );
}

export default Types;
