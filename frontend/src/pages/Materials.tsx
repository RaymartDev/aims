/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { MoreHorizontal, Pencil, Plus, Search, Trash } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger  } from "@/Components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import AddMaterialModal from "@/modals/AddMaterialModal";
import EditMaterialModal from "@/modals/EditMaterialModal";
import ViewMaterialModal from "@/modals/ViewMaterialModal";
import DeleteConfirmation from "@/modals/DeleteConfirmation";
import type MaterialType from "@/interface/material";
import { fetchData, formatCurrency, formatDateAsString, getVersion } from "@/lib/utils";
import { useAppDispatch } from "@/store/store";
import { logout } from "@/slices/userSlice";

function Materials() {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [materials, setMaterials] = useState<MaterialType[]>([]);
    const [viewMaterial, setViewMaterial] = useState<MaterialType | null>(null);
    const [openDeleteModal, setopenDeleteModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [editMaterial, setEditMaterial] = useState<MaterialType | null>(null);
    const itemsPerPage = 17;
    const dispatch = useAppDispatch();

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const updateMaterial = (updatedMaterial: MaterialType | null) => {
        if (updatedMaterial) {
            setMaterials(prevMaterials =>
                prevMaterials.map(material =>
                    material.id === updatedMaterial.id ? updatedMaterial : material
                )
            );
            setEditMaterial(null);
        }
      };

    const addMaterial = (material: MaterialType | null) => {
        if (material) {
            setMaterials(prevMaterials => [...prevMaterials, material]);
        }
    }

    const loadMaterials = useCallback(() => {
        fetchData({
          url: `${getVersion()}/material/list`,
          query: { limit: itemsPerPage, page: currentPage }, // Use `query` here
          onSuccess: (data) => {
            setMaterials(data.materials);
            setMaxPage(data.misc.maxPage);
          },
          dispatch,
          logout: () => dispatch(logout())
        });
      }, [itemsPerPage, currentPage, dispatch]);
    
      useEffect(() => {
        loadMaterials();
      }, [loadMaterials]);

    return(
        <>
            <div className="flex flex-col h-full">
                <div className="flex flex-col h-full relative">
                    <div>
                        <h1 className="text-2xl font-bold">Products</h1>
                        <p className="text-sm font-semibold text-[#9E9E9E]">Warehouse / Products</p>
                    </div>
                    <div className="flex justify-center mt-10">
                        <div className="flex flex-row justify-between w-full">
                            <div className="w-fit flex items-center justify-start ">
                                <h1 className=" text-fontHeading font-bold">All Products</h1>
                            </div>
                            <div className="flex flex-row w-6/12 space-x-2">
                                <div className="relative w-10/12 ">
                                    <Input type="search" placeholder="Search Description" className="pl-12 border-2 focus:border-none"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}/>
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>   
                                <Button className="bg-hoverCream text-fontHeading border hover:text-white font-semibold w-40" 
                                    onClick={() => setOpenAddModal(true)}>
                                    <Plus size={20}/><span className="text-sm">Add Product</span>
                                </Button>
                            </div>    
                        </div>
                    </div>
                    <div className="mt-5 overflow-y-auto" style={{ maxHeight: `calc(100vh - ${70 + 270}px)` }}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Material Code</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Item Code</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Material Type</TableHead>
                                    <TableHead>Cost</TableHead>
                                    <TableHead>Date Entry</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {materials.map(material => (
                                    <TableRow key={material.id}>
                                        <TableCell>{material.material_code}</TableCell>
                                        <TableCell>{material.item_description}</TableCell>
                                        <TableCell>{material.item_code}</TableCell>
                                        <TableCell>{material.category}</TableCell>
                                        <TableCell>{material.material_type}</TableCell>
                                        <TableCell>{formatCurrency(material.unit_cost)}</TableCell>
                                        <TableCell>{formatDateAsString(new Date(material.date_entry))}</TableCell>
                                        <TableCell align="center">
                                            <Button className="bg-transparent text-black hover:text-white" onClick={() => {
                                                setEditMaterial(material);
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
                                                        setViewMaterial(material);
                                                        setOpenViewModal(true);
                                                    }}>View Details</DropdownMenuItem>
                                                    <DropdownMenuItem>Deactivate</DropdownMenuItem>
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
            {openAddModal && <AddMaterialModal addMaterial={addMaterial} onClose={() => setOpenAddModal(false)}/>}
            {openEditModal && <EditMaterialModal updateMaterial={updateMaterial} material={editMaterial} onClose={() => setOpenEditModal(false)}/>}
            {openViewModal && <ViewMaterialModal 
                material={viewMaterial} 
                onClose={() => {
                    setViewMaterial(null);
                    setOpenViewModal(false);
            }}/>}
            {openDeleteModal && <DeleteConfirmation open={openDeleteModal} onClose={() => setopenDeleteModal(false)}/>}
        </>
    );
}

export default Materials