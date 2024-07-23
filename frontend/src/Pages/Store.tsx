import { useEffect, useState } from "react";
import Layout from "@/Components/appLayout/Layout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import AddStoreModal from "@/modals/AddStoreModal";
import UserRegistration from "@/modals/UserRegistration";

const stores = [
    { id: 1, companyName: "Leansel Nico", costCenter: "IT Department", storeName: "503604218", address: "IT Asset", status: "Registered" },
    { id: 2, companyName: "100230457", costCenter: "Jane Doe", storeName: "Finance", address: "503604219", status: "Registered" },
    { id: 3, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered"  },
    { id: 4, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 5, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 6, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 7, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered"   },
    { id: 8, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 9, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 10, companyName: "100230458", costCenter: "kMAOTE", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 11, companyName: "100230458", costCenter: "SABAW", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 12, companyName: "Leansel Nico", costCenter: "IT Department", storeName: "503604218", address: "IT Asset", status: "Registered" },
    { id: 13, companyName: "100230457", costCenter: "Jane Doe", storeName: "Finance", address: "503604219", status: "Registered" },
    { id: 14, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 15, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 16, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 17, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 18, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered"   },
    { id: 19, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 20, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 10, companyName: "100230458", costCenter: "kMAOTE", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 11, companyName: "100230458", costCenter: "SABAW", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 1, companyName: "Leansel Nico", costCenter: "IT Department", storeName: "503604218", address: "IT Asset", status: "Registered" },
    { id: 2, companyName: "100230457", costCenter: "Jane Doe", storeName: "Finance", address: "503604219", status: "Registered" },
    { id: 3, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 4, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 5, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 6, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 7, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered"   },
    { id: 8, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 9, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 10, companyName: "100230458", costCenter: "kMAOTE", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 11, companyName: "100230458", costCenter: "SABAW", storeName: "Marketing", address: "503604220", status: "Registered" },
];

function Store() {

    const [openModal, setOpenModal] = useState(false);
    const [openUserRegModal, setOpenUserRegModal] = useState(false);

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

    const indexOfLastStore = currentPage * itemsPerPage;
    const indexOfFirstStore = indexOfLastStore - itemsPerPage;
    const currentStore= stores.slice(indexOfFirstStore, indexOfLastStore);

    const totalPages = Math.ceil(stores.length / itemsPerPage);


    return(
        <Layout>
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
                                    <Input type="search" placeholder="Search..." className="pl-12 border-2 focus:border-none"/>
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>   
                                <Button className="bg-hoverCream text-fontHeading border" onClick={() => setOpenModal(true)}>
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
                                    <TableHead>Cost Center Code</TableHead>
                                    <TableHead>Store Name</TableHead>
                                    <TableHead>Address</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentStore.map(stores => (
                                    <TableRow key={stores.id}>
                                        <TableCell>{stores.companyName}</TableCell>
                                        <TableCell>{stores.costCenter}</TableCell>
                                        <TableCell>{stores.storeName}</TableCell>
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
        </Layout>
    );
}

export default Store