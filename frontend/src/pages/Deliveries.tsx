/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useCallback, useEffect, useState } from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Check, ChevronDown, Plus, Search } from "lucide-react";
import { Label } from "@/Components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import SelectMaterialModal from "@/modals/SelectMaterialModal";
import AssignToModal from "@/modals/AssignToModal";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/Components/ui/command";
import type SupplierType from "@/interface/supplier" 
import { cn, getVersion } from "@/lib/utils";
import axios, { CancelTokenSource } from "axios";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import type MaterialType from "@/interface/material"

const deliveries = [
  {
    id: 1,
    delivery: "1000",
    desc: "HP Probook 8GB RAM / 512GB SSD",
    serialNumber: "503604218",
    assetNumber: "503604220",
    quantity: "1",
    unit: "OU",
    remarks: "OU KFC - BACLARAN",
  },
  {
    id: 2,
    delivery: "1001",
    desc: "ASUS Predator 8GB RAM / 512GB SSD",
    serialNumber: "503604219",
    assetNumber: "503604221",
    quantity: "25",
    unit: "BILLING",
    remarks: "BILLING KFC - MAKATI",
  },
  {
    id: 3,
    delivery: "1002",
    desc: "HP Probook 8GB RAM / 512GB SSD",
    serialNumber: "503604220",
    assetNumber: "503604222",
    quantity: "10",
    unit: "DEMO",
    remarks: "DEMO KFC - QUEZON CITY",
  },
  {
    id: 4,
    delivery: "1003",
    desc: "ASUS Predator 8GB RAM / 512GB SSD",
    serialNumber: "503604221",
    assetNumber: "503604223",
    quantity: "5",
    unit: "OU",
    remarks: "OU KFC - BACLARAN",
  },
  {
    id: 5,
    delivery: "1004",
    desc: "HP Probook 8GB RAM / 512GB SSD",
    serialNumber: "503604222",
    assetNumber: "503604224",
    quantity: "15",
    unit: "BILLING",
    remarks: "BILLING KFC - MAKATI",
  },
  {
    id: 6,
    delivery: "1005",
    desc: "ASUS Predator 8GB RAM / 512GB SSD",
    serialNumber: "503604223",
    assetNumber: "503604225",
    quantity: "20",
    unit: "DEMO",
    remarks: "DEMO KFC - QUEZON CITY",
  },
  {
    id: 7,
    delivery: "1006",
    desc: "HP Probook 8GB RAM / 512GB SSD",
    serialNumber: "503604224",
    assetNumber: "503604226",
    quantity: "30",
    unit: "OU",
    remarks: "OU KFC - BACLARAN",
  },
  {
    id: 8,
    delivery: "1007",
    desc: "ASUS Predator 8GB RAM / 512GB SSD",
    serialNumber: "503604225",
    assetNumber: "503604227",
    quantity: "50",
    unit: "BILLING",
    remarks: "BILLING KFC - MAKATI",
  },
  {
    id: 9,
    delivery: "1008",
    desc: "HP Probook 8GB RAM / 512GB SSD",
    serialNumber: "503604226",
    assetNumber: "503604228",
    quantity: "8",
    unit: "DEMO",
    remarks: "DEMO KFC - QUEZON CITY",
  },
  {
    id: 10,
    delivery: "1009",
    desc: "ASUS Predator 8GB RAM / 512GB SSD",
    serialNumber: "503604227",
    assetNumber: "503604229",
    quantity: "12",
    unit: "OU",
    remarks: "OU KFC - BACLARAN",
  },
  {
    id: 11,
    delivery: "1010",
    desc: "HP Probook 8GB RAM / 512GB SSD",
    serialNumber: "503604228",
    assetNumber: "503604230",
    quantity: "6",
    unit: "BILLING",
    remarks: "BILLING KFC - MAKATI",
  },
  {
    id: 12,
    delivery: "1011",
    desc: "ASUS Predator 8GB RAM / 512GB SSD",
    serialNumber: "503604229",
    assetNumber: "503604231",
    quantity: "3",
    unit: "DEMO",
    remarks: "DEMO KFC - QUEZON CITY",
  },
  {
    id: 13,
    delivery: "1012",
    desc: "HP Probook 8GB RAM / 512GB SSD",
    serialNumber: "503604230",
    assetNumber: "503604232",
    quantity: "9",
    unit: "OU",
    remarks: "OU KFC - BACLARAN",
  },
  {
    id: 14,
    delivery: "1013",
    desc: "ASUS Predator 8GB RAM / 512GB SSD",
    serialNumber: "503604231",
    assetNumber: "503604233",
    quantity: "22",
    unit: "BILLING",
    remarks: "BILLING KFC - MAKATI",
  },
  {
    id: 15,
    delivery: "1014",
    desc: "HP Probook 8GB RAM / 512GB SSD",
    serialNumber: "503604232",
    assetNumber: "503604234",
    quantity: "14",
    unit: "DEMO",
    remarks: "DEMO KFC - QUEZON CITY",
  },
  {
    id: 16,
    delivery: "1015",
    desc: "ASUS Predator 8GB RAM / 512GB SSD",
    serialNumber: "503604233",
    assetNumber: "503604235",
    quantity: "7",
    unit: "OU",
    remarks: "OU KFC - BACLARAN",
  },
  {
    id: 17,
    delivery: "1016",
    desc: "HP Probook 8GB RAM / 512GB SSD",
    serialNumber: "503604234",
    assetNumber: "503604236",
    quantity: "28",
    unit: "BILLING",
    remarks: "BILLING KFC - MAKATI",
  },
  {
    id: 18,
    delivery: "1017",
    desc: "ASUS Predator 8GB RAM / 512GB SSD",
    serialNumber: "503604235",
    assetNumber: "503604237",
    quantity: "19",
    unit: "DEMO",
    remarks: "DEMO KFC - QUEZON CITY",
  },
  {
    id: 19,
    delivery: "1018",
    desc: "HP Probook 8GB RAM / 512GB SSD",
    serialNumber: "503604236",
    assetNumber: "503604238",
    quantity: "11",
    unit: "OU",
    remarks: "OU KFC - BACLARAN",
  },
  {
    id: 20,
    delivery: "1019",
    desc: "ASUS Predator 8GB RAM / 512GB SSD",
    serialNumber: "503604237",
    assetNumber: "503604239",
    quantity: "24",
    unit: "BILLING",
    remarks: "BILLING KFC - MAKATI",
  },
  {
    id: 21,
    delivery: "1020",
    desc: "HP Probook 8GB RAM / 512GB SSD",
    serialNumber: "503604238",
    assetNumber: "503604240",
    quantity: "18",
    unit: "DEMO",
    remarks: "DEMO KFC - QUEZON CITY",
  },
  {
    id: 22,
    delivery: "1021",
    desc: "ASUS Predator 8GB RAM / 512GB SSD",
    serialNumber: "503604239",
    assetNumber: "503604241",
    quantity: "35",
    unit: "OU",
    remarks: "OU KFC - BACLARAN",
  },
  {
    id: 23,
    delivery: "1022",
    desc: "HP Probook 8GB RAM / 512GB SSD",
    serialNumber: "503604240",
    assetNumber: "503604242",
    quantity: "45",
    unit: "BILLING",
    remarks: "BILLING KFC - MAKATI",
  },
  {
    id: 24,
    delivery: "1023",
    desc: "ASUS Predator 8GB RAM / 512GB SSD",
    serialNumber: "503604241",
    assetNumber: "503604243",
    quantity: "50",
    unit: "DEMO",
    remarks: "DEMO KFC - QUEZON CITY",
  },
  {
    id: 25,
    delivery: "1024",
    desc: "HP Probook 8GB RAM / 512GB SSD",
    serialNumber: "503604242",
    assetNumber: "503604244",
    quantity: "13",
    unit: "OU",
    remarks: "OU KFC - BACLARAN",
  },
  {
    id: 26,
    delivery: "1025",
    desc: "ASUS Predator 8GB RAM / 512GB SSD",
    serialNumber: "503604243",
    assetNumber: "503604245",
    quantity: "17",
    unit: "BILLING",
    remarks: "BILLING KFC - MAKATI",
  },
];

