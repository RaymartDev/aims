/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Search, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";
import { useCallback, useEffect, useState } from "react";
import { Skeleton } from "@/Components/ui/skeleton";
import type InventoryType from "@/interface/inventory";
import { formatDateAsString, getVersion, fetchData as myFetch } from "@/lib/utils";
import { useAppDispatch } from "@/store/store";
import { logout } from "@/slices/userSlice";

function InventoryOverview() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [inventory, setInventory] = useState<InventoryType[]>([]);
  const [maxPage, setMaxPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 17;
  const dispatch = useAppDispatch();

  const loadInventories = useCallback(() => {
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    myFetch({
      url: `${getVersion()}/inventory/list`,
      query: { limit: itemsPerPage, page: currentPage },
      onSuccess: (data) => {
        setInventory(data.inventories);
        setMaxPage(data.misc.maxPage);
        setLoading(false);
      },
      dispatch,
      logout: () => dispatch(logout())
    });
  }, [itemsPerPage, currentPage, dispatch]);

  useEffect(() => {
    loadInventories();
  }, [loadInventories]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col h-full relative">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Inventory</h1>
          <p className="text-sm font-semibold text-[#9E9E9E]">
            Warehouse / Inventory
          </p>
        </div>
        <div className="flex justify-center mt-10">
          <div className="flex flex-row justify-between w-full">
            <div className="w-fit flex items-center justify-start ">
              <h1 className=" text-fontHeading font-bold">Inventory List</h1>
            </div>
            <div className="flex flex-row w-6/12 space-x-2">
              <div className="relative w-10/12 ">
                <Input
                  type="search"
                  placeholder="Search by Product Description / Type"
                  className="pl-12 border-2 focus:border-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <Button className="bg-hoverCream text-fontHeading border hover:text-white space-x-1 font-semibold w-36">
                <Download size={20} />
                <span className="text-sm">Export</span>
              </Button>
            </div>
          </div>
        </div>
        <div
          className="mt-5 overflow-y-auto"
          style={{ maxHeight: `calc(100vh - ${70 + 270}px)` }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Total Balance</TableHead>
                <TableHead>Remaining Balance</TableHead>
                <TableHead>Quantity Out</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Return</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Material Type</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Date Entry</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading
                ?  (
                    <TableRow>
                      <TableCell>
                        <Skeleton className="h-6 my-1" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 my-1" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 my-1" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 my-1" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 my-1" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 my-1" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 my-1" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 my-1" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 my-1" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 my-1" />
                      </TableCell>
                    </TableRow>)
                : inventory.map((inventory) => (
                    <TableRow key={inventory.id}>
                      <TableCell>{inventory.material_code}</TableCell>
                      <TableCell>{inventory.description}</TableCell>
                      <TableCell>{inventory.total_balance}</TableCell>
                      <TableCell>{inventory.remaining_balance}</TableCell>
                      <TableCell>{inventory.quantity_out}</TableCell>
                      <TableCell>{inventory.available}</TableCell>
                      <TableCell>{inventory.return}</TableCell>
                      <TableCell>{inventory.unit}</TableCell>
                      <TableCell>{inventory.material_type}</TableCell>
                      <TableCell>{inventory.cost}</TableCell>
                      <TableCell>{formatDateAsString(new Date(inventory.date_entry))}</TableCell>
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
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(currentPage - 1)}
                />
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
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(currentPage + 1)}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default InventoryOverview;
