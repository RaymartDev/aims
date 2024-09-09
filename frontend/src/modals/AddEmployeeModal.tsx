/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { X } from "lucide-react";
import type EmployeeType from "@/interface/employee";
import { MouseEvent, useState } from "react";
import axios from "axios";
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

interface AddEmployeeModalProps {
  onClose: () => void;
  addEmployee: (employee: EmployeeType | null) => void;
}

const company = [
  { value: "kfc", label: "KFC" },
  { value: "tokyo_tokyo", label: "Tokyo Tokyo" },
  { value: "mcdonalds", label: "McDonald's" },
  { value: "starbucks", label: "Starbucks" },
  { value: "burger_king", label: "Burger King" },
  { value: "pizza_hut", label: "Pizza Hut" },
  { value: "subway", label: "Subway" },
  { value: "dunkin_donuts", label: "Dunkin' Donuts" },
  { value: "wendys", label: "Wendy's" },
  { value: "dominos", label: "Domino's Pizza" },
  { value: "panda_express", label: "Panda Express" },
  { value: "chipotle", label: "Chipotle" },
  { value: "chick_fil_a", label: "Chick-fil-A" },
  { value: "taco_bell", label: "Taco Bell" },
  { value: "arbys", label: "Arby's" },
  { value: "five_guys", label: "Five Guys" },
  { value: "baskin_robbins", label: "Baskin Robbins" },
  { value: "popeyes", label: "Popeyes" },
  { value: "panera_bread", label: "Panera Bread" },
  { value: "krispy_kreme", label: "Krispy Kreme" },
];

function AddEmployeeModal({ addEmployee, onClose }: AddEmployeeModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeNo, setEmployeeNo] = useState("");
  const [costCode, setCostCode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [dateHired, setDateHired] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [division, setDivision] = useState("");
  const [openPopover, setOpenPopover] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleSelect = (currentValue: string) => {
    setSelectedCompany(currentValue === selectedCompany ? "" : currentValue);
    setOpenPopover(false);
  };

  const filteredCategories = company
    .filter((company) =>
      company.label.toLowerCase().includes(inputValue.toLowerCase())
    )
    .slice(0, 3);

  const clearData = () => {
    setFirstName("");
    setLastName("");
    setEmployeeNo("");
    setCostCode("");
    setCompanyName("");
    setDateHired("");
    setDepartmentName("");
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
        company: companyName,
        date_hired: new Date(dateHired),
        department: departmentName,
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
          department_name: departmentName,
          cost_center_code: costCode,
          company_name: companyName,
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4">
      <div className="flex flex-col w-2/5 2xl:w-1/3 bg-slate-50 rounded-2xl p-6">
        <div className="flex items-center justify-between w-full border-b-2 border-black">
          <h1 className="font-extrabold text-xl">Add Employee</h1>
          <Button
            className="text-black bg-transparent hover:bg-transparent p-0"
            onClick={onClose}
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
              <p className="text-sm text-[#697386]">Company Name</p>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="focus:border-none border-black"
              ></Input>
            </div>

            <div className="space-y-1 w-3/4">
              <p className="text-sm text-[#697386]">
                Company Name <span className=" text-red-500">*</span>{" "}
              </p>
              <Popover open={openPopover} onOpenChange={setOpenPopover}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openPopover}
                    className="w-full justify-between border-black"
                  >
                    {selectedCompany
                      ? company.find(
                          (company) => company.value === selectedCompany
                        )?.label
                      : "Select Category"}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search Category"
                      value={inputValue}
                      onValueChange={setInputValue}
                    />
                    <CommandList>
                      <CommandEmpty>No category found.</CommandEmpty>
                      {filteredCategories.length > 0 && (
                        <CommandGroup>
                          {filteredCategories.map((company) => (
                            <CommandItem
                              key={company.value}
                              value={company.value}
                              onSelect={() => handleSelect(company.value)}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedCompany === company.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {company.label}
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
              <Input
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                className="focus:border-none border-black"
              ></Input>
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
