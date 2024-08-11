import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import AddStoreModal from "@/modals/AddStoreModal";
import UserRegistration from "@/modals/UserRegistration";

const stores = [
    { id: 1, companyName: "InnoWave Corp", costCenter: "100230468", storeName: "KFC PH", address: "123 Main St, Manila, PH", status: "Registered" },
    { id: 2, companyName: "Foodie Ventures", costCenter: "100230469", storeName: "Pizza Hut PH", address: "456 Elm St, Quezon City, PH", status: "Registered" },
    { id: 3, companyName: "QuickBite Inc", costCenter: "100230470", storeName: "Taco Bell PH", address: "789 Oak St, Makati, PH", status: "Not Registered" },
    { id: 4, companyName: "TasteMasters", costCenter: "100230471", storeName: "Wendy's PH", address: "321 Pine St, Taguig, PH", status: "Deactivated" },
    { id: 5, companyName: "Gourmet Group", costCenter: "100230472", storeName: "Burger King PH", address: "654 Maple St, Pasig, PH", status: "Registered" },
    { id: 6, companyName: "Flavor Fusion", costCenter: "100230473", storeName: "Subway PH", address: "987 Cedar St, Mandaluyong, PH", status: "Registered" },
    { id: 7, companyName: "Culinary Creations", costCenter: "100230474", storeName: "Domino's PH", address: "213 Birch St, Marikina, PH", status: "Not Registered" },
    { id: 8, companyName: "Savory Delights", costCenter: "100230475", storeName: "McDonald's PH", address: "546 Willow St, Muntinlupa, PH", status: "Registered" },
    { id: 9, companyName: "Urban Eats", costCenter: "100230476", storeName: "Jollibee PH", address: "879 Cherry St, Pasay, PH", status: "Deactivated" },
    { id: 10, companyName: "Epicurean Enterprises", costCenter: "100230477", storeName: "Shakey's PH", address: "345 Palm St, Las Piñas, PH", status: "Registered" },
    { id: 11, companyName: "Feast Factory", costCenter: "100230478", storeName: "Chowking PH", address: "678 Mango St, Caloocan, PH", status: "Registered" },
    { id: 12, companyName: "FoodQuest Ltd.", costCenter: "100230479", storeName: "Greenwich PH", address: "901 Coconut St, Malabon, PH", status: "Not Registered" },
    { id: 13, companyName: "Cuisine Craft", costCenter: "100230480", storeName: "Popeyes PH", address: "234 Banana St, Mandaluyong, PH", status: "Registered" },
    { id: 14, companyName: "Tasty Ventures", costCenter: "100230481", storeName: "Mang Inasal PH", address: "567 Papaya St, Manila, PH", status: "Deactivated" },
    { id: 15, companyName: "Flavor Haven", costCenter: "100230482", storeName: "Kenny Rogers PH", address: "890 Guava St, Quezon City, PH", status: "Registered" },
    { id: 16, companyName: "Palate Pleasers", costCenter: "100230483", storeName: "Dunkin' PH", address: "123 Pear St, Makati, PH", status: "Registered" },
    { id: 17, companyName: "Gastro Hub", costCenter: "100230484", storeName: "Max's PH", address: "456 Peach St, Pasig, PH", status: "Not Registered" },
    { id: 18, companyName: "TasteMakers", costCenter: "100230485", storeName: "Red Ribbon PH", address: "789 Orange St, Marikina, PH", status: "Registered" },
    { id: 19, companyName: "Dining Dynamics", costCenter: "100230486", storeName: "Chooks-to-Go PH", address: "321 Pineapple St, Pasay, PH", status: "Deactivated" },
    { id: 20, companyName: "Gourmet Solutions", costCenter: "100230487", storeName: "Yellow Cab PH", address: "654 Berry St, Las Piñas, PH", status: "Registered" },
];


function Store() {
    const [openModal, setOpenModal] = useState(false);
    const [openUserRegModal, setOpenUserRegModal] = useState(false);
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

    const filteredStores = stores.filter(stores =>
        stores.storeName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastStore = currentPage * itemsPerPage;
    const indexOfFirstStore = indexOfLastStore - itemsPerPage;
    const currentStore= filteredStores.slice(indexOfFirstStore, indexOfLastStore);

    const totalPages = Math.ceil(filteredStores.length / itemsPerPage);


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
                                    <Input type="search" placeholder="Search Store Name" className="pl-12 border-2 focus:border-none" 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}/>
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>   
                                <Button className="bg-hoverCream text-fontHeading border hover:text-white" onClick={() => setOpenModal(true)}>
                                    <Plus size={20}/><span className="text-sm">Add Store</span>
                                </Button>
                            </div>    
                        </div>
                    </div>
                    <div className="mt-5 overflow-y-auto" style={{ maxHeight: `calc(100vh - ${headerHeight + 270}px)` }}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Store Name</TableHead>
                                    <TableHead>Cost Center Code</TableHead>
                                    <TableHead>Address</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentStore.map(stores => (
                                    <TableRow key={stores.id}>
                                        <TableCell>{stores.companyName}</TableCell>
                                        <TableCell>{stores.storeName}</TableCell>
                                        <TableCell>{stores.costCenter}</TableCell>
                                        <TableCell>{stores.address}</TableCell>
                                        <TableCell>{stores.status}</TableCell>
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
                                                    <DropdownMenuItem onClick={() => setOpenUserRegModal(true)}>Register</DropdownMenuItem>
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
            <AddStoreModal open={openModal} onClose={() => setOpenModal(false)}/>
            <UserRegistration open={openUserRegModal} onClose={() => setOpenUserRegModal(false)}/>
        </>
    );
}

export default Store