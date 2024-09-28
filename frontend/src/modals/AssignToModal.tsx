/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-types */
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { Check, ChevronDown, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/Components/ui/command";
import type EmployeeType from "@/interface/employee"
import type StoreType from "@/interface/store"
import { cn, getVersion } from "@/lib/utils";
import axios, { CancelTokenSource } from "axios";

interface DestinationModalProps {
  open: boolean;
  onClose: () => void;
  onBack: () => void;
}

function AssignToModal({ open, onClose, onBack }: DestinationModalProps) {
  const [selectedOption, setSelectedOption] = useState("employee");

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


  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    
    if (value === "employee") {
      setStorePopOver({ searchTerm: '', isOpen: false, results: [], selected: '' }); // Clear store selection
    } else {
      setEmployeePopOver({ searchTerm: '', isOpen: false, results: [], selected: '' }); // Clear employee selection
    }
  };


  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4 ">
        <div className="flex flex-col w-1/3 bg-slate-50 rounded-2xl p-6">
          <div className="flex items-center justify-between w-full border-b-2 border-black">
            <h1 className="font-extrabold text-xl">Assign To</h1>
            <Button
              className="text-black bg-transparent hover:bg-transparent p-0"
              onClick={onClose}
            >
              <X size={30} />
            </Button>
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
          <div className="flex flex-col justify-start mt-5 space-y-2">
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
            <div className="flex flex-row w-full space-x-2">
              <div className="space-y-1 w-1/2">
                <Label htmlFor="name">
                  {selectedOption === "employee"
                    ? "Employee Name"
                    : "Store Name"}
                </Label>
                <Input id="name" className="focus:border-none" readOnly/>
              </div>
              <div className="space-y-1 w-1/2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  readOnly
                  className="focus:border-none active:border-none"
                />
              </div>
            </div>
            <div className="flex flex-row w-full space-x-2">
              <div className="space-y-1 w-full">
                <Label htmlFor="request">Requestor Name</Label>
                <Input id="request" type="Text" className="focus:border-none" />
              </div>
              <div className="space-y-1 w-full">
                <Label htmlFor="user">Username</Label>
                <Input id="user" type="Text" className="focus:border-none" />
              </div>
            </div>
            <div>
              <h1 className="mt-3 font-bold">Material Info</h1>
              <hr />
            </div>
            <div className="space-y-1 w-full">
                <Label htmlFor="user">Material Description</Label>
                <Input id="user" type="Text" className="focus:border-none" disabled  />
            </div>
            <div className="flex flex-row w-full space-x-2">
              <div className="space-y-1 w-full">
                <Label htmlFor="request">Category</Label>
                <Input id="request" type="Text" className="focus:border-none" disabled  />
              </div>
              <div className="space-y-1 w-full">
                <Label htmlFor="user">Type</Label>
                <Input id="user" type="Text" className="focus:border-none" disabled  />
              </div>
            </div>
            <div className="flex flex-row w-full space-x-2">
              <div className="space-y-1 w-full">
                <Label htmlFor="request">Quantity</Label>
                <Input id="request" type="Number" className="focus:border-none w-1/2" />
              </div>
              <div className="space-y-1 w-full">
                <Label htmlFor="user">Remarks</Label>
                <Input id="user" type="Text" className="focus:border-none" />
              </div>
            </div>
          </div>
          <div className="space-x-2 mt-5 flex justify-end">
            <Button
              className="bg-hoverCream text-fontHeading font-semibold hover:text-white"
              onClick={onBack}
            >
              <span>Back</span>
            </Button>
            <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white">
              <span>Save</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssignToModal;
