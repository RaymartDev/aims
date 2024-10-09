/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
import { cn, formatReference, getVersion } from "@/lib/utils";
import axios, { CancelTokenSource } from "axios";

function DeliveryReceipt() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("employee");
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [reference, setReference] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Function to fetch the maximum release number
    const fetchMaxReleaseNumber = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${getVersion()}/release-receipt/reference`); // API endpoint to fetch the release number
        setReference(response.data.reference); // Set the release number in state
      } catch (err) {
        toast.error('Failed to fetch release number'); // Set error if the API call fails
      } finally {
        setLoading(false);
      }
    };

    fetchMaxReleaseNumber(); // Call the function on component mount
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (loading) {
      toast.error('Please wait for reference number to generate!');
      return;
    }
    const release = {
      status: 0,
      release_number: reference,
    }

    const releaseDetails = selectedItems.map(item => ({
      material_id: item.id,
      quantity: item.quantity || 1,
      remarks: item.remarks || '',
    }));

    try {
      const response = await axios.post(`${getVersion()}/release-receipt`, {
        option: selectedOption,
        release: { ...release },
        release_detail: releaseDetails,
        id: selectedOption === "employee" ? employeePopOver.selected_id : storePopOver.selected_id,
      });
      if (response.status >= 200 && response.status < 300) {
        toast.success(response.data?.message || 'Successfully created delivery!.');

        setReference((prevReference) => prevReference + 1);
        setSelectedItems([]);
        if (selectedOption === "employee") {
          setEmployeePopOver({
            searchTerm: '',
            isOpen: false,
            results: [],
            selected: '',
            selected_id: 0,
          })
        } else {
          setStorePopOver({
            searchTerm: '',
            isOpen: false,
            results: [],
            selected: '',
            selected_id: 0,
          })
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
          toast.error(err.response?.data?.message || 'Something went wrong');
        } else {
          toast.error('Something went wrong');
      }
    }
  }

  const handleItemSelect = (material: SelectedItem) => {
    const exists = selectedItems.some(
      (item) => item.item_code === material.item_code || item.material_code === material.material_code
    );
  
    if (exists) {
      toast.error("This item already exists in the selection.");
      return; // Exit early if the item already exists
    }
    if (selectedItems.length < 11) {
      setSelectedItems((prevItems) => [...prevItems, material]);
      setOpenModal(false);
    } else {
      toast.error("You can only add up to 11 items.");
    }
  };

  const [employeePopOver, setEmployeePopOver] = useState<{searchTerm: string, isOpen: boolean, results: EmployeeType[], selected: string, selected_id: number}>({
    searchTerm: '',
    isOpen: false,
    results: [],
    selected: '',
    selected_id: 0,
  });

  const [storePopOver, setStorePopOver] = useState<{searchTerm: string, isOpen: boolean, results: StoreType[], selected: string, selected_id: number}>({
    searchTerm: '',
    isOpen: false,
    results: [],
    selected: '',
    selected_id: 0,
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
    navigate("/download", { state: { selectedItems, requestorName: 'requestor', code: 'code' } });
  };

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    
    if (value === "employee") {
      setStorePopOver({ searchTerm: '', isOpen: false, results: [], selected: '', selected_id: 0 }); // Clear store selection
    } else {
      setEmployeePopOver({ searchTerm: '', isOpen: false, results: [], selected: '', selected_id: 0 }); // Clear employee selection
    }
  };

  const handleQuantityChange = (index: number, value: number) => {
    // Create a new array with the updated quantity for the selected item
    const updatedItems = selectedItems.map((item, i) =>
      i === index ? { ...item, quantity: value } : item
    );

    // Update the state with the new array
    setSelectedItems(updatedItems);
  };

  const handleRemarksChange = (index: number, value: string) => {
    // Create a new array with the updated quantity for the selected item
    const updatedItems = selectedItems.map((item, i) =>
      i === index ? { ...item, remarks: value } : item
    );

    // Update the state with the new array
    setSelectedItems(updatedItems);
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
              value={formatReference(reference)}
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
                                onSelect={(selected) => setEmployeePopOver((prevState) => ({ ...prevState, isOpen: false, selected: prevState.selected === selected ? "" : selected, selected_id: prevState.selected === selected ? 0 : employee.id }))}
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
                                onSelect={(selected) => setStorePopOver((prevState) => ({ ...prevState, isOpen: false, selected: prevState.selected === selected ? "" : selected, selected_id: prevState.selected === selected ? 0 : store.id }))}
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
                <TableHead>Item Code</TableHead>
                <TableHead>Material Code</TableHead>
                <TableHead>Item Description</TableHead>
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
                      <TableCell>{item.item_code}</TableCell>
                      <TableCell>{item.material_code}</TableCell>
                      <TableCell>{item.item_description}</TableCell>
                      <TableCell>
                          {item.material_con === 'y' ? 1 : <Input
                              type="number"
                              className="w-16 focus:border-none h-7"
                              value={item.quantity || 1}
                              onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                          />}
                      </TableCell>
                      <TableCell>{item.uom}</TableCell>
                      <TableCell>{item.serial_number}</TableCell>
                      <TableCell>
                          <Input
                              className="focus:border-none h-7"
                              value={item.remarks || ''}
                              onChange={(e) => handleRemarksChange(index, e.target.value)}
                          />
                      </TableCell>
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
          onClick={(e) => handleSubmit(e)}>
            Submit
          </Button>
        </div>
      </div>

      { openModal && <SelectItemModal open={openModal} onClose={() => setOpenModal(false)} onItemSelect={handleItemSelect}/> }
    </>
  );
}

export default DeliveryReceipt;
