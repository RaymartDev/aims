/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Check, ChevronDown, X } from "lucide-react";
import { Textarea } from "@/Components/ui/textarea";
import { useCallback, useEffect, useState } from "react";
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
  import { cn, getVersion } from "@/lib/utils";
  import type CompanyType from "@/interface/company"
import axios, { CancelTokenSource } from "axios";

interface AddSupplierModalProps {
    onClose: () => void;
    onNext: () => void;
    handleAddDetailChange: (target: string, value: string) => void;
    getAddDataByKey: (key: string) => string;
}

function AddSupplierModal ({ onClose, onNext, handleAddDetailChange, getAddDataByKey  }: AddSupplierModalProps) {

    const [companyPopOver, setCompanyPopOver] = useState<{searchTerm: string, isOpen: boolean, results: CompanyType[], selected: string}>({
        searchTerm: '',
        isOpen: false,
        results: [],
        selected: getAddDataByKey('companyName'),
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
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                cancelTokenSource.cancel();
            }

            // Create a new CancelTokenSource
            const source = axios.CancelToken.source();
            setCancelTokenSource(source);

            const response = await axios.get(`${getVersion()}/company/search?company=${term}`, {
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

    useEffect(() => {
        if (companyPopOver.searchTerm) {
          fetchData(companyPopOver.searchTerm);
        }
      }, [companyPopOver.searchTerm, fetchData]);

    return(
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4">
            <div className="flex flex-col w-2/5 2xl:w-1/3 bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between w-full border-b-2 border-black">
                    <h1 className="font-extrabold text-xl">Supplier Company Details</h1>
                    <Button className="text-black bg-transparent hover:bg-transparent p-0" onClick={() => {
                        onClose();
                        handleAddDetailChange('supplierCode', '');
                        handleAddDetailChange('companyName', '');
                        handleAddDetailChange('address', '');
                        handleAddDetailChange('contractTerm', '');
                        handleAddDetailChange('handleAddDetailChange', '');
                        setCompanyPopOver({
                            searchTerm: '',
                            isOpen: false,
                            results: [],
                            selected: getAddDataByKey('companyName'),
                        })
                    }}><X size={30}/></Button>
                </div>
                <div className="flex flex-col justify-start mt-5 space-y-2">
                    <div className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-1/3">
                            <p className="text-sm text-[#697386]">Supplier Code</p>
                            <Input value={getAddDataByKey('supplierCode')} onChange={(e) => handleAddDetailChange('supplierCode', e.target.value)} className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-2/3">
                            <p className="text-sm text-[#697386]">Company Name</p>
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
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-[#697386]">Address</p>
                        <Textarea value={getAddDataByKey('address')} onChange={(e) => handleAddDetailChange('address', e.target.value)} className="focus:border-none border-black"></Textarea>
                    </div>
                    <div className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Contract Term</p>
                            <Input value={getAddDataByKey('contractTerm')} onChange={(e) => handleAddDetailChange('contractTerm', e.target.value)} className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Tin Number</p>
                            <Input value={getAddDataByKey('tinNumber')} onChange={(e) => handleAddDetailChange('tinNumber', e.target.value)} className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                </div>
                <div className="space-x-2 mt-5 flex justify-end">
                    <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white" onClick={() => {
                        onClose();
                        handleAddDetailChange('supplierCode', '');
                        handleAddDetailChange('companyName', '');
                        handleAddDetailChange('address', '');
                        handleAddDetailChange('contractTerm', '');
                        handleAddDetailChange('handleAddDetailChange', '');
                        setCompanyPopOver({
                            searchTerm: '',
                            isOpen: false,
                            results: [],
                            selected: getAddDataByKey('companyName'),
                        })
                    }}><span>Cancel</span></Button>
                    <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white" onClick={() => {
                        handleAddDetailChange('companyName', companyPopOver.selected)
                        setCompanyPopOver({
                            searchTerm: '',
                            isOpen: false,
                            results: [],
                            selected: getAddDataByKey('companyName'),
                        })
                        onNext();
                    }}><span>Next</span></Button>
                </div>
            </div>
        </div>
    );
}

export default AddSupplierModal