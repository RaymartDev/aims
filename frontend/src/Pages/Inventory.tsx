import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { MoreHorizontal, Search, Download } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger  } from "@/Components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import { useEffect, useState } from "react";

const inventory = [
    { id: 1, materialCode: "1098392", description: "HP Probook 8GB RAM / 512GB SSD", totalBal: "120", reBal: "120", qtyOut: "50", unit: "PC", materialType: "OU", cost: "40,000", dateHired: "06/17/24" },
    { id: 2, materialCode: "1098393", description: "ASUS Predator 8GB RAM / 512GB SSD", totalBal: "142", reBal: "115", qtyOut: "27", unit: "PC", materialType: "DEMO", cost: "135,000", dateHired: "01/12/24" },
    { id: 3, materialCode: "1098394", description: "HP Probook 8GB RAM / 512GB SSD", totalBal: "110", reBal: "80", qtyOut: "30", unit: "PC", materialType: "BILLING", cost: "95,000", dateHired: "03/05/24" },
    { id: 4, materialCode: "1098395", description: "ASUS Predator 8GB RAM / 512GB SSD", totalBal: "98", reBal: "50", qtyOut: "48", unit: "PC", materialType: "OU", cost: "50,000", dateHired: "02/25/24" },
    { id: 5, materialCode: "1098396", description: "HP Probook 8GB RAM / 512GB SSD", totalBal: "50", reBal: "20", qtyOut: "30", unit: "PC", materialType: "DEMO", cost: "65,000", dateHired: "04/08/24" },
    { id: 6, materialCode: "1098397", description: "ASUS Predator 8GB RAM / 512GB SSD", totalBal: "140", reBal: "120", qtyOut: "20", unit: "PC", materialType: "BILLING", cost: "120,000", dateHired: "05/18/24" },
    { id: 7, materialCode: "1098398", description: "HP Probook 8GB RAM / 512GB SSD", totalBal: "130", reBal: "110", qtyOut: "20", unit: "PC", materialType: "OU", cost: "110,000", dateHired: "02/20/24" },
    { id: 8, materialCode: "1098399", description: "ASUS Predator 8GB RAM / 512GB SSD", totalBal: "60", reBal: "40", qtyOut: "20", unit: "PC", materialType: "DEMO", cost: "80,000", dateHired: "06/02/24" },
    { id: 9, materialCode: "1098400", description: "HP Probook 8GB RAM / 512GB SSD", totalBal: "100", reBal: "70", qtyOut: "30", unit: "PC", materialType: "BILLING", cost: "90,000", dateHired: "01/30/24" },
    { id: 10, materialCode: "1098401", description: "ASUS Predator 8GB RAM / 512GB SSD", totalBal: "80", reBal: "60", qtyOut: "20", unit: "PC", materialType: "OU", cost: "75,000", dateHired: "03/11/24" },
    { id: 11, materialCode: "1098402", description: "HP Probook 8GB RAM / 512GB SSD", totalBal: "70", reBal: "40", qtyOut: "30", unit: "PC", materialType: "DEMO", cost: "55,000", dateHired: "04/14/24" },
    { id: 12, materialCode: "1098403", description: "ASUS Predator 8GB RAM / 512GB SSD", totalBal: "120", reBal: "90", qtyOut: "30", unit: "PC", materialType: "BILLING", cost: "100,000", dateHired: "05/25/24" },
    { id: 13, materialCode: "1098404", description: "HP Probook 8GB RAM / 512GB SSD", totalBal: "90", reBal: "50", qtyOut: "40", unit: "PC", materialType: "OU", cost: "60,000", dateHired: "02/10/24" },
    { id: 14, materialCode: "1098405", description: "ASUS Predator 8GB RAM / 512GB SSD", totalBal: "110", reBal: "80", qtyOut: "30", unit: "PC", materialType: "DEMO", cost: "85,000", dateHired: "01/20/24" },
    { id: 15, materialCode: "1098406", description: "HP Probook 8GB RAM / 512GB SSD", totalBal: "100", reBal: "60", qtyOut: "40", unit: "PC", materialType: "BILLING", cost: "70,000", dateHired: "03/01/24" },
    { id: 16, materialCode: "1098407", description: "ASUS Predator 8GB RAM / 512GB SSD", totalBal: "140", reBal: "130", qtyOut: "10", unit: "PC", materialType: "OU", cost: "130,000", dateHired: "06/05/24" },
    { id: 17, materialCode: "1098408", description: "HP Probook 8GB RAM / 512GB SSD", totalBal: "80", reBal: "60", qtyOut: "20", unit: "PC", materialType: "DEMO", cost: "75,000", dateHired: "04/30/24" },
    { id: 18, materialCode: "1098409", description: "ASUS Predator 8GB RAM / 512GB SSD", totalBal: "60", reBal: "30", qtyOut: "30", unit: "PC", materialType: "BILLING", cost: "45,000", dateHired: "02/28/24" },
    { id: 19, materialCode: "1098410", description: "HP Probook 8GB RAM / 512GB SSD", totalBal: "50", reBal: "20", qtyOut: "30", unit: "PC", materialType: "OU", cost: "40,000", dateHired: "03/12/24" },
    { id: 20, materialCode: "1098411", description: "ASUS Predator 8GB RAM / 512GB SSD", totalBal: "30", reBal: "10", qtyOut: "20", unit: "PC", materialType: "DEMO", cost: "20,000", dateHired: "04/18/24" },
    { id: 21, materialCode: "1098412", description: "HP Probook 8GB RAM / 512GB SSD", totalBal: "20", reBal: "10", qtyOut: "10", unit: "PC", materialType: "BILLING", cost: "15,000", dateHired: "05/15/24" },
    { id: 22, materialCode: "1098413", description: "ASUS Predator 8GB RAM / 512GB SSD", totalBal: "10", reBal: "5", qtyOut: "5", unit: "PC", materialType: "OU", cost: "10,000", dateHired: "06/07/24" },
    { id: 23, materialCode: "1098414", description: "HP Probook 8GB RAM / 512GB SSD", totalBal: "120", reBal: "100", qtyOut: "20", unit: "PC", materialType: "DEMO", cost: "105,000", dateHired: "02/14/24" },
    { id: 24, materialCode: "1098415", description: "ASUS Predator 8GB RAM / 512GB SSD", totalBal: "140", reBal: "110", qtyOut: "30", unit: "PC", materialType: "BILLING", cost: "125,000", dateHired: "05/08/24" },
    { id: 25, materialCode: "1098416", description: "HP Probook 8GB RAM / 512GB SSD", totalBal: "100", reBal: "60", qtyOut: "40", unit: "PC", materialType: "OU", cost: "70,000", dateHired: "03/20/24" },
    { id: 26, materialCode: "1098417", description: "ASUS Predator 8GB RAM / 512GB SSD", totalBal: "80", reBal: "50", qtyOut: "30", unit: "PC", materialType: "DEMO", cost: "65,000", dateHired: "01/15/24" },
];



