import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";
import { useState, useEffect } from "react";

const Receipt = [
  { id: 1, company: "KFC", costCenterCode: "10000234-11", storeName: "MD Manila", adrress: "Suite 297 37515 Keeling Dam, Goodwintown, OK 19091-6837" },
  { id: 2, company: "KFC", costCenterCode: "10000234-11", storeName: "MD Medisina", adrress: "Suite 297 37515 Keeling Dam, Goodwintown, OK 19091-6837" },
  { id: 3, company: "KFC", costCenterCode: "10000234-11", storeName: "MD Medisina", adrress: "Suite 297 37515 Keeling Dam, Goodwintown, OK 19091-6837" },
  { id: 4, company: "KFC", costCenterCode: "10000234-11", storeName: "MD Caruncho", adrress: "Suite 297 37515 Keeling Dam, Goodwintown, OK 19091-6837" },
  { id: 5, company: "KFC", costCenterCode: "10000234-22", storeName: "MD Taguig", adrress: "Suite 297 37515 Keeling Dam, Goodwintown, OK 19091-6837" },
  { id: 6, company: "KFC", costCenterCode: "10000234-22", storeName: "MD Taguig", adrress: "Suite 297 37515 Keeling Dam, Goodwintown, OK 19091-6837" },
  { id: 7, company: "KFC", costCenterCode: "10000234-33", storeName: "MD Caruncho", adrress: "Suite 297 37515 Keeling Dam, Goodwintown, OK 19091-6837" },
  { id: 8, company: "KFC", costCenterCode: "10000234-33", storeName: "MD malabon", adrress: "Suite 297 37515 Keeling Dam, Goodwintown, OK 19091-6837" },
  { id: 9, company: "Mang Inasal", costCenterCode: "10000234-11", storeName: "MD malabon", adrress: "Suite 297 37515 Keeling Dam, Goodwintown, OK 19091-6837" },
  { id: 10, company: "KFC", costCenterCode: "10055234-11", storeName: "MD Roces", adrress: "Suite 297 37515 Keeling Dam, Goodwintown, OK 19091-6837" },
  { id: 11, company: "031603031603", costCenterCode: "10055234-11", storeName: "MD Roces", adrress: "Suite 297 37515 Keeling Dam, Goodwintown, OK 19091-6837" },
  { id: 12, company: "KFC", costCenterCode: "10000234-11", storeName: "San Roque Supermarket", adrress: "Suite 297 37515 Keeling Dam, Goodwintown, OK 19091-6837" },
  { id: 13, company: "KFC", costCenterCode: "10000234-11", storeName: "San Roque Supermarket", adrress: "Suite 297 37515 Keeling Dam, Goodwintown, OK 19091-6837" },
  { id: 14, company: "Tokyo Tokyo", costCenterCode: "10000234-11", storeName: "MD Caruncho", adrress: "Suite 297 37515 Keeling Dam, Goodwintown, OK 19091-6837" },
  { id: 15, company: "KFC", costCenterCode: "10000234-11", storeName: "Tindahan ni aling nena", adrress: "Suite 297 37515 Keeling Dam, Goodwintown, OK 19091-6837" },
  { id: 16, company: "KFC", costCenterCode: "10000234-11", storeName: "Tindahan ni aling nena", adrress: "Suite 297 37515 Keeling Dam, Goodwintown, OK 19091-6837" },
  { id: 17, company: "KFC", costCenterCode: "10000234-11", storeName: "MD Caruncho", adrress: "Suite 297 37515 Keeling Dam, Goodwintown, OK 19091-6837" },
  { id: 18, company: "KFC", costCenterCode: "10000234-11", storeName: "Alisson Store", adrress: "Suite 297 37515 Keeling Dam, Goodwintown, OK 19091-6837" },
  { id: 19, company: "KFC", costCenterCode: "10000234-11", storeName: "Alisson Store", adrress: "Suite 297 37515 Keeling Dam, Goodwintown, OK 19091-6837" },
  { id: 20, company: "KFC", costCenterCode: "10000234-11", storeName: "MD Caruncho", adrress: "Suite 297 37515 Keeling Dam, Goodwintown, OK 19091-6837" },
  { id: 21, company: "KFC", costCenterCode: "00000", storeName: "Janloyd", adrress: "Suite 297 37515 Keeling Dam, Goodwintown, OK 19091-6837" }
];

