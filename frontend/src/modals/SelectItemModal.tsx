/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useCallback, useEffect, useState } from "react"
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Search, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import type MaterialType from "@/interface/material"
import { fetchData, formatCurrency, formatDateAsString, getVersion } from "@/lib/utils";
import { useAppDispatch } from "@/store/store";
import { logout } from "@/slices/userSlice";
import ProductDetailsModal from "./ProductDetailsModal";

interface SelectItemModalProps {
    open: boolean;
    onClose: () => void;
    onItemSelect: (material: MaterialType) => void;
}

function SelectItemModal({ open, onClose, onItemSelect }: SelectItemModalProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [materials, setMaterials] = useState<MaterialType[]>([]);
    const [searchMaterial, setSearchMaterial] = useState<MaterialType | null>(null);
    const [openSearchModal, setOpenSearchModal] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState<MaterialType | null>(null);

    const [filteredMaterial, setFilteredMaterial] = useState<MaterialType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const itemsPerPage = 15;
    const dispatch = useAppDispatch();
    
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


    const handleSelectMaterial = (material: MaterialType) => {
        setSearchMaterial(material);
        setOpenSearchModal(true);
        setSearchQuery("");
        setFilteredMaterial([]);
    };

    const handleAddItem = (material: MaterialType) => {
        onItemSelect(material);  // Call the parent function to add the material to the delivery receipt
        setOpenSearchModal(false);  // Close the modal after adding
        setSearchMaterial(null);
    };

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredMaterial([]);
        } else {
            const filtered = materials.filter((material) =>
                material.material_code.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredMaterial(filtered.slice(0, 10));
        }
    }, [searchQuery, materials]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleRowClick = (material: MaterialType) => {
        setSelectedMaterial(material);
    };

    const handleSelectButtonClick = () => {
        if (selectedMaterial) {
            onItemSelect(selectedMaterial); // Only pass the selected material when the Select button is clicked
            onClose(); // Close the modal after selection
        }
    };

    if (!open) return null;

    return(
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4">
            <div className="flex flex-col w-1/2 bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between w-full">
                    <h1 className="font-extrabold text-2xl">Select Item</h1>
                    <Button className="text-black bg-transparent hover:bg-transparent p-0" onClick={onClose}><X size={30}/></Button>
                </div>
                <div className="flex flex-row items-center space-x-2 mt-5 w-3/4">
                    <h1 className="w-1/6">Items</h1>
                    <div className="relative w-5/6">
                        <Input
                            type="search"
                            placeholder="Search Material Code"
                            className="pl-12 border-2 focus:border-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        {filteredMaterial.length > 0 && (
                            <div className="absolute bg-white border border-gray-300 mt-1 w-full z-10 max-h-40 overflow-y-auto text-sm">
                                {filteredMaterial.map((material) => (
                                    <div
                                        key={material.id}
                                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                        onClick={() => handleSelectMaterial(material)}
                                    >
                                        {material.material_code} - {material.item_description}  
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>   
                </div>
                <div className="mt-5 overflow-y-auto" style={{ maxHeight: `calc(100vh - ${70 + 270}px)` }}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Material Code</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Item Code</TableHead>
                                <TableHead>Unit</TableHead>
                                <TableHead>Material Type</TableHead>
                                <TableHead>Cost</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {materials.map(material => (
                                <TableRow key={material.id} onClick={() => handleRowClick(material)}
                                    className={selectedMaterial?.id === material.id ? "bg-hoverCream" : "cursor-pointer"}>
                                    <TableCell>{material.material_code}</TableCell>
                                    <TableCell>{material.item_description}</TableCell>
                                    <TableCell>{material.item_code}</TableCell>
                                    <TableCell>{material.category}</TableCell>
                                    <TableCell>{material.material_type}</TableCell>
                                    <TableCell>{formatCurrency(material.unit_cost)}</TableCell>
                                    <TableCell>{formatDateAsString(new Date(material.date_entry))}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex justify-center mt-5">
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
                <div className="flex justify-end space-x-5">
                    <Button className="w-32 bg-hoverCream text-fontHeading font-semibold hover:text-white" onClick={onClose}>Cancel</Button>
                    <Button className="w-32 bg-hoverCream text-fontHeading font-semibold hover:text-white" onClick={handleSelectButtonClick}>Add</Button>
                </div>
            </div>
            {openSearchModal && (<ProductDetailsModal material={searchMaterial} onClose={() => setOpenSearchModal(false)}onAdd={handleAddItem}/>)}
        </div>
        
    );
}

export default SelectItemModal