/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-types */
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import AddAssetModal from "@/modals/AddAssetModal";
import { Check, ChevronDown, Plus, Trash } from "lucide-react";
import { Textarea } from "@/Components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/Components/ui/command";
import { cn, formatReference, formatReleaseStatus, getVersion } from "@/lib/utils";
import axios, { CancelTokenSource } from "axios";
import type ReleaseType from "@/interface/release"

const itemList = [
  {
    id: 1,
    itemNumber: "215424",
    itemDesc: "HP Probook 8GB RAM / 512GB SSD",
    quantity: 2,
    unit: "PC",
    serialNumber: "1234",
    remarks: "N/A",
  },
  {
    id: 2,
    itemNumber: "215425",
    itemDesc: "ASUS ROG 16GB RAM / 1TB SSD",
    quantity: 3,
    unit: "PC",
    serialNumber: "5678",
    remarks: "New",
  },
  {
    id: 3,
    itemNumber: "215426",
    itemDesc: "Dell XPS 13 8GB RAM / 256GB SSD",
    quantity: 1,
    unit: "PC",
    serialNumber: "9101",
    remarks: "Refurbished",
  },
  {
    id: 4,
    itemNumber: "215427",
    itemDesc: "Lenovo ThinkPad 16GB RAM / 512GB SSD",
    quantity: 4,
    unit: "PC",
    serialNumber: "1121",
    remarks: "In Use",
  },
  {
    id: 5,
    itemNumber: "215428",
    itemDesc: "Apple MacBook Pro 16GB RAM / 512GB SSD",
    quantity: 2,
    unit: "PC",
    serialNumber: "3141",
    remarks: "Damaged",
  },
  {
    id: 6,
    itemNumber: "215429",
    itemDesc: "HP EliteBook 8GB RAM / 1TB SSD",
    quantity: 1,
    unit: "PC",
    serialNumber: "5161",
    remarks: "Under Repair",
  },
  {
    id: 7,
    itemNumber: "215430",
    itemDesc: "Microsoft Surface Pro 4GB RAM / 128GB SSD",
    quantity: 3,
    unit: "PC",
    serialNumber: "7181",
    remarks: "Returned",
  },
  {
    id: 8,
    itemNumber: "215431",
    itemDesc: "Acer Aspire 8GB RAM / 256GB SSD",
    quantity: 5,
    unit: "PC",
    serialNumber: "9202",
    remarks: "New",
  },
  {
    id: 9,
    itemNumber: "215432",
    itemDesc: "Samsung Galaxy Book 12GB RAM / 512GB SSD",
    quantity: 1,
    unit: "PC",
    serialNumber: "1232",
    remarks: "N/A",
  },
  {
    id: 10,
    itemNumber: "215433",
    itemDesc: "Razer Blade 16GB RAM / 1TB SSD",
    quantity: 2,
    unit: "PC",
    serialNumber: "3243",
    remarks: "Used",
  },
  {
    id: 11,
    itemNumber: "215434",
    itemDesc: "MSI GF63 8GB RAM / 512GB SSD",
    quantity: 2,
    unit: "PC",
    serialNumber: "4254",
    remarks: "New",
  },
  {
    id: 12,
    itemNumber: "215435",
    itemDesc: "HP Pavilion 8GB RAM / 1TB SSD",
    quantity: 1,
    unit: "PC",
    serialNumber: "5265",
    remarks: "In Use",
  },
  {
    id: 13,
    itemNumber: "215436",
    itemDesc: "Toshiba Tecra 4GB RAM / 256GB SSD",
    quantity: 4,
    unit: "PC",
    serialNumber: "6276",
    remarks: "Returned",
  },
  {
    id: 14,
    itemNumber: "215437",
    itemDesc: "Sony Vaio 8GB RAM / 512GB SSD",
    quantity: 1,
    unit: "PC",
    serialNumber: "7287",
    remarks: "Refurbished",
  },
  {
    id: 15,
    itemNumber: "215438",
    itemDesc: "Huawei MateBook 16GB RAM / 1TB SSD",
    quantity: 1,
    unit: "PC",
    serialNumber: "8298",
    remarks: "New",
  },
];