function DeliveryReceipt() {
  const [searchQuery, setSearchQuery] = useState("");

  const headerHeight = 72;
  const itemHeight = 50;
  const paginationHeight = 50;

  const getItemsPerPage = (height: number): number => {
    const availableHeight = height - headerHeight - paginationHeight;
    if (availableHeight < 0) return 0;
    return Math.floor(availableHeight / itemHeight);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(
    getItemsPerPage(window.innerHeight)
  );

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage(window.innerHeight));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  },[searchQuery]);

  const filteredReceipt = Receipt.filter((receipt) => {
    const searchQueryLower = searchQuery.toLowerCase();

    const idAsString = receipt.id.toString();
    const costAsString = receipt.costCenterCode.toString();

    return(
      receipt.storeName.toLowerCase().includes(searchQueryLower) ||
      idAsString.toLowerCase().includes(searchQueryLower) ||
      costAsString.toLowerCase().includes(searchQueryLower) ||
      receipt.company.toLowerCase().includes(searchQueryLower) ||
      receipt.adrress.toLowerCase().includes(searchQueryLower)
    );
  });

  const indexOfLastReceipt = currentPage * itemsPerPage;
  const indexOfFirstReceipt = indexOfLastReceipt - itemsPerPage;
  const currentReceipt = filteredReceipt.slice(
    indexOfFirstReceipt,
    indexOfLastReceipt
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const totalPages = Math.ceil(filteredReceipt.length / itemsPerPage);

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex flex-col h-full  ">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Deliver Receipt</h1>
            <p className="text-sm font-semibold text-[#9E9E9E]">
              Manage your deliveries
            </p>
          </div>
          <div className="flex w-full justify-around pt-10">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <p className="text-sm text-[#9E9E9E]">Refference Number</p>
                <Input className="focus:outline-none w-80" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-[#9E9E9E]">Requestor Name</p>
                <Input className="focus:border-none" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-[#9E9E9E]">Cost Center Code</p>
                <Input className="focus:border-none" />
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <p className="text-sm text-[#9E9E9E]">Customer ID</p>
                <Input className="focus:border-none w-80" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-[#9E9E9E]">Prepared by:</p>
                <Input className="focus:border-none" type="number" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-[#9E9E9E]">Shipped by:</p>
                <Input className="focus:border-none" type="number" />
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <p className="text-sm text-[#9E9E9E]">Received by:</p>
                <Input className="focus:border-none w-80" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-[#9E9E9E]">Authorized by:</p>
                <Input className="focus:border-none" type="number" />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-10 pr-10">
            <Button> + Add item</Button>
            <Button> + Add New</Button>
            <Button> Manual</Button>
          </div>
        </div>
        <div className="flex flex-col h-full">
          <div className="relative w-full flex pt-6">
            <div className="w-1/2">
              <p className="text-lg font-bold">All Stores</p>
            </div>
            <div className="w-1/2 relative">
              <Input
                type="search"
                placeholder="Search..."
                className="pl-12 border-2 focus:border-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2 transform -translate-y-1 text-gray-400" />
            </div>
          </div>
          <div className="mt-5 overflow-y-auto" style={{ maxHeight: `calc(100vh - ${headerHeight + paginationHeight + 30}px)` }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Cost Center Code</TableHead>
                  <TableHead>Store Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentReceipt.map((Receipt) => (
                  <TableRow key={Receipt.id}>
                    <TableCell>{Receipt.company}</TableCell>
                    <TableCell>{Receipt.costCenterCode}</TableCell>
                    <TableCell>{Receipt.storeName}</TableCell>
                    <TableCell>{Receipt.adrress}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button className="bg-transparent text-fontHeading hover:text-white">
                            <MoreHorizontal />
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
        <div className="flex justify-center py-4" style={{ height: paginationHeight }}>
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
    </>
  );
}

export default DeliveryReceipt;
