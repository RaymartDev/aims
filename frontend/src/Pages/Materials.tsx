import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger  } from "@/Components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import AddMaterialModal from "@/modals/AddMaterialModal";
import EditMaterialModal from "@/modals/EditMaterialModal";

const materials = [
    { id: 1, materialCode: "1000", desc: "HP Probook 8GB RAM / 512GB SSD", itemCode: "503604218", unit: "PC", materialType: "OU", cost: "40,000", dateEntry: "06/17/24" },
    { id: 2, materialCode: "1001", desc: "ASUS Predator 8GB RAM / 512GB SSD", itemCode: "503604219", unit: "PC", materialType: "DEMO", cost: "75,000", dateEntry: "05/22/24" },
    { id: 3, materialCode: "1002", desc: "HP Probook 8GB RAM / 512GB SSD", itemCode: "503604220", unit: "PC", materialType: "BILLING", cost: "55,000", dateEntry: "07/01/24" },
    { id: 4, materialCode: "1003", desc: "ASUS Predator 8GB RAM / 512GB SSD", itemCode: "503604221", unit: "PC", materialType: "OU", cost: "62,000", dateEntry: "02/14/24" },
    { id: 5, materialCode: "1004", desc: "HP Probook 8GB RAM / 512GB SSD", itemCode: "503604222", unit: "PC", materialType: "DEMO", cost: "47,000", dateEntry: "03/19/24" },
    { id: 6, materialCode: "1005", desc: "ASUS Predator 8GB RAM / 512GB SSD", itemCode: "503604223", unit: "PC", materialType: "BILLING", cost: "80,000", dateEntry: "01/10/24" },
    { id: 7, materialCode: "1006", desc: "HP Probook 8GB RAM / 512GB SSD", itemCode: "503604224", unit: "PC", materialType: "OU", cost: "59,000", dateEntry: "04/07/24" },
    { id: 8, materialCode: "1007", desc: "ASUS Predator 8GB RAM / 512GB SSD", itemCode: "503604225", unit: "PC", materialType: "DEMO", cost: "70,000", dateEntry: "05/30/24" },
    { id: 9, materialCode: "1008", desc: "HP Probook 8GB RAM / 512GB SSD", itemCode: "503604226", unit: "PC", materialType: "BILLING", cost: "65,000", dateEntry: "02/22/24" },
    { id: 10, materialCode: "1009", desc: "ASUS Predator 8GB RAM / 512GB SSD", itemCode: "503604227", unit: "PC", materialType: "OU", cost: "72,000", dateEntry: "03/05/24" },
    { id: 11, materialCode: "1010", desc: "HP Probook 8GB RAM / 512GB SSD", itemCode: "503604228", unit: "PC", materialType: "DEMO", cost: "60,000", dateEntry: "06/12/24" },
    { id: 12, materialCode: "1011", desc: "ASUS Predator 8GB RAM / 512GB SSD", itemCode: "503604229", unit: "PC", materialType: "BILLING", cost: "50,000", dateEntry: "04/20/24" },
    { id: 13, materialCode: "1012", desc: "HP Probook 8GB RAM / 512GB SSD", itemCode: "503604230", unit: "PC", materialType: "OU", cost: "58,000", dateEntry: "07/02/24" },
    { id: 14, materialCode: "1013", desc: "ASUS Predator 8GB RAM / 512GB SSD", itemCode: "503604231", unit: "PC", materialType: "DEMO", cost: "77,000", dateEntry: "05/18/24" },
    { id: 15, materialCode: "1014", desc: "HP Probook 8GB RAM / 512GB SSD", itemCode: "503604232", unit: "PC", materialType: "BILLING", cost: "68,000", dateEntry: "06/01/24" },
    { id: 16, materialCode: "1015", desc: "ASUS Predator 8GB RAM / 512GB SSD", itemCode: "503604233", unit: "PC", materialType: "OU", cost: "64,000", dateEntry: "02/11/24" },
    { id: 17, materialCode: "1016", desc: "HP Probook 8GB RAM / 512GB SSD", itemCode: "503604234", unit: "PC", materialType: "DEMO", cost: "54,000", dateEntry: "03/26/24" },
    { id: 18, materialCode: "1017", desc: "ASUS Predator 8GB RAM / 512GB SSD", itemCode: "503604235", unit: "PC", materialType: "BILLING", cost: "73,000", dateEntry: "05/09/24" },
    { id: 19, materialCode: "1018", desc: "HP Probook 8GB RAM / 512GB SSD", itemCode: "503604236", unit: "PC", materialType: "OU", cost: "67,000", dateEntry: "04/13/24" },
    { id: 20, materialCode: "1019", desc: "ASUS Predator 8GB RAM / 512GB SSD", itemCode: "503604237", unit: "PC", materialType: "DEMO", cost: "76,000", dateEntry: "01/15/24" },
    { id: 21, materialCode: "1020", desc: "HP Probook 8GB RAM / 512GB SSD", itemCode: "503604238", unit: "PC", materialType: "BILLING", cost: "61,000", dateEntry: "06/25/24" },
    { id: 22, materialCode: "1021", desc: "ASUS Predator 8GB RAM / 512GB SSD", itemCode: "503604239", unit: "PC", materialType: "OU", cost: "52,000", dateEntry: "05/03/24" },
    { id: 23, materialCode: "1022", desc: "HP Probook 8GB RAM / 512GB SSD", itemCode: "503604240", unit: "PC", materialType: "DEMO", cost: "74,000", dateEntry: "07/11/24" },
    { id: 24, materialCode: "1023", desc: "ASUS Predator 8GB RAM / 512GB SSD", itemCode: "503604241", unit: "PC", materialType: "BILLING", cost: "66,000", dateEntry: "02/02/24" },
    { id: 25, materialCode: "1024", desc: "HP Probook 8GB RAM / 512GB SSD", itemCode: "503604242", unit: "PC", materialType: "OU", cost: "69,000", dateEntry: "03/12/24" },
    { id: 26, materialCode: "1025", desc: "ASUS Predator 8GB RAM / 512GB SSD", itemCode: "503604243", unit: "PC", materialType: "DEMO", cost: "71,000", dateEntry: "04/28/24" },
];

