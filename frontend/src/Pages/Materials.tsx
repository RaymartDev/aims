import { useEffect, useState } from "react";
import Layout from "@/Components/appLayout/Layout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger  } from "@/Components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";

const materials = [
    { id: 1, materialCode: "Leansel Nico", desc: "IT Department", itemCode: "503604218", unit: "IT Asset", materialType: "OU", cost: "40000", dateEntry: "06/17/24" },
    { id: 2, materialCode: "100230457", desc: "Jane Doe", itemCode: "Finance", unit: "503604219", materialType: "OU", cost: "40000", dateEntry: "06/17/24" },
    { id: 3, materialCode: "100230458", desc: "John Smith", itemCode: "Marketing", unit: "503604220", materialType: "OU", cost: "40000", dateEntry: "06/17/24" },
    { id: 4, materialCode: "100230458", desc: "John Smith", itemCode: "Marketing", unit: "503604220", materialType: "OU", cost: "40000", dateEntry: "06/17/24" },
    { id: 5, materialCode: "100230458", desc: "John Smith", itemCode: "Marketing", unit: "503604220", materialType: "OU", cost: "40000", dateEntry: "06/17/24" },
    { id: 6, materialCode: "100230458", desc: "John Smith", itemCode: "Marketing", unit: "503604220", materialType: "OU", cost: "40000", dateEntry: "06/17/24" },
    { id: 7, materialCode: "100230458", desc: "John Smith", itemCode: "Marketing", unit: "503604220", materialType: "OU", cost: "40000", dateEntry: "06/17/24"  },
    { id: 8, materialCode: "100230458", desc: "John Smith", itemCode: "Marketing", unit: "503604220", materialType: "OU", cost: "40000", dateEntry: "06/17/24" },
    { id: 9, materialCode: "100230458", desc: "John Smith", itemCode: "Marketing", unit: "503604220", materialType: "OU", cost: "40000", dateEntry: "06/17/24" },
    { id: 10, materialCode: "100230458", desc: "kMAOTE", itemCode: "Marketing", unit: "503604220", materialType: "OU", cost: "40000", dateEntry: "06/17/24" },
    { id: 11, materialCode: "100230458", desc: "SABAW", itemCode: "Marketing", unit: "503604220", materialType: "OU", cost: "40000", dateEntry: "06/17/24" },
];
function Materials() {
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



    return(
        <Layout>
            <div className="flex flex-col h-full">
                <div className="flex flex-col h-full relative">
                    <div>
                        <h1 className="text-2xl font-bold">Materials</h1>
                        <p className="text-sm font-semibold text-[#9E9E9E]">Inventory / Materials</p>
                    </div>
                    <div className="flex justify-center mt-10">
                        <div className="flex flex-row justify-between w-full">
                            <div className="w-fit flex items-center justify-start ">
                                <h1 className=" text-fontHeading font-bold">All Materials</h1>
                            </div>
                            <div className="flex flex-row w-6/12 space-x-2">
                                <div className="relative w-10/12 ">
                                    <Input type="search" placeholder="Search..." className="pl-12 border-2"/>
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>   
                                <Button className="bg-hoverCream text-fontHeading border">
                                    <Plus size={20}/><span className="text-sm">Add Materials</span>
                                </Button>
                            </div>    
                        </div>
                    </div>
                    <div className="mt-5 overflow-y-auto" style={{ maxHeight: `calc(100vh - ${headerHeight + 270}px)` }}>
                        <Table>
                            <TableHeader className="sticky top-0 bg-white">
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
                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
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
        </Layout>
    );
}

export default Materials