/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { X, Check, ChevronDown } from "lucide-react";
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
import { cn, getActiveStatus, getVersion } from "@/lib/utils";
import MaterialType from "@/interface/material";
import type CategoryType from "@/interface/category";
import type TypeInterface from "@/interface/types";
import axios, { CancelTokenSource } from "axios";
import { toast } from "react-toastify";

interface AddMaterialModalProps {
  onClose: () => void;
  addMaterial: (material: MaterialType | null) => void;
}

function AddMaterialModal({ addMaterial, onClose }: AddMaterialModalProps) {
  const [categoryPopOver, setCategoryPopOver] = useState<{searchTerm: string, isOpen: boolean, results: CategoryType[], selected: string}>({
    searchTerm: '',
    isOpen: false,
    results: [],
    selected: '',
  });

  const [typePopOver, setTypePopOver] = useState<{searchTerm: string, isOpen: boolean, results: TypeInterface[], selected: string}>({
    searchTerm: '',
    isOpen: false,
    results: [],
    selected: '',
  });

  const [desc, setDesc] = useState('');
  const [model, setModel] = useState('');
  const [unitCost, setUnitCost] = useState(0);
  const [materialCode, setMaterialCode] = useState('');
  const [itemCode, setItemCode] = useState('');
  const [materialCon, setMaterialCon] = useState('');
  const [uom, setUOM] = useState('');
  const [endWarranty, setEndWarranty] = useState('')
  const [dateEntry, setDateEntry] = useState('');

  const clearData = () => {
    setCategoryPopOver({searchTerm: '',
      isOpen: false,
      results: [],
      selected: ''})
    setTypePopOver({searchTerm: '',
        isOpen: false,
        results: [],
        selected: ''})
    setDesc('');
    setModel('');
    setEndWarranty('');
    setUnitCost(0);
    setMaterialCode('');
    setItemCode('');
    setMaterialCon('n');
    setUOM('');
    setDateEntry('');
  }

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

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${getVersion()}/material`, {
        description: desc,
        brand_model: model,
        end_warranty: new Date(endWarranty),
        cost: unitCost,
        category: categoryPopOver.selected,
        material_code: materialCode,
        item_code: itemCode,
        material_required_yn: materialCon,
        type: typePopOver.selected,
        unit_of_measure: uom,
        date_entry: new Date(dateEntry),
      });

      if (response.status >= 200 && response.status < 300) {
        toast.success(response.data?.message || 'Successfully created material');
        addMaterial({
          id: response.data?.material.id || 1,
          item_description: desc,
          brand_model: model,
          end_warranty: new Date(endWarranty),
          unit_cost: unitCost,
          category: categoryPopOver.selected,
          material_code: materialCode,
          item_code: itemCode,
          material_con: materialCon,
          material_type: typePopOver.selected,
          uom,
          date_entry: new Date(dateEntry),
          active_status: getActiveStatus(response.data?.material),
        })
        clearData();
        onClose();
      }
    }  catch (err) {
      if (axios.isAxiosError(err)) {
          toast.error(err.response?.data?.message || 'Something went wrong');
        } else {
          toast.error('Something went wrong')
      }
    }
  }

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

          const response = await axios.get(`${getVersion()}/material-category/search?category=${term}`, {
            cancelToken: source.token,
            timeout: 5000,
          });
          setCategoryPopOver((prevState) => ({
            ...prevState,
            results: response.data.material_categories, // Assuming 'response.data' is an array of CategoryType
          }));
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log('Request canceled:', error.message);
          } else {
            console.error('Error fetching search results:', error);
          }
        }
      } else {
        setCategoryPopOver((prevState) => ({
          ...prevState,
          results: [], // Clear results if no search term
        }));
      }
    }, 500), // Adjust debounce delay as needed (500ms)
    []
  );

  const fetchDataType = useCallback(
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

          const response = await axios.get(`${getVersion()}/material-type/search?type=${term}`, {
            cancelToken: source.token,
            timeout: 5000,
          });
          setTypePopOver((prevState) => ({
            ...prevState,
            results: response.data.materialTypes, // Assuming 'response.data' is an array of CategoryType
          }));
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log('Request canceled:', error.message);
          } else {
            console.error('Error fetching search results:', error);
          }
        }
      } else {
        setTypePopOver((prevState) => ({
          ...prevState,
          results: [], // Clear results if no search term
        }));
      }
    }, 500), // Adjust debounce delay as needed (500ms)
    []
  );

  useEffect(() => {
    if (categoryPopOver.searchTerm) {
      fetchData(categoryPopOver.searchTerm);
    }
  }, [categoryPopOver.searchTerm, fetchData]);

  useEffect(() => {
    if (typePopOver.searchTerm) {
      fetchDataType(typePopOver.searchTerm);
    }
  }, [typePopOver.searchTerm, fetchDataType]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="flex flex-col w-2/5 2xl:w-1/3 bg-slate-50 rounded-2xl p-6">
        <div className="flex items-center justify-between w-full border-b-2 border-black">
          <h1 className="font-extrabold text-xl">Add Material</h1>
          <Button
            className="text-black bg-transparent hover:bg-transparent p-0"
            onClick={() => {
              clearData();
              onClose();
            }}
          >
            <X size={30} />
          </Button>
        </div>
        <div className="flex flex-col justify-start mt-5 space-y-2">
          <div className="space-y-1">
            <p className="text-sm text-[#697386]">
              Item Description <span className=" text-red-500">*</span>
            </p>
            <Input value={desc} onChange={(e) => setDesc(e.target.value)} className="focus:border-none border-black"></Input>
          </div>
          <div className="flex flex-row w-full space-x-2">
            <div className="space-y-1 w-1/2">
              <p className="text-sm text-[#697386]">
                Brand Model <span className=" text-red-500">*</span>
              </p>
              <Input value={model} onChange={(e) => setModel(e.target.value)} className="focus:border-none border-black"></Input>
            </div>
            <div className="space-y-1 w-1/2">
              <p className="text-sm text-[#697386]">
                End Warranty <span className=" text-red-500">*</span>
              </p>
              <Input value={endWarranty} type="Date" onChange={(e) => setEndWarranty(e.target.value)} className="focus:border-none border-black"></Input>
            </div>
          </div>
          <div className="flex flex-row w-full space-x-2">
            <div className="space-y-1 w-1/2">
              <p className="text-sm text-[#697386]">
                Unit Cost <span className=" text-red-500">*</span>
              </p>
              <Input
                value={unitCost}
                onChange={(e) => setUnitCost(parseInt(e.target.value))}
                className="focus:border-none border-black"
                type="number"
              ></Input>
            </div>
            <div className="space-y-1 w-1/2">
              <p className="text-sm text-[#697386]">
                Category <span className=" text-red-500">*</span>{" "}
              </p>
              <Popover open={categoryPopOver.isOpen} onOpenChange={(isOpen) => setCategoryPopOver((prevState) => ({ ...prevState, isOpen }))}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={categoryPopOver.isOpen}
                    className="w-full justify-between border-black"
                  >
                    {categoryPopOver.selected || "Select Category"}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search Category"
                      value={categoryPopOver.searchTerm}
                      onValueChange={(searchTerm) => setCategoryPopOver((prevState) => ({ ...prevState, searchTerm }))}
                    />
                    <CommandList>
                      <CommandEmpty>No category found.</CommandEmpty>
                      {categoryPopOver.results.length > 0 && (
                        <CommandGroup>
                          {categoryPopOver.results.map((category) => (
                            <CommandItem
                              key={category.id}
                              value={category.description}
                              onSelect={(selected) => setCategoryPopOver((prevState) => ({ ...prevState, isOpen: false, selected: prevState.selected === selected ? "" : selected }))}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  categoryPopOver.selected === category.description
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {category.description}
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
          <div className="flex flex-row w-full space-x-2">
            <div className="space-y-1 w-full">
              <p className="text-sm text-[#697386]">
                Material Code <span className=" text-red-500">*</span>
              </p>
              <Input
                value={materialCode}
                onChange={(e) => setMaterialCode(e.target.value)}
                className="focus:border-none border-black"
              ></Input>
            </div>
            <div className="space-y-1 w-full">
              <p className="text-sm text-[#697386]">
                Item Code <span className=" text-red-500">*</span>
              </p>
              <Input value={itemCode} onChange={(e) => setItemCode(e.target.value)} className="focus:border-none border-black"></Input>
            </div>
          </div>
          <div className="flex flex-row w-full space-x-2">
            <div className="space-y-1 w-full">
              <p className="text-sm text-[#697386]">
                Material Con <span className=" text-red-500">*</span>
              </p>
              <Select onValueChange={(value) => setMaterialCon(value)}>
                <SelectTrigger className="border-black focus:border-none">
                  <SelectValue placeholder="Select Material Con" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="y">Required</SelectItem>
                    <SelectItem value="n">N/A</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1 w-full">
              <p className="text-sm text-[#697386]">
                Material Type <span className=" text-red-500">*</span>
              </p>
              <Popover open={typePopOver.isOpen} onOpenChange={(isOpen) => setTypePopOver((prevState) => ({ ...prevState, isOpen }))}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={typePopOver.isOpen}
                    className="w-full justify-between border-black"
                  >
                    {typePopOver.selected || "Select Type"}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search Type"
                      value={typePopOver.searchTerm}
                      onValueChange={(searchTerm) => setTypePopOver((prevState) => ({ ...prevState, searchTerm }))}
                    />
                    <CommandList>
                      <CommandEmpty>No type found.</CommandEmpty>
                      {typePopOver.results.length > 0 && (
                        <CommandGroup>
                          {typePopOver.results.map((type) => (
                            <CommandItem
                              key={type.id}
                              value={type.description}
                              onSelect={(selected) => setTypePopOver((prevState) => ({ ...prevState, isOpen: false, selected: prevState.selected === selected ? "" : selected }))}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  typePopOver.selected === type.description
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {type.description}
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
          <div className="flex flex-row w-full space-x-2">
            <div className="space-y-1 w-full">
              <p className="text-sm text-[#697386]">
                UOM Type <span className=" text-red-500">*</span>
              </p>
              <Input value={uom} onChange={(e) => setUOM(e.target.value)} className="focus:border-none border-black"></Input>
            </div>
            <div className="space-y-1 w-full">
              <p className="text-sm text-[#697386]">
                Date Entry <span className=" text-red-500">*</span>
              </p>
              <Input
                value={dateEntry}
                onChange={(e) => setDateEntry(e.target.value)}
                type="Date"
                className="focus:border-none border-black"
              ></Input>
            </div>
          </div>
        </div>
        <div className="space-x-2 mt-5 flex justify-end">
          <Button
            className="bg-hoverCream text-fontHeading font-semibold hover:text-white"
            onClick={() => {
              clearData();
              onClose();
            }}
          >
            <span>Cancel</span>
          </Button>
          <Button onClick={(e) => handleSave(e)} className="bg-hoverCream text-fontHeading font-semibold hover:text-white">
            <span>Save</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddMaterialModal;