const drData = [
  { drNumber: "DR001", name: "John Doe", employeeId: "EMP001" },
  { drNumber: "DR002", name: "Acme Store", costCenterCode: "CC001" },
  { drNumber: "DR003", name: "Jane Smith", employeeId: "EMP002" },
  { drNumber: "DR004", name: "Tech Supplies", costCenterCode: "CC002" },
];

type ReturnQuantities = {
  [key: number]: number;
};

function AcknowledgementReceipt() {
  const [openModal, setOpenModal] = useState(false);
  const [returnQuantities, setReturnQuantities] = useState<ReturnQuantities>(
    itemList.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {})
  );
  const [selectedDR, setSelectedDR] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const navigate = useNavigate();

  const handlePrint = () => {
    navigate('/ar/download');
  }

  const headerHeight = 72;

  const getItemsPerPage = (height: number): number => {
    const availableHeight = height - headerHeight;
    if (availableHeight < 500) return 15;
    return 15;
  };

  const [currentPage] = useState(1);
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem = itemList.slice(indexOfFirstItem, indexOfLastItem);

  const handleQuantityChange = (
    id: number,
    value: string,
    maxQuantity: number
  ) => {
    const numericValue = Number(value);
    const newValue = Math.max(0, Math.min(numericValue, maxQuantity));
    setReturnQuantities({ ...returnQuantities, [id]: newValue });
  };

  const getCodeOrId = () => {
    const selectedData = drData.find((item) => item.drNumber === selectedDR);
    return selectedType === "store"
      ? selectedData?.costCenterCode || ""
      : selectedData?.employeeId || "";
  };

  const [drPopOver, setDRPopOver] = useState<{searchTerm: string, isOpen: boolean, results: ReleaseType[], selected: string}>({
    searchTerm: '',
    isOpen: false,
    results: [],
    selected: '',
  });

  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: unknown[]) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const [cancelTokenSource, setCancelTokenSource] = useState<CancelTokenSource | null>(null);

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

          const response = await axios.get(`${getVersion()}/release-receipt/searchActive?release=${term}`, {
            cancelToken: source.token,
            timeout: 5000,
          });
          setDRPopOver((prevState) => ({
            ...prevState,
            results: response.data.releases, // Assuming 'response.data' is an array of CategoryType
          }));
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log('Request canceled:', error.message);
          } else {
            console.error('Error fetching search results:', error);
          }
        }
      } else {
        setDRPopOver((prevState) => ({
          ...prevState,
          results: [], // Clear results if no search term
        }));
      }
    }, 500), // Adjust debounce delay as needed (500ms)
    []
  );

  useEffect(() => {
    if (drPopOver.searchTerm) {
      fetchData(drPopOver.searchTerm);
    }
  }, [drPopOver.searchTerm, fetchData]);

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex flex-col w-full">
          <h1 className="text-2xl font-bold">Return</h1>
          <p className="text-sm font-semibold text-[#9E9E9E]">Order / Return</p>
        </div>
        <div className="flex w-full justify-between gap-8 2xl:gap-20 pt-10">
          <div className="flex flex-row gap-6 w-3/4">
            <div className="flex flex-col w-2/3 space-y-5">
              <div className="flex space-x-5">
                <div className="space-y-2 w-1/2">
                  <p className="text-sm">
                    DR Number <span className=" text-red-500">*</span>
                  </p>
                  <Popover open={drPopOver.isOpen} onOpenChange={(isOpen) => setDRPopOver((prevState) => ({ ...prevState, isOpen }))}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={drPopOver.isOpen}
                        className="w-full justify-between border-black"
                      >
                        {drPopOver.selected || "Select Category"}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search Category"
                          value={drPopOver.searchTerm}
                          onValueChange={(searchTerm) => setDRPopOver((prevState) => ({ ...prevState, searchTerm }))}
                        />
                        <CommandList>
                          <CommandEmpty>No release found.</CommandEmpty>
                          {drPopOver.results.length > 0 && (
                            <CommandGroup>
                              {drPopOver.results.map((release) => (
                                <CommandItem
                                  key={release.id}
                                  value={formatReference(release.release_number)}
                                  onSelect={(selected) => setDRPopOver((prevState) => ({ ...prevState, isOpen: false, selected: prevState.selected === selected ? "" : selected }))}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      drPopOver.selected === formatReference(release.release_number)
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {formatReference(release.release_number)} - {formatReleaseStatus(release.status)}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          )}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2 w-1/2">
                  <p className="text-sm">
                    Tagged Item As <span className=" text-red-500">*</span>
                  </p>
                  <Select>
                    <SelectTrigger className="focus:border-none">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="ou">Original Unit</SelectItem>
                        <SelectItem value="billing">Billing</SelectItem>
                        <SelectItem value="du">Return Demo Unit</SelectItem>
                        <SelectItem value="su">Return Service Unit</SelectItem>
                        <SelectItem value="fl">Safekeep</SelectItem>
                        <SelectItem value="fr">For Repair</SelectItem>
                        <SelectItem value="pu">Pull Out</SelectItem>
                        <SelectItem value="pt">P. Transfer</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm">
                  Reason Transfer <span className=" text-red-500">*</span>
                </p>
                <Input className="focus:border-none" />
              </div>
            </div>
            <div className="flex flex-col w-full space-y-2">
              <p className="text-sm">
                Remarks <span className=" text-red-500">*</span>
              </p>
              <Textarea className="focus:border-none max-h-28 min-h-28" />
            </div>
          </div>
          <div className="flex justify-end items-end">
            <Button
              className="bg-hoverCream text-fontHeading border hover:text-white font-semibold w-36"
              onClick={() => setOpenModal(true)}
            >
              <Plus size={20} />
              <span className="text-sm">Add Asset</span>
            </Button>
          </div>
        </div>
        <div className="mt-5">
          <p className="text-lg font-semibold">Assigned To</p>
        </div>
        <div className="flex flex-row w-3/4 space-x-5 mt-3">
          <div className="space-y-2 w-1/3">
            <p className="text-sm">
              Name <span className=" text-red-500">*</span>
            </p>
            <Input
              className="focus:border-none"
              value={selectedName}
              readOnly
              disabled
            />
          </div>
          <div className="space-y-2 w-1/3">
            <p className="text-sm">
              Employee No.
              <span className=" text-red-500">*</span>
            </p>
            <Input
              className="focus:border-none text-black"
              value={getCodeOrId()}
              readOnly
              disabled
            />
          </div>
          <div className="space-y-2 w-1/3">
            <p className="text-sm">
              Cost Center Code
              <span className=" text-red-500">*</span>
            </p>
            <Input
              className="focus:border-none text-black"
              value={getCodeOrId()}
              readOnly
              disabled
            />
          </div>
        </div>
        <div
          className="overflow-y-auto mt-5"
          style={{ maxHeight: `calc(100vh - ${headerHeight + 270}px)` }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Number</TableHead>
                <TableHead>Item Description</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Return</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Serial Number</TableHead>
                <TableHead>Remarks</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItem.map((itemList) => (
                <TableRow className="h-8" key={itemList.id}>
                  <TableCell>{itemList.itemNumber}</TableCell>
                  <TableCell>{itemList.itemDesc}</TableCell>
                  <TableCell>{itemList.quantity}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      className="w-16 focus:border-none h-7"
                      value={returnQuantities[itemList.id]}
                      onChange={(e) =>
                        handleQuantityChange(
                          itemList.id,
                          e.target.value,
                          itemList.quantity
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>{itemList.unit}</TableCell>
                  <TableCell>{itemList.serialNumber}</TableCell>
                  <TableCell>{itemList.remarks}</TableCell>
                  <TableCell>
                    <Button className="bg-white text-red-500 hover:text-white">
                      <Trash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-end mt-5">
          <Button
            className="bg-hoverCream text-fontHeading font-semibold hover:text-white w-36" onClick={handlePrint}>
            Print
          </Button>
        </div>
      </div>

      <AddAssetModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}

export default AcknowledgementReceipt;