function InventoryOverview() {
    const [searchQuery, setSearchQuery] = useState("");

    const headerHeight = 70;
    const itemHeight = 50;

    const getItemsPerPage = (height: number): number => {
        const availableHeight = height - headerHeight;
        if (availableHeight <= 0) return 0;
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

    const filteredInventory = inventory.filter(inventory =>
        inventory.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastInventory = currentPage * itemsPerPage;
    const indexOfFirstInventory = indexOfLastInventory - itemsPerPage;
    const currentInventory = filteredInventory.slice(indexOfFirstInventory, indexOfLastInventory);

    const totalPages = Math.ceil(filteredInventory.length  / itemsPerPage);

    return(
        <div className="flex flex-col h-full">
            <div className="flex flex-col h-full relative">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">Inventory</h1>
                    <p className="text-sm font-semibold text-[#9E9E9E]">Warehouse / Inventory</p>
                </div>
                <div className="flex justify-center mt-10">
                    <div className="flex flex-row justify-between w-full">
                        <div className="w-fit flex items-center justify-start ">
                            <h1 className=" text-fontHeading font-bold">Inventory List</h1>
                        </div>
                        <div className="flex flex-row w-6/12 space-x-2">
                            <div className="relative w-10/12 ">
                                <Input type="search" placeholder="Search..." className="pl-12 border-2 focus:border-none" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}/>
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>   
                            <Button className="bg-hoverCream text-fontHeading border hover:text-white space-x-1 font-semibold">
                                <Download size={20}/><span className="text-sm">Export</span>
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
                                <TableHead>Total Bal</TableHead>
                                <TableHead>Re-Bal</TableHead>
                                <TableHead>Qty-Out</TableHead>
                                <TableHead>Unit</TableHead>
                                <TableHead>Material Type</TableHead>
                                <TableHead>Cost</TableHead>
                                <TableHead>Date Entry</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentInventory.map(inventory => (
                                <TableRow key={inventory.id}>
                                    <TableCell>{inventory.materialCode}</TableCell>
                                    <TableCell>{inventory.description}</TableCell>
                                    <TableCell>{inventory.totalBal}</TableCell>
                                    <TableCell>{inventory.reBal}</TableCell>
                                    <TableCell>{inventory.qtyOut}</TableCell>
                                    <TableCell>{inventory.unit}</TableCell>
                                    <TableCell>{inventory.materialType}</TableCell>
                                    <TableCell>{inventory.cost}</TableCell>
                                    <TableCell>{inventory.dateHired}</TableCell>
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
    );
}

export default InventoryOverview