function Materials() {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const headerHeight = 72;
    const itemHeight = 50;

    const getItemsPerPage = (height: number): number => {
        const availableHeight = height - headerHeight;
        if (availableHeight < 0) return 0;
        return Math.floor(availableHeight / itemHeight);
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

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const filteredMaterial = materials.filter(materials =>
        materials.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastMaterials = currentPage * itemsPerPage;
    const indexOfFirstMaterials = indexOfLastMaterials - itemsPerPage;
    const currentMaterials = filteredMaterial.slice(indexOfFirstMaterials, indexOfLastMaterials);

    const totalPages = Math.ceil(filteredMaterial.length / itemsPerPage);

    return(
        <>
            <div className="flex flex-col h-full">
                <div className="flex flex-col h-full relative">
                    <div>
                        <h1 className="text-2xl font-bold">Materials</h1>
                        <p className="text-sm font-semibold text-[#9E9E9E]">Warehouse / Materials</p>
                    </div>
                    <div className="flex justify-center mt-10">
                        <div className="flex flex-row justify-between w-full">
                            <div className="w-fit flex items-center justify-start ">
                                <h1 className=" text-fontHeading font-bold">All Materials</h1>
                            </div>
                            <div className="flex flex-row w-6/12 space-x-2">
                                <div className="relative w-10/12 ">
                                    <Input type="search" placeholder="Search Description" className="pl-12 border-2 focus:border-none"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}/>
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>   
                                <Button className="bg-hoverCream text-fontHeading border hover:text-white font-semibold" 
                                    onClick={() => setOpenAddModal(true)}>
                                    <Plus size={20}/><span className="text-sm">Add Materials</span>
                                </Button>
                            </div>    
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
                                    <TableHead>Date Entry</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentMaterials.map(materials => (
                                    <TableRow key={materials.id}>
                                        <TableCell>{materials.materialCode}</TableCell>
                                        <TableCell>{materials.desc}</TableCell>
                                        <TableCell>{materials.itemCode}</TableCell>
                                        <TableCell>{materials.unit}</TableCell>
                                        <TableCell>{materials.materialType}</TableCell>
                                        <TableCell>{materials.cost}</TableCell>
                                        <TableCell>{materials.dateEntry}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <Button className="bg-transparent text-fontHeading hover:text-white">
                                                        <MoreHorizontal/>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => setOpenEditModal(true)}>Edit</DropdownMenuItem>
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
            </div>
            <AddMaterialModal open={openAddModal} onClose={() => setOpenAddModal(false)} />
            <EditMaterialModal open={openEditModal} onClose={() => setOpenEditModal(false)} />
        </>
    );
}

export default Materials