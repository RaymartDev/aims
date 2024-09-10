/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { X } from "lucide-react";
import type EmployeeType from "@/interface/employee";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import axios, { CancelTokenSource } from "axios";
import { getVersion } from "@/lib/utils";
import { toast } from "react-toastify";

import { Check, ChevronDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/Components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { cn } from "@/lib/utils";
import type CompanyType from "@/interface/company"
import type DepartmentType from "@/interface/department"

interface AddEmployeeModalProps {
  onClose: () => void;
  addEmployee: (employee: EmployeeType | null) => void;
}

function AddEmployeeModal({ addEmployee, onClose }: AddEmployeeModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeNo, setEmployeeNo] = useState("");
  const [costCode, setCostCode] = useState("");
  const [dateHired, setDateHired] = useState("");
  const [division, setDivision] = useState("");

  const [companyPopOver, setCompanyPopOver] = useState<{searchTerm: string, isOpen: boolean, results: CompanyType[], selected: string}>({
    searchTerm: '',
    isOpen: false,
    results: [],
    selected: '',
  });

  const [departmentPopOver, setDepartmentPopOver] = useState<{searchTerm: string, isOpen: boolean, results: DepartmentType[], selected: string}>({
    searchTerm: '',
    isOpen: false,
    results: [],
    selected: '',
  });


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

  const [cancelTokenSource, setCancelTokenSource] = useState<CancelTokenSource | null>(null);
  
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

          const response = await axios.get(`${getVersion()}/company/search?name=${term}`, {
            cancelToken: source.token,
            timeout: 5000,
          });
          setCompanyPopOver((prevState) => ({
            ...prevState,
            results: response.data.companies, // Assuming 'response.data' is an array of CategoryType
          }));
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log('Request canceled:', error.message);
          } else {
            console.error('Error fetching search results:', error);
          }
        }
      } else {
        setCompanyPopOver((prevState) => ({
          ...prevState,
          results: [], // Clear results if no search term
        }));
      }
    }, 500), // Adjust debounce delay as needed (500ms)
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchDepartmentData = useCallback(
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

          const response = await axios.get(`${getVersion()}/department/search?name=${term}`, {
            cancelToken: source.token,
            timeout: 5000,
          });
          setDepartmentPopOver((prevState) => ({
            ...prevState,
            results: response.data.departments, // Assuming 'response.data' is an array of CategoryType
          }));
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log('Request canceled:', error.message);
          } else {
            console.error('Error fetching search results:', error);
          }
        }
      } else {
        setDepartmentPopOver((prevState) => ({
          ...prevState,
          results: [], // Clear results if no search term
        }));
      }
    }, 500), // Adjust debounce delay as needed (500ms)
    []
  );

  const clearData = () => {
    setCompanyPopOver({searchTerm: '',
      isOpen: false,
      results: [],
      selected: ''})
    setDepartmentPopOver({searchTerm: '',
      isOpen: false,
      results: [],
      selected: ''})
    setFirstName("");
    setLastName("");
    setEmployeeNo("");
    setCostCode("");
    setDateHired("");
    setDivision("");
  };

  const createEmployee = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${getVersion()}/employee`, {
        first_name: firstName,
        last_name: lastName,
        employee_no: employeeNo,
        cost_center_code: costCode,
        company: companyPopOver.selected,
        date_hired: new Date(dateHired),
        department: departmentPopOver.selected,
        division,
      });
      if (response.status >= 200 && response.status < 300) {
        toast.success("Successfully added employee!");
        addEmployee({
          id: response.data?.employee?.id || 1,
          first_name: firstName,
          last_name: lastName,
          employee_no: employeeNo,
          division,
          department_name: departmentPopOver.selected,
          cost_center_code: costCode,
          company_name: companyPopOver.selected,
          date_hired: new Date(dateHired),
          registered_status: false,
        });
      }
      onClose();
      clearData();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    if (companyPopOver.searchTerm) {
      fetchData(companyPopOver.searchTerm);
    }
  }, [companyPopOver.searchTerm, fetchData]);

  useEffect(() => {
    if (departmentPopOver.searchTerm) {
      fetchDepartmentData(departmentPopOver.searchTerm);
    }
  }, [departmentPopOver.searchTerm, fetchDepartmentData]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4">
      <div className="flex flex-col w-2/5 2xl:w-1/3 bg-slate-50 rounded-2xl p-6">
        <div className="flex items-center justify-between w-full border-b-2 border-black">
          <h1 className="font-extrabold text-xl">Add Employee</h1>
          <Button
            className="text-black bg-transparent hover:bg-transparent p-0"
            onClick={() => {
              onClose();
              clearData();
            }}
          >
            <X size={30} />
          </Button>
        </div>
        <div className="flex flex-col justify-start mt-5 space-y-2">
          <div className="flex flex-row w-full space-x-2">
            <div className="space-y-1 w-full">
              <p className="text-sm text-[#697386]">First Name</p>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="focus:border-none border-black"
              ></Input>
            </div>
            <div className="space-y-1 w-full">
              <p className="text-sm text-[#697386]">Last Name</p>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="focus:border-none border-black"
              ></Input>
            </div>
          </div>
          <div className="flex flex-row w-full space-x-2">
            <div className="space-y-1 w-full">
              <p className="text-sm text-[#697386]">Employee Number</p>
              <Input
                value={employeeNo}
                onChange={(e) => setEmployeeNo(e.target.value)}
                className="focus:border-none border-black"
              ></Input>
            </div>
            <div className="space-y-1 w-full">
              <p className="text-sm text-[#697386]">Cost Center Code</p>
              <Input
                value={costCode}
                onChange={(e) => setCostCode(e.target.value)}
                className="focus:border-none border-black"
              ></Input>
            </div>
          </div>
          <div className="flex flex-row w-full space-x-2">
            <div className="space-y-1 w-3/4">
              <p className="text-sm text-[#697386]">
                Company Name <span className=" text-red-500">*</span>{" "}
              </p>
              <Popover open={companyPopOver.isOpen} onOpenChange={(isOpen) => setCompanyPopOver((prevState) => ({ ...prevState, isOpen }))}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={companyPopOver.isOpen}
                    className="w-full justify-between border-black"
                  >
                    {companyPopOver.selected || "Select Company"}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search Company"
                      value={companyPopOver.searchTerm}
                      onValueChange={(searchTerm) => setCompanyPopOver((prevState) => ({ ...prevState, searchTerm }))}
                    />
                    <CommandList>
                      <CommandEmpty>No company found.</CommandEmpty>
                      {companyPopOver.results.length > 0 && (
                        <CommandGroup>
                          {companyPopOver.results.map((company) => (
                            <CommandItem
                              key={company.id}
                              value={company.name}
                              onSelect={(selected) => setCompanyPopOver((prevState) => ({ ...prevState, isOpen: false, selected: prevState.selected === selected ? "" : selected }))}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  companyPopOver.selected === company.name
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {company.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-1 w-1/3">
              <p className="text-sm text-[#697386]">Date Hired</p>
              <Input
                value={dateHired}
                onChange={(e) => setDateHired(e.target.value)}
                type="Date"
                className="focus:border-none border-black justify-center"
              ></Input>
            </div>
          </div>
          <div className="flex flex-row w-full space-x-2">
            <div className="space-y-1 w-full">
              <p className="text-sm text-[#697386]">Department</p>
              <Popover open={departmentPopOver.isOpen} onOpenChange={(isOpen) => setDepartmentPopOver((prevState) => ({ ...prevState, isOpen }))}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={departmentPopOver.isOpen}
                    className="w-full justify-between border-black"
                  >
                    {departmentPopOver.selected || "Select Department"}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search Department"
                      value={departmentPopOver.searchTerm}
                      onValueChange={(searchTerm) => setDepartmentPopOver((prevState) => ({ ...prevState, searchTerm }))}
                    />
                    <CommandList>
                      <CommandEmpty>No department found.</CommandEmpty>
                      {departmentPopOver.results.length > 0 && (
                        <CommandGroup>
                          {departmentPopOver.results.map((department) => (
                            <CommandItem
                              key={department.id}
                              value={department.name}
                              onSelect={(selected) => setDepartmentPopOver((prevState) => ({ ...prevState, isOpen: false, selected: prevState.selected === selected ? "" : selected }))}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  departmentPopOver.selected === department.name
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {department.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-1 w-full">
              <p className="text-sm text-[#697386]">Division</p>
              <Input
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                className="focus:border-none border-black"
              ></Input>
            </div>
          </div>
        </div>
        <div className="space-x-2 mt-5 flex justify-end">
          <Button
            className="bg-hoverCream text-fontHeading font-semibold hover:text-white"
            onClick={() => {
              onClose();
              clearData();
            }}
          >
            <span>Cancel</span>
          </Button>
          <Button
            onClick={(e) => createEmployee(e)}
            className="bg-hoverCream text-fontHeading font-semibold hover:text-white"
          >
            <span>Save</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddEmployeeModal;
