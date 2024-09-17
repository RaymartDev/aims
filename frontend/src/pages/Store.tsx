/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { MoreHorizontal, Pencil, Plus, Search, Trash } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import AddStoreModal from "@/modals/AddStoreModal";
import EditStoreModal from "@/modals/EditStoreModal";
import ViewStoreModal from "@/modals/ViewStoreModal"
import DeleteConfirmation from "@/modals/DeleteConfirmation";
import SearchStoreModal from "@/modals/SearchStoreModal";
import type StoreType from "@/interface/store";
import UserRegistrationStore from "@/modals/UserRegistrationStore";
import { fetchData, getVersion } from "@/lib/utils";
import { useAppDispatch } from "@/store/store";
import { logout } from "@/slices/userSlice";

function Store() {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openUserRegModal, setOpenUserRegModal] = useState(false)
    const [stores, setStores] = useState<StoreType[]>([]);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [openDeleteModal, setopenDeleteModal] = useState(false);
    const [openSearchModal, setOpenSearchModal] = useState(false);
    const [searchStore, setSearchStore] = useState<StoreType | null>(null);
    const [viewStore, setViewStore] = useState<StoreType | null>(null);
    const [editStore, setEditStore] = useState<StoreType | null>(null);
    const [regStore, setRegStore] = useState<StoreType | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const [filteredStores, setFilteredStores] = useState<StoreType[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const itemsPerPage = 17;
    const dispatch = useAppDispatch();

    const loadStores = useCallback(() => {
        fetchData({
          url: `${getVersion()}/store/list`,
          query: { limit: itemsPerPage, page: currentPage }, 
          onSuccess: (data) => {
            setStores(data.stores);
            setMaxPage(data.misc.maxPage);
          },
          dispatch,
          logout: () => dispatch(logout())
        });
      }, [itemsPerPage, currentPage, dispatch]);
    
      useEffect(() => {
        loadStores();
      }, [loadStores]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredStores([]); 
        } else {
            const filtered = stores.filter((store) =>
                store.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredStores(filtered.slice(0, 10)); 
        }
    }, [searchQuery, stores]);

    const handleSelectStore = (store: StoreType) => {
        setSearchStore(store);
        setOpenSearchModal(true);
        setSearchQuery(""); 
        setFilteredStores([]); 
    };

    const updateStore = (updatedStore: StoreType | null) => {
        if (updatedStore) {
            setStores(prevStores =>
                prevStores.map(store =>
                    store.id === updatedStore.id ? updatedStore : store
                )
            );
            setEditStore(null);
        }
      };

    const registerStore = (id: number) => {
        setStores(prevStores => 
            prevStores.map(store => 
            store.id === id 
              ? { ...store, registered_status: true }  // Create a new object with the updated field
              : store  // Return the original object if no changes are needed
          )
        );
        setRegStore(null);
      };

      const addStore = (store: StoreType | null) => {
        if (store) {
            setStores(prevStores => [...prevStores, store]);
        }
      };

    return(
        <>
            <div className="flex flex-col h-full">
                <div className="flex flex-col h-full relative">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">Store</h1>
                        <p className="text-sm font-semibold text-[#9E9E9E]">Users / Store</p>
                    </div>
                    <div className="flex justify-center mt-10">
                        <div className="flex flex-row justify-between w-full">
                            <div className="w-fit flex items-center justify-start ">
                                <h1 className=" text-fontHeading font-bold">All Store</h1>
                            </div>
                            <div className="flex flex-row w-6/12 space-x-2">
                                <div className="relative w-10/12">
                                    <Input
                                        type="search"
                                        placeholder="Search Store Name"
                                        className="pl-12 border-2 focus:border-none"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    {filteredStores.length > 0 && (
                                        <div className="absolute bg-white border border-gray-300 mt-1 w-full z-10 max-h-40 overflow-y-auto text-sm">
                                            {filteredStores.map((store) => (
                                                <div
                                                    key={store.id}
                                                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                                    onClick={() => handleSelectStore(store)}
                                                >
                                                    {store.name} - {store.company_name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>   
                                <Button className="bg-hoverCream text-fontHeading border hover:text-white font-semibold w-40" 
                                    onClick={() => setOpenAddModal(true)}>
                                    <Plus size={20}/><span className="text-sm">Add Store</span>
                                </Button>
                            </div>    
                        </div>
                    </div>
                    <div className="mt-5 overflow-y-auto overflow-x-auto" style={{ maxHeight: `calc(100vh - ${72 + 270}px)` }}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Store Name</TableHead>
                                    <TableHead>Cost Center Code</TableHead>
                                    <TableHead>Address</TableHead>
                                    <TableHead>Registered Status</TableHead>
                                    <TableHead>Active Status</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {stores.map(store => (
                                    <TableRow key={store.id}>
                                        <TableCell>{store.company_name}</TableCell>
                                        <TableCell>{store.name}</TableCell>
                                        <TableCell>{store.cost_center_code}</TableCell>
                                        <TableCell>{store.address}</TableCell>
                                        <TableCell>{store.registered_status ? 'Registered' : 'Not Registered'}</TableCell>
                                        <TableCell>{store.active_status ? 'Active' : 'Inactive'}</TableCell>
                                        <TableCell className="flex flex-row items-center justify-center">
                                            <Button className="bg-transparent text-black hover:text-white" onClick={() => {
                                                setEditStore(store);
                                                setOpenEditModal(true);
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
                                                    <DropdownMenuItem onClick={() => {
                                                        setViewStore(store);
                                                        setOpenViewModal(true);
                                                    }}>View Details</DropdownMenuItem>
                                                    <DropdownMenuItem>{store.active_status ? 'Deactivate' : 'Activate'}</DropdownMenuItem>
                                                    <DropdownMenuItem disabled={store.registered_status} onClick={() => {
                                                        setRegStore(store);
                                                        setOpenUserRegModal(true);
                                                    }}>Register</DropdownMenuItem>
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
            {openAddModal && <AddStoreModal addStore={addStore} onClose={() => setOpenAddModal(false)}/>}
            {openUserRegModal && <UserRegistrationStore registerStore={registerStore} store={regStore} onClose={() => setOpenUserRegModal(false)}/>}
            {openEditModal && <EditStoreModal updateStore={updateStore} store={editStore} onClose={() => setOpenEditModal(false)}/>}
            {openDeleteModal && <DeleteConfirmation open={openDeleteModal} onClose={() => setopenDeleteModal(false)}/>}
            {openViewModal && <ViewStoreModal 
                store={viewStore}
                onClose={() => {
                    setViewStore(null);
                    setOpenViewModal(false);
            }}/>}
            {openSearchModal && <SearchStoreModal store={searchStore} onClose={() => {setOpenSearchModal(false); setSearchStore(null);}}/>}
        </>
    );
}


export default Store;