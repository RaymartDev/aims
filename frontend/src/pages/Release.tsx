/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { Label } from "@/Components/ui/label";
import SelectItemModal from "@/modals/SelectItemModal";
import { Plus, Trash, Check, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type SelectedItem from "@/interface/drReleaseItem"
import { toast } from "react-toastify";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/Components/ui/command";
import type EmployeeType from "@/interface/employee"
import type StoreType from "@/interface/store"
import { cn, getVersion } from "@/lib/utils";
import axios, { CancelTokenSource } from "axios";

function DeliveryReceipt() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("employee");
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [requestorName, setRequestorName] = useState('')
  const [code, setCode] = useState('')

  const handleItemSelect = (material: SelectedItem) => {
    if (selectedItems.length < 11) {
      setSelectedItems((prevItems) => [...prevItems, material]);
      setOpenModal(false);
    } else {
      toast.error("You can only add up to 11 items.");
    }
  };

  const [employeePopOver, setEmployeePopOver] = useState<{searchTerm: string, isOpen: boolean, results: EmployeeType[], selected: string}>({
    searchTerm: '',
    isOpen: false,
    results: [],
    selected: '',
  });

  const [storePopOver, setStorePopOver] = useState<{searchTerm: string, isOpen: boolean, results: StoreType[], selected: string}>({
    searchTerm: '',
    isOpen: false,
    results: [],
    selected: '',
  });

  const [cancelTokenSource, setCancelTokenSource] = useState<CancelTokenSource | null>(null);

  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: unknown[]) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

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

          const response = await axios.get(`${getVersion()}/employee/search?employee=${term}`, {
            cancelToken: source.token,
            timeout: 5000,
          });
          
          setEmployeePopOver((prevState) => ({
            ...prevState,
            results: response.data.employees, // Assuming 'response.data' is an array of CategoryType
          }));
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log('Request canceled:', error.message);
          } else {
            console.error('Error fetching search results:', error);
          }
        }
      } else {
        setEmployeePopOver((prevState) => ({
          ...prevState,
          results: [], // Clear results if no search term
        }));
      }
    }, 500), // Adjust debounce delay as needed (500ms)
    []
  );

  const fetchStoreData = useCallback(
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

          const response = await axios.get(`${getVersion()}/store/search?store=${term}`, {
            cancelToken: source.token,
            timeout: 5000,
          });

          setStorePopOver((prevState) => ({
            ...prevState,
            results: response.data.stores, // Assuming 'response.data' is an array of CategoryType
          }));
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log('Request canceled:', error.message);
          } else {
            console.error('Error fetching search results:', error);
          }
        }
      } else {
        setStorePopOver((prevState) => ({
          ...prevState,
          results: [], // Clear results if no search term
        }));
      }
    }, 500), // Adjust debounce delay as needed (500ms)
    []
  );

  useEffect(() => {
    if (employeePopOver.searchTerm) {
      fetchData(employeePopOver.searchTerm);
    }
  }, [employeePopOver.searchTerm, fetchData]);

  useEffect(() => {
    if (storePopOver.searchTerm) {
      fetchStoreData(storePopOver.searchTerm);
    }
  }, [storePopOver.searchTerm, fetchStoreData]);

  const handleItemDelete = (index: number) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((_, i) => i !== index)
    );
  };

  const handlePrint = () => {
    navigate("/download", { state: { selectedItems, requestorName, code } });
  };

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    
    if (value === "employee") {
      setStorePopOver({ searchTerm: '', isOpen: false, results: [], selected: '' }); // Clear store selection
    } else {
      setEmployeePopOver({ searchTerm: '', isOpen: false, results: [], selected: '' }); // Clear employee selection
    }
  };

  return (
    <>
      <div className="flex flex-col h-full w-full">
        <div className="flex flex-col w-full">
          <h1 className="text-2xl font-bold">Release</h1>
          <p className="text-sm font-semibold text-[#9E9E9E]">
            Order / Release
          </p>
        </div>
        <div className="flex flex-col w-full justify-between space-y-5 pt-10">
          <div className="flex flex-col w-1/2">
            <p className="text-lg font-semibold">Reference Number </p>
            <Input
              className="border-none w-full h-16 text-4xl text-red-700"
              disabled
              value={10012021}
            />
          </div>
          <div className="flex flex-row space-x-5 mt-5">
            <div className="flex">
              <RadioGroup
                value={selectedOption}
                onValueChange={handleOptionChange}
                className="flex flex-row"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="employee" id="employee" />
                  <Label htmlFor="employee">Employee</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="store" id="store" />
                  <Label htmlFor="store">Store</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div className="flex space-x-5 w-1/2">
            <div>
              <Label htmlFor="firstField">
                {selectedOption === "employee"
                  ? "Employee Number "
                  : "Cost Center Number "}
                <span className=" text-red-500">*</span>
              </Label>
              {selectedOption === "employee" ? (
                <Popover
                  open={employeePopOver.isOpen}
                  onOpenChange={(isOpen) => setEmployeePopOver((prevState) => ({ ...prevState, isOpen }))}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={employeePopOver.isOpen}
                      className="w-full justify-between border-black"
                    >
                      {employeePopOver.selected || "Select Employee"}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search Employee"
                        value={employeePopOver.searchTerm}
                        onValueChange={(searchTerm) => setEmployeePopOver((prevState) => ({ ...prevState, searchTerm }))}
                      />
                      <CommandList>
                        <CommandEmpty>No employee found.</CommandEmpty>
                        {employeePopOver.results.length > 0 && (
                          <CommandGroup>
                            {employeePopOver.results.map((employee) => (
                              <CommandItem
                                key={employee.id}
                                value={`${employee.employee_no} - ${employee.first_name} ${employee.last_name}`}
                                onSelect={(selected) => setEmployeePopOver((prevState) => ({ ...prevState, isOpen: false, selected: prevState.selected === selected ? "" : selected }))}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    employeePopOver.selected === `${employee.employee_no} - ${employee.first_name} ${employee.last_name}`
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {`${employee.employee_no} - ${employee.first_name} ${employee.last_name}`}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        )}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              ) : (
                <Popover
                  open={storePopOver.isOpen}
                  onOpenChange={(isOpen) => setStorePopOver((prevState) => ({ ...prevState, isOpen }))}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={storePopOver.isOpen}
                      className="w-full justify-between border-black"
                    >
                      {storePopOver.selected || "Select Store"}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search Store"
                        value={storePopOver.searchTerm}
                        onValueChange={(searchTerm) => setStorePopOver((prevState) => ({ ...prevState, searchTerm }))}
                      />
                      <CommandList>
                        <CommandEmpty>No store found.</CommandEmpty>
                        {storePopOver.results.length > 0 && (
                          <CommandGroup>
                            {storePopOver.results.map((store) => (
                              <CommandItem
                                key={store.id}
                                value={`${store.cost_center_code} - ${store.name}`}
                                onSelect={(selected) => setStorePopOver((prevState) => ({ ...prevState, isOpen: false, selected: prevState.selected === selected ? "" : selected }))}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    storePopOver.selected === `${store.cost_center_code} - ${store.name}`
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {`${store.cost_center_code} - ${store.name}`}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        )}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
            </div>
              <div className="flex flex-col justify-end space-y-2 w-1/2">
                <p className="text-sm">
                  Requestor Name <span className=" text-red-500">*</span>
                </p>
                <Input 
                  className="focus:border-none w-full"
                  value={requestorName}
                  onChange={(e) => setRequestorName(e.target.value)} />
              </div>
            </div>

            <div className="flex justify-end items-end gap-4">
              <Button className="bg-hoverCream text-fontHeading border hover:text-white font-semibold w-36">
                <Plus size={20} />
                <span className="text-sm">Scan Item</span>
              </Button>
              <Button
                className="bg-hoverCream text-fontHeading border hover:text-white font-semibold w-36"
                onClick={() => setOpenModal(true)}
              >
                <Plus size={20} />
                <span className="text-sm">Add Item</span>
              </Button>
            </div>

          </div>
        </div>
        <div
          className="overflow-y-auto mt-5"
          style={{ maxHeight: `calc(100vh - ${70 + 270}px)` }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Number</TableHead>
                <TableHead>Item Description</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Serial Number</TableHead>
                <TableHead>Remarks</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedItems.map((item, index) => (
                  <TableRow className="h-8" key={index}>
                      <TableCell>{item.material_code}</TableCell>
                      <TableCell>{item.item_description}</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>
                          <Input
                              type="number"
                              className="w-16 focus:border-none h-7"
                          />
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.item_code}</TableCell>
                      <TableCell>N/A</TableCell>
                      <TableCell>
                          <Button className="bg-white text-red-500 hover:text-white" onClick={() => handleItemDelete(index)}>
                              <Trash />
                          </Button>
                      </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="space-x-2 flex items-end mt-5">
          <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white w-36"
          onClick={handlePrint}>
            Print
          </Button>
        </div>
      </div>

      <SelectItemModal open={openModal} onClose={() => setOpenModal(false)} onItemSelect={handleItemSelect}/>
    </>
  );
}

export default DeliveryReceipt;