function Deliveries() {
  const [openModal, setOpenModal] = useState(false);
  const [openNextModal, setOpenNextModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [supplierPopOver, setSupplierPopOver] = useState<{searchTerm: string, isOpen: boolean, results: SupplierType[], selected: string}>({
    searchTerm: '',
    isOpen: false,
    results: [],
    selected: '',
  });

  const [cancelTokenSource, setCancelTokenSource] = useState<CancelTokenSource | null>(null);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: unknown[]) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = useCallback(
    debounce(async (term: string) => {
      if (term) {
        try {
          // Cancel previous request if it exists
          if (cancelTokenSource) {
            cancelTokenSource.cancel();
          }

          // Create a new CancelTokenSource
          const source = axios.CancelToken.source();
          setCancelTokenSource(source);

          const response = await axios.get(`${getVersion()}/supplier/search?supplier=${term}`, {
            cancelToken: source.token,
            timeout: 5000,
          });
          setSupplierPopOver((prevState) => ({
            ...prevState,
            results: response.data.suppliers, // Assuming 'response.data' is an array of CategoryType
          }));
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log('Request canceled:', error.message);
          } else {
            console.error('Error fetching search results:', error);
          }
        }
      } else {
        setSupplierPopOver((prevState) => ({
          ...prevState,
          results: [], // Clear results if no search term
        }));
      }
    }, 500), // Adjust debounce delay as needed (500ms)
    []
  );

  useEffect(() => {
    if (supplierPopOver.searchTerm) {
      fetchData(supplierPopOver.searchTerm);
    }
  }, [supplierPopOver.searchTerm, fetchData]);

  const handleSelectMaterial = (material: MaterialType | null) => {
    setSelectedMaterial(material);
    setOpenModal(false);
    setOpenNextModal(true); // Open Assign To modal after selecting material
};

  const headerHeight = 50;
  const itemHeight = 65;

  const getItemsPerPage = (height: number): number => {
    const availableHeight = height - headerHeight;
    if (availableHeight <= 0) return 0;
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

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredInventory = deliveries.filter((deliveries) =>
    deliveries.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastInventory = currentPage * itemsPerPage;
  const indexOfFirstInventory = indexOfLastInventory - itemsPerPage;
  const currentDeliveries = filteredInventory.slice(
    indexOfFirstInventory,
    indexOfLastInventory
  );

  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);

  const handleBack = () => {
    setOpenNextModal(false);
    setOpenModal(true);
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex flex-row justify-between w-full">
          <div>
            <h1 className="text-2xl font-bold">Deliveries</h1>
            <p className="text-sm font-semibold text-[#9E9E9E]">
              Warehouse / Deliveries
            </p>
          </div>
          <div className="flex items-end">
            <Button
              className="bg-hoverCream text-fontHeading hover:text-white font-semibold w-36"
              onClick={() => setOpenModal(true)}
            >
              <Plus size={20} />
              <span className="text-sm">Add Delivery</span>
            </Button>
          </div>
        </div>
        <div className="mt-6 flex-grow overflow-y-auto px-2 ">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 mb-10">
            <div>
              <Label htmlFor="supplier">
                Supplier Name <span className=" text-red-500">*</span>
              </Label>
              <Popover open={supplierPopOver.isOpen} onOpenChange={(isOpen) => setSupplierPopOver((prevState) => ({ ...prevState, isOpen }))}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={supplierPopOver.isOpen}
                    className="w-full justify-between border-black"
                  >
                    {supplierPopOver.selected || "Select Supplier"}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search Supplier"
                      value={supplierPopOver.searchTerm}
                      onValueChange={(searchTerm) => setSupplierPopOver((prevState) => ({ ...prevState, searchTerm }))}
                    />
                    <CommandList>
                      <CommandEmpty>No supplier found.</CommandEmpty>
                      {supplierPopOver.results.length > 0 && (
                        <CommandGroup>
                          {supplierPopOver.results.map((supplier) => (
                            <CommandItem
                              key={supplier.id}
                              value={`${supplier.supplier_code} - ${supplier.company_name}`}
                              onSelect={(selected) => setSupplierPopOver((prevState) => ({ ...prevState, isOpen: false, selected: prevState.selected === selected ? "" : selected }))}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  supplierPopOver.selected === `${supplier.supplier_code} - ${supplier.company_name}`
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {`${supplier.supplier_code} - ${supplier.company_name}`}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="DR">
                Delivery Receipt No. <span className=" text-red-500">*</span>
              </Label>
              <Input id="DR" className=" focus:border-none" required />
            </div>
            <div>
              <Label htmlFor="PO">
                Product Order No. <span className=" text-red-500">*</span>
              </Label>
              <Input
                id="PO"
                type="Number"
                className=" focus:border-none"
                required
              />
            </div>
            <div>
              <Label htmlFor="PR">
                Purchase Request No. <span className=" text-red-500">*</span>
              </Label>
              <Input
                id="PR"
                type="Number"
                className=" focus:border-none"
                required
              />
            </div>
            <div>
              <Label htmlFor="Capex">
                Capex No. <span className=" text-red-500">*</span>
              </Label>
              <Input
                id="Capex"
                type="Number"
                className=" focus:border-none"
                required
              />
            </div>
            <div>
              <Label htmlFor="date">
                Date Entry <span className=" text-red-500">*</span>
              </Label>
              <Input
                id="date"
                type="Date"
                className=" focus:border-none"
                required
              />
            </div>
            <div>
              <Label htmlFor="warranty">
                End Warranty <span className=" text-red-500">*</span>
              </Label>
              <Input
                id="warranty"
                type="Date"
                className=" focus:border-none"
                required
              />
            </div>
          </div>
          <div className="mt-4 space-y-2 flex flex-col h-full relative">
            <div className="border-2 rounded-lg flex p-2 items-center space-x-3 ">
              <h1 className="text-sm">Deliveries</h1>
              <div className="relative w-1/3">
                <Input
                  type="search"
                  placeholder="Search Delivery Number"
                  className="pl-12 border-2 focus:border-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="border-2 rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Delivery Number</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Serial Number</TableHead>
                    <TableHead>Asset Number</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentDeliveries.map((deliveries) => (
                    <TableRow className="h-8" key={deliveries.id}>
                      <TableCell>{deliveries.delivery}</TableCell>
                      <TableCell>{deliveries.desc}</TableCell>
                      <TableCell>{deliveries.serialNumber}</TableCell>
                      <TableCell>{deliveries.assetNumber}</TableCell>
                      <TableCell>{deliveries.quantity}</TableCell>
                      <TableCell>{deliveries.unit}</TableCell>
                      <TableCell>{deliveries.remarks}</TableCell>
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
      </div>
      <SelectMaterialModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onNext={handleSelectMaterial} 
      />
      <AssignToModal
        open={openNextModal}
        onClose={() => setOpenNextModal(false)}
        material={selectedMaterial}
        onBack={handleBack}
      />
    </>
  );
}

export default Deliveries;
