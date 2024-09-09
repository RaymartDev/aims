/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger  } from "@/Components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import { useEffect, useState } from "react";
import AddCategoryModal from "@/modals/AddCategoryModal";
// import EditCategoryModal from "@/modals/EditCategoryModal";
import type CategoryType from "@/interface/category";
import axios from "axios";
import { getVersion } from "@/lib/utils";
import EditCategoryModal from "@/modals/EditCategoryModal";

function Category() {
    const [openModal, setOpenModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [categories, setCategories] = useState<CategoryType[]>([])
    const [editCategory, setEditCategory] = useState<CategoryType | null>(null);
    const itemsPerPage = 17;
    const [searchQuery, setSearchQuery] = useState('');
    const [maxPage, setMaxPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${getVersion()}/material-category/list?limit=${itemsPerPage}&page=${currentPage}`);
            if (response.status >= 200 && response.status < 300) {
              setCategories(response.data.material_categories); // Update state with employee data
              setMaxPage(response.data.misc.maxPage);
          }
          } catch (e) {
            console.error(e);
          }
         };
        fetchData(); // Call the fetch function
    }, [itemsPerPage, currentPage]);

    const updateCategory = (id: number, category: CategoryType | null) => {
        if (category) {
            const index = categories.findIndex(category => category.id === id);
            if (index !== -1) {
                categories[index] = category;
                setEditCategory(null);
            }
        }
    }

    const addCategory = (category: CategoryType | null) => {
        if (category) {
            setCategories(prevCategories => [...prevCategories, category]);
        }
    }

    return(
        <div className="flex flex-col h-full">
            <div className="flex flex-col h-full relative">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">Category</h1>
                    <p className="text-sm font-semibold text-[#9E9E9E]">Product Categories</p>
                </div>
                <div className="flex justify-center mt-10">
                    <div className="flex flex-row justify-between w-full">
                        <div className="w-fit flex items-center justify-start ">
                            <h1 className=" text-fontHeading font-bold">All Categories</h1>
                        </div>
                        <div className="flex flex-row w-6/12 space-x-2">
                            <div className="relative w-10/12 ">
                                <Input type="search" placeholder="Search Category" className="pl-12 border-2 focus:border-none" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}/>
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>   
                            <Button className="bg-hoverCream text-fontHeading border hover:text-white font-semibold w-48" onClick={() => setOpenModal(true)}>
                                <Plus size={20}/><span className="text-sm">Add Category</span>
                            </Button>
                        </div>    
                    </div>
                </div>
                <div className="mt-5 overflow-y-auto" style={{ maxHeight: `calc(100vh - ${70 + 270}px)` }}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Category Description</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map(category => (
                                <TableRow key={category.id}>
                                    <TableCell>{category.description}</TableCell>
                                    <TableCell>Active</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <Button className="bg-transparent text-fontHeading hover:text-white">
                                                    <MoreHorizontal/>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={()=> {
                                                    setEditCategory(category);
                                                    setEditModal(true);
                                                }}>Edit</DropdownMenuItem>
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
            {openModal && <AddCategoryModal addCategory={addCategory} onClose={() => setOpenModal(false)}/>}
            {editModal && <EditCategoryModal category={editCategory} updateCategory={updateCategory} onClose={() => setEditModal(false)}/>}
        </div>
    );
}

export default Category;
