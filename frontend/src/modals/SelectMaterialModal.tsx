import { useEffect, useState } from "react"
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Search, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";

interface SelectMaterialModalProps {
    open: boolean;
    onClose: () => void;
}

const materials = [
    { materialCode: 100231, description: "ASUS 16GB RAM / 512GB SSD", itemCode: "GAME-M04", unit: "PC", materialType: "OU", cost: "45,000", dateHired: "06/17/24" },
    { materialCode: 200231, description: "HP Probook 8GB RAM / 512GB SSD", itemCode: "GAME-M04", unit: "PC", materialType: "OU", cost: "45,000", dateHired: "07/01/23" },
    { materialCode: 300231, description: "Predator 16GB RAM / 512GB SSD i9-14500", itemCode: "GAME-M04", unit: "PC", materialType: "OU", cost: "45,000", dateHired: "05/21/22" },
    { materialCode: 400231, description: "ASUS 16GB RAM / 512GB SSD", itemCode: "GAME-M04", unit: "PC", materialType: "OU", cost: "45,000", dateHired: "05/21/22" },
    { materialCode: 500231, description: "HP Probook 8GB RAM / 512GB SSD", itemCode: "GAME-M04", unit: "PC", materialType: "OU", cost: "45,000", dateHired: "05/21/22" },
    { materialCode: 600231, description: "ASUS 16GB RAM / 512GB SSD", itemCode: "GAME-M04", unit: "PC", materialType: "OU", cost: "45,000", dateHired: "05/21/22" },
    { materialCode: 700231, description: "Predator 16GB RAM / 512GB SSD i9-14500", itemCode: "GAME-M04", unit: "PC", materialType: "OU", cost: "45,000", dateHired: "05/21/22" },
    { materialCode: 800231, description: "HP Probook 8GB RAM / 512GB SSD", itemCode: "GAME-M04", unit: "PC", materialType: "OU", cost: "45,000", dateHired: "05/21/22" },
    { materialCode: 900231, description: "ASUS 16GB RAM / 512GB SSD", itemCode: "GAME-M04", unit: "PC", materialType: "OU", cost: "45,000", dateHired: "05/21/22" },
    { materialCode: 1000231, description: "HP Probook 8GB RAM / 512GB SSD", itemCode: "GAME-M04", unit: "PC", materialType: "OU", cost: "45,000", dateHired: "05/21/22" },
    { materialCode: 1100231, description: "ASUS 16GB RAM / 512GB SSD", itemCode: "GAME-M04", unit: "PC", materialType: "OU", cost: "45,000", dateHired: "05/21/22" },
    { materialCode: 1200231, description: "Predator 16GB RAM / 512GB SSD i9-14500", itemCode: "GAME-M04", unit: "PC", materialType: "OU", cost: "45,000", dateHired: "05/21/22" },
    { materialCode: 1300231, description: "ASUS 16GB RAM / 512GB SSD", itemCode: "GAME-M04", unit: "PC", materialType: "OU", cost: "45,000", dateHired: "05/21/22" },
    { materialCode: 1400231, description: "10023Predator 16GB RAM / 512GB SSD i9-145000458", name: "asdasd", department: "Marketing", costCode: "OU", cost: "45,000", dateHired: "05/21/22" },
];

function SelectMaterialModal({ open, onClose }: SelectMaterialModalProps) {

    const headerHeight = 72;

    const getItemsPerPage = (height: number): number => {
        const availableHeight = height - headerHeight;
        if (availableHeight < 500) return 10;
        return 10;
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage(window.innerHeight));

    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(getItemsPerPage(window.innerHeight));
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const indexOfLastMaterials = currentPage * itemsPerPage;
    const indexOfFirstMaterials = indexOfLastMaterials - itemsPerPage;
    const currentMaterials = materials.slice(indexOfFirstMaterials, indexOfLastMaterials);

    const totalPages = Math.ceil(materials.length / itemsPerPage);

    if (!open) return null;

    return(
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4">
            <div className="flex flex-col w-1/2 bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between w-full">
                    <h1 className="font-extrabold text-2xl">Select Material</h1>
                    <Button className="text-black bg-transparent hover:bg-transparent p-0" onClick={onClose}><X size={30}/></Button>
                </div>
                <div className="flex flex-row items-center space-x-5 mt-5 w-1/2">
                    <h1 className="w-1/6">Materials</h1>
                    <div className="relative w-5/6 ">
                        <Input type="search" placeholder="Search..." className="pl-12 border-2 focus:border-none"/>
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>   
                </div>
                <div className="mt-5 overflow-y-auto" style={{ maxHeight: `calc(100vh - ${headerHeight + 270}px)` }}>
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
                            {currentMaterials.map(materials => (
                                <TableRow key={materials.materialCode}>
                                    <TableCell>{materials.materialCode}</TableCell>
                                    <TableCell>{materials.description}</TableCell>
                                    <TableCell>{materials.itemCode}</TableCell>
                                    <TableCell>{materials.unit}</TableCell>
                                    <TableCell>{materials.materialType}</TableCell>
                                    <TableCell>{materials.cost}</TableCell>
                                    <TableCell>{materials.dateHired}</TableCell>
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
                            {Array.from({ length: totalPages }, (_, index) => (
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
                            {currentPage < totalPages && (
                                <PaginationItem>
                                    <PaginationNext href="#" onClick={() => handlePageChange(currentPage + 1)} />
                                </PaginationItem>
                            )}
                        </PaginationContent>
                    </Pagination>
                </div>
                <div className="flex justify-end space-x-5">
                    <Button className="w-32 bg-hoverCream text-fontHeading font-semibold" onClick={onClose}>Cancel</Button>
                    <Button className="w-32 bg-hoverCream text-fontHeading font-semibold">Select</Button>
                </div>
            </div>
        </div>
    );
}

export default SelectMaterialModal