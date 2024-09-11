/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { X } from "lucide-react";
import type StoreType from "@/interface/store";
import { useCallback, useEffect, useState } from "react";
import axios, { CancelTokenSource } from "axios";
import { toast } from "react-toastify";
import { getActiveStatus, getVersion } from "@/lib/utils";

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

interface EditStoreModalProps {
    store: StoreType | null;
    onClose: () => void;
    updateStore: (store: StoreType | null) => void;
}

function EditStoreModal({ store, onClose, updateStore }: EditStoreModalProps) {
    const [companyName, setCompanyName] = useState(store?.company_name || '');
    const [name, setName] = useState(store?.name || '');
    const [costCode, setCostCode] = useState(store?.cost_center_code || '');
    const [address, setAddress] = useState(store?.address || '');

    const [companyPopOver, setCompanyPopOver] = useState<{searchTerm: string, isOpen: boolean, results: CompanyType[], selected: string}>({
        searchTerm: '',
        isOpen: false,
        results: [],
        selected: store?.company_name || '',
      });

    const clearData = () => {
        setCompanyPopOver({searchTerm: '',
            isOpen: false,
            results: [],
            selected: ''})
        setCompanyName('');
        setName('');
        setCostCode('');
        setAddress('');
    }

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

    const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${getVersion()}/store/update/${store?.id || 1}`, {
                company_name: companyName,
                name,
                cost_center_code: costCode,
                address: address,
            });
            if (response.status >= 200 && response.status < 300) {
                toast.success(response.data?.message || 'Successfully updated store');
                updateStore({
                    id: store?.id || 1,
                    company_name: companyName,
                    name,
                    cost_center_code: costCode,
                    address,
                    registered_status: response.data?.registered,
                    active_status: getActiveStatus(response.data?.store),
                })
            }
            clearData();
            onClose();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message || 'Something went wrong');
              } else {
                toast.error('Something went wrong')
              }
        }
    }

    useEffect(() => {
        if (companyPopOver.searchTerm) {
          fetchData(companyPopOver.searchTerm);
        }
      }, [companyPopOver.searchTerm, fetchData]);
    

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
            <div className="flex flex-col w-2/5 2xl:w-1/3 bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between w-full border-b-2 border-black">
                    <h1 className="font-extrabold text-xl">Edit Store</h1>
                    <Button className="text-black bg-transparent hover:bg-transparent p-0" onClick={onClose}><X size={30} /></Button>
                </div>
                <div className="flex flex-col justify-start mt-5 space-y-2">
                    <div className="space-y-1">
                        <p className="text-sm text-[#697386]">Company</p>
                        <Popover open={companyPopOver.isOpen} onOpenChange={(isOpen) => setCompanyPopOver((prevState) => ({ ...prevState, isOpen }))}>
                                <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={companyPopOver.isOpen}
                                    className="w-full justify-between border-black"
                                >
                                    {companyPopOver.selected || 'Select Company'}
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
                    <div className="space-y-1">
                        <p className="text-sm text-[#697386]">Store Name</p>
                        <Input value={name} onChange={(e) => setName(e.target.value)} className="focus:border-none border-black"></Input>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-[#697386]">Cost Center Code</p>
                        <Input value={costCode} onChange={(e) => setCostCode(e.target.value)} className="focus:border-none border-black"></Input>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-[#697386]">Address</p>
                        <Input value={address} onChange={(e) => setAddress(e.target.value)} className="focus:border-none border-black"></Input>
                    </div>
                </div>
                <div className="space-x-2 mt-5 flex justify-end">
                    <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white" onClick={() => {
                        onClose();
                        clearData();
                    }}><span>Cancel</span></Button>
                    <Button onClick={(e) => handleUpdate(e)} className="bg-hoverCream text-fontHeading font-semibold hover:text-white"><span>Save</span></Button>
                </div>
            </div>
        </div>
    );
}

export default EditStoreModal;
