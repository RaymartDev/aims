/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Input } from "@/Components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { MoreHorizontal, Pencil, Plus, Search, Trash } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import AddSupplierModal from "@/modals/AddSupplierModal";
import AddSupplierModal2 from "@/modals/AddSupplierModal2";
import EditSupplierModal from "@/modals/EditSupplierModal";
import EditSupplierModal2 from "@/modals/EditSupplierModal2";
import ViewSupplierModal from "@/modals/ViewSupplierModal";
import ViewSupplierModal2 from "@/modals/ViewSupplierModal2";
import DeleteConfirmation from "@/modals/DeleteConfirmation";
import DeactivateConfirmation from "@/modals/DeactivateConfirmation";
import SearchSupplierModal from "@/modals/SearchSupplierModal";
import type SupplierType from "@/interface/supplier";
import { fetchData, getVersion } from "@/lib/utils";
import { useAppDispatch } from "@/store/store";
import { logout } from "@/slices/userSlice";



function Supplier() {
    const [suppliers, setSuppliers] = useState<SupplierType[]>([]);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openNextAddModal, setOpenNextAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openNextEditModal, setOpenNextEditModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [openDeleteModal, setopenDeleteModal] = useState(false);
    const [openDeactivateModal, setOpenDeativateModal] =useState(false);
    const [openNextViewModal, setOpenNextViewModal] = useState(false);
    const [openSearchModal, setOpenSearchModal] = useState(false);
    const [searchSupplier, setSearchSupplier] = useState<SupplierType | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [editSupplier, setEditSupplier] = useState<SupplierType | null>(null);
    const [maxPage, setMaxPage] = useState(1);
    const [viewSupplier, setViewSupplier] = useState<SupplierType | null>(null);

    const [filteredSupplier, setFilteredSupplier] = useState<SupplierType[]>([]);

    const [formData, setFormData] = useState({
        supplierCode: '',
        companyName: '',
        address: '',
        contractTerm: '',
        tinNumber: '',
        contactPerson: '',
        emailAddress: '',
        mobileNumber: '',
        businessTel: '',
        teleFaxNumber: '',
        cityTown: '',
        province: '',
        zipCode: '',
        remarks: '',
    })

    const [editFormData, setEditFormData] = useState({
        supplierCode: '',
        companyName: '',
        address: '',
        contractTerm: '',
        tinNumber: '',
        contactPerson: '',
        emailAddress: '',
        mobileNumber: '',
        businessTel: '',
        teleFaxNumber: '',
        cityTown: '',
        province: '',
        zipCode: '',
        remarks: '',
    })
    const itemsPerPage = 17;

    const dispatch = useAppDispatch();

    const loadSuppliers = useCallback(() => {
        fetchData({
          url: `${getVersion()}/supplier/list`,
          query: { limit: itemsPerPage, page: currentPage }, 
          onSuccess: (data) => {
            setSuppliers(data.suppliers);
            setMaxPage(data.misc.maxPage);
          },
          dispatch,
          logout: () => dispatch(logout())
        });
      }, [itemsPerPage, currentPage, dispatch]);
    
      useEffect(() => {
        loadSuppliers();
      }, [loadSuppliers]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredSupplier([]); 
        } else {
            const filtered = suppliers.filter((supplier) =>
                supplier.supplier_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                supplier.company_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredSupplier(filtered.slice(0, 10)); 
        }
    }, [searchQuery, suppliers]);

    const handleSelectSupplier = (supplier: SupplierType) => {
        setSearchSupplier(supplier);
        setOpenSearchModal(true);
        setSearchQuery("");
        setFilteredSupplier([]);
    };

    const addSupplier = (supplier: SupplierType | null) => {
        if (supplier) {
            setSuppliers(prevSuppliers => [...prevSuppliers, supplier]);
        }
    };

    const clearAddData = () => {
        setFormData({
            supplierCode: '',
            companyName: '',
            address: '',
            contractTerm: '',
            tinNumber: '',
            contactPerson: '',
            emailAddress: '',
            mobileNumber: '',
            businessTel: '',
            teleFaxNumber: '',
            cityTown: '',
            province: '',
            zipCode: '',
            remarks: '',
        })
    }

    const clearEditData = () => {
        setEditFormData({
            supplierCode: '',
            companyName: '',
            address: '',
            contractTerm: '',
            tinNumber: '',
            contactPerson: '',
            emailAddress: '',
            mobileNumber: '',
            businessTel: '',
            teleFaxNumber: '',
            cityTown: '',
            province: '',
            zipCode: '',
            remarks: '',
        });
    }

    const setEditSupplierData = (supplier: SupplierType | null) => {
        if (supplier) {
            setEditFormData({
                supplierCode: supplier.supplier_code,
                companyName: supplier.company_name,
                address: supplier.address,
                contractTerm: supplier.contract_term,
                tinNumber: supplier.tin_number,
                contactPerson: supplier.contact_person,
                emailAddress: supplier.email,
                mobileNumber: supplier.mobile_number,
                businessTel: supplier.business_number,
                teleFaxNumber: supplier.teleFax,
                cityTown: supplier.cityTown,
                province: supplier.province,
                zipCode: supplier.zip,
                remarks: supplier.remarks,
            });
            setEditSupplier(supplier);
        }
    }

    const updateSupplier = (updatedSupplier: SupplierType | null) => {
        if (updatedSupplier) {
            setSuppliers(prevSuppliers =>
                prevSuppliers.map(supplier =>
                    supplier.id === updatedSupplier.id ? updatedSupplier : supplier
                )
            );
            setEditSupplier(null);
        }
    };
      

    const handleNextAddModal = () => {
        setOpenAddModal(false);
        setOpenNextAddModal(true);
    };

    const handleAddBack = () => {
        setOpenNextAddModal(false);
        setOpenAddModal(true);
    };

    const handleNextEditModal = () => {
        setOpenEditModal(false);
        setOpenNextEditModal(true);
    };

    const handleEditBack = () => {
        setOpenNextEditModal(false);
        setOpenEditModal(true);
    };

    const handleNextViewModal = () => {
        setOpenViewModal(false);
        setOpenNextViewModal(true);
    };

    const handleViewBack = () => {
        setOpenNextViewModal(false);
        setOpenViewModal(true);
    };

    const handleAddDetailChange = (target: string, value: string) => {
        setFormData({
          ...formData, // Keep existing state
          [target]: value, // Dynamically update the field
        });
    };

    const getAddDataByKey = (key: string) => {
      return formData[key as keyof typeof formData] || '';
    };

    const handleEditDetailChange = (target: string, value: string) => {
        setEditFormData({
          ...editFormData, // Keep existing state
          [target]: value, // Dynamically update the field
        });
    };

    const getEditDataByKey = (key: string) => {
      return editFormData[key as keyof typeof editFormData] || '';
    };


    return(
        <>
            <div className="flex flex-col h-full">
                <div className="flex flex-col h-full relative">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">Supplier</h1>
                        <p className="text-sm font-semibold text-[#9E9E9E]">Users / Supplier</p>
                    </div>
                    <div className="flex justify-center mt-10">
                        <div className="flex flex-row justify-between w-full">
                            <div className="w-fit flex items-center justify-start ">
                                <h1 className=" text-fontHeading font-bold">All Supplier</h1>
                            </div>
                            <div className="flex flex-row w-6/12 space-x-2">
                                <div className="relative w-10/12">
                                    <Input
                                        type="search"
                                        placeholder="Search Supplier Code / Company Name"
                                        className="pl-12 border-2 focus:border-none"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    {filteredSupplier.length > 0 && (
                                        <div className="absolute bg-white border border-gray-300 mt-1 w-full z-10 max-h-40 overflow-y-auto text-sm">
                                            {filteredSupplier.map((supplier) => (
                                                <div
                                                    key={supplier.id}
                                                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                                    onClick={() => handleSelectSupplier(supplier)}
                                                >
                                                    {supplier.supplier_code} - {supplier.company_name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>   
                                <Button className="bg-hoverCream text-fontHeading border hover:text-white font-semibold w-40" 
                                    onClick={() => setOpenAddModal(true)}>
                                    <Plus size={20}/><span className="text-sm">Add Supplier</span>
                                </Button>
                            </div>    
                        </div>
                    </div>
                    <div className="mt-5 overflow-y-auto overflow-x-auto" style={{ maxHeight: `calc(100vh - ${72 + 270}px)` }}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Supplier Code</TableHead>
                                    <TableHead>Company Name</TableHead>
                                    <TableHead>Contact Person</TableHead>
                                    <TableHead>Business Number</TableHead>
                                    <TableHead>Mobile Number</TableHead>
                                    <TableHead>Active Status</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {suppliers.map(supplier => (
                                    <TableRow key={supplier.id}>
                                        <TableCell>{supplier.supplier_code}</TableCell>
                                        <TableCell>{supplier.company_name}</TableCell>
                                        <TableCell>{supplier.contact_person}</TableCell>
                                        <TableCell>{supplier.business_number}</TableCell>
                                        <TableCell>{supplier.mobile_number}</TableCell>
                                        <TableCell>{supplier.active_status ? 'Active' : 'Inactive'}</TableCell>
                                        <TableCell className="flex flex-row items-center justify-center">
                                            <Button className="bg-transparent text-black hover:text-white" onClick={() => {
                                                setEditSupplierData(supplier);
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
                                                <DropdownMenuContent >
                                                    <DropdownMenuItem onClick={() => {
                                                        setViewSupplier(supplier);
                                                        setOpenViewModal(true);
                                                    }}>View Details</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => setOpenDeativateModal(true)}>{supplier.active_status ? 'Deactivate' : 'Activate'}</DropdownMenuItem>
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
            {openAddModal && <AddSupplierModal 
                onClose={() => setOpenAddModal(false)} 
                onNext={handleNextAddModal} 
                getAddDataByKey={getAddDataByKey}
                handleAddDetailChange={handleAddDetailChange}/>}
            {openNextAddModal && <AddSupplierModal2 
                onClose={() => setOpenNextAddModal(false)} 
                onBack={handleAddBack}
                getAddDataByKey={getAddDataByKey} 
                addSupplier={addSupplier}
                clearAddData={clearAddData}
                handleAddDetailChange={handleAddDetailChange}/>}
            {openEditModal && <EditSupplierModal 
                onClose={() => setOpenEditModal(false)}
                getEditDataByKey={getEditDataByKey}
                handleEditDetailChange={handleEditDetailChange}
                clearEditData={clearEditData}
                onNext={handleNextEditModal}/>}
            {openNextEditModal && <EditSupplierModal2 
                onClose={() => setOpenNextEditModal(false)} 
                getEditDataByKey={getEditDataByKey}
                clearEditData={clearEditData}
                editSupplier={editSupplier}
                updateSupplier={updateSupplier}
                handleEditDetailChange={handleEditDetailChange}
                onBack={handleEditBack}/>}
            {openViewModal && <ViewSupplierModal 
                supplier={viewSupplier}
                onClose={() => {
                    setViewSupplier(null);
                    setOpenViewModal(false);
                }}
                onNext={handleNextViewModal}/>}
            {openNextViewModal && <ViewSupplierModal2 
                supplier={viewSupplier}
                onClose={() => {
                    setViewSupplier(null);
                    setOpenNextViewModal(false);
                }} 
                onBack={handleViewBack}/>}
            {openDeleteModal && <DeleteConfirmation open={openDeleteModal} onClose={() => setopenDeleteModal(false)}/>}
            {openDeactivateModal && <DeactivateConfirmation open={openDeactivateModal} onClose={() => setOpenDeativateModal(false)} />}
            {openSearchModal && <SearchSupplierModal supplier={searchSupplier} onClose={() => {setOpenSearchModal(false); setSearchSupplier(null);}}/>}
        </>
    );
}

export default Supplier