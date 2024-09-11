/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { MoreHorizontal, Pencil, Plus, Search, Trash } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger  } from "@/Components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import { useCallback, useEffect, useState } from "react";
import AddCategoryModal from "@/modals/AddCategoryModal";
import EditCategoryModal from "@/modals/EditCategoryModal";
import DeleteConfirmation from "@/modals/DeleteConfirmation";
import ViewCategoryModal from "@/modals/ViewCategoryModal";
import type CategoryType from "@/interface/category";
import { fetchData, getVersion } from "@/lib/utils";
import { useAppDispatch } from "@/store/store";
import { logout } from "@/slices/userSlice";

function Category() {
    const [openModal, setOpenModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [categories, setCategories] = useState<CategoryType[]>([])
    const [openDeleteModal, setopenDeleteModal] = useState(false);
    const [editCategory, setEditCategory] = useState<CategoryType | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [openViewModal, setOpenViewModal] = useState(false);
    const [viewCategory, setViewCategory] = useState<CategoryType | null>(null);

    const [filteredCategory, setFilteredCategory] = useState<CategoryType[]>([]);

    const itemsPerPage = 17;
    const [maxPage, setMaxPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useAppDispatch();

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const loadCategories = useCallback(() => {
        fetchData({
          url: `${getVersion()}/material-category/list`,
          query: { limit: itemsPerPage, page: currentPage }, // Use `query` here
          onSuccess: (data) => {
            setCategories(data.material_categories);
            setMaxPage(data.misc.maxPage);
          },
          dispatch,
          logout: () => dispatch(logout())
        });
      }, [itemsPerPage, currentPage, dispatch]);
    
      useEffect(() => {
        loadCategories();
      }, [loadCategories]);

      useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredCategory([]); // Reset suggestions if search is cleared
        } else {
            const filtered = categories.filter((category) =>
                category.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredCategory(filtered.slice(0, 5)); // Show top 5 suggestions
        }
    }, [searchQuery, categories]);

    const handleSelectCategory = (category: CategoryType) => {
        setViewCategory(category);
        setOpenViewModal(true);
        setSearchQuery(""); // Clear search query after selection
        setFilteredCategory([]); // Clear suggestions after selection
    };


      const updateCategory = (updatedCategory: CategoryType | null) => {
        if (updatedCategory) {
            setCategories(prevCategories =>
                prevCategories.map(category =>
                    category.id === updatedCategory.id ? updatedCategory : category
                )
            );
            setEditCategory(null);
        }
      };

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
                                <Input
                                    type="search"
                                    placeholder="Search Type"
                                    className="pl-12 border-2 focus:border-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                {filteredCategory.length > 0 && (
                                    <div className="absolute bg-white border border-gray-300 mt-1 w-full z-10 max-h-40 overflow-y-auto text-sm">
                                        {filteredCategory.map((category) => (
                                            <div
                                                key={category.id}
                                                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                                onClick={() => handleSelectCategory(category)}
                                            >
                                                {category.description}
                                            </div>
                                        ))}
                                    </div>
                                )}
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
                                <TableHead>Active Status</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map(category => (
                                <TableRow key={category.id}>
                                    <TableCell>{category.description}</TableCell>
                                    <TableCell>{category.active_status ? 'Active' : 'Inactive'}</TableCell>
                                    <TableCell align="center">
                                        <Button className="bg-transparent text-black hover:text-white" onClick={()=> {
                                            setEditCategory(category);
                                            setEditModal(true);
                                        }}><Pencil/>
                                        </Button>
                                        <Button className="bg-transparent text-black hover:text-white" onClick={() => setopenDeleteModal(true)}><Trash/></Button>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <Button className="bg-transparent text-fontHeading hover:text-white">
                                                    <MoreHorizontal/>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem>{category.active_status ? 'Deactivate' : 'Activate'}</DropdownMenuItem>
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
            {openDeleteModal && <DeleteConfirmation open={openDeleteModal} onClose={() => setopenDeleteModal(false)}/>}
            {openViewModal && <ViewCategoryModal category={viewCategory} onClose={() => {setOpenViewModal(false); setViewCategory(null);}}/>}
        </div>
    );
}

export default Category;
