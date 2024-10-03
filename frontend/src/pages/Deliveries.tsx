/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react-hooks/exhaustive-deps */
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
import { cn, getVersion, fetchData as myFetch } from "@/lib/utils";
import axios, { CancelTokenSource } from "axios";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import type MaterialType from "@/interface/material"
import type DeliveryType from "@/interface/delivery";
import { useAppDispatch } from "@/store/store";
import { logout } from "@/slices/userSlice";
import type EmployeeType from "@/interface/employee"
import type StoreType from "@/interface/store"
import { toast } from "react-toastify";

function Deliveries() {
  const [openModal, setOpenModal] = useState(false);
  const [openNextModal, setOpenNextModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deliveries, setDeliveries] = useState<DeliveryType[]>([]);
  const [maxPage, setMaxPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();

  const [employeePopOver, setEmployeePopOver] = useState<{searchTerm: string, isOpen: boolean, results: EmployeeType[], selected: string, selected_detail: {
    id: number;
    name: string;
    company: string;
  }}>({
    searchTerm: '',
    isOpen: false,
    results: [],
    selected: '',
    selected_detail: {
      id: 0,
      name: '',
      company: '',
    }
  });

  const [storePopOver, setStorePopOver] = useState<{searchTerm: string, isOpen: boolean, results: StoreType[], selected: string, selected_detail: {
    id: number;
    name: string;
    company: string;
  }}>({
    searchTerm: '',
    isOpen: false,
    results: [],
    selected: '',
    selected_detail: {
      id: 0,
      name: '',
      company: '',
    }
  });

  interface DeliveriesMisc { 
    page: number;
    limit: number;
    maxPage: number;
  }
  interface DeliveryResponse {
    deliveries: DeliveryType[];
    message: string;
    misc: DeliveriesMisc;
  }

  const itemsPerPage = 17;

  const loadDeliveries = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    myFetch({
      url: `${getVersion()}/delivery/list`,
      query: { limit: itemsPerPage, page: currentPage },
      onSuccess: (data: DeliveryResponse) => {
        setDeliveries(data.deliveries);
        setMaxPage(data.misc.maxPage);
      },
      dispatch,
      logout: () => dispatch(logout())
    });
  }, [itemsPerPage, currentPage, dispatch]);

  useEffect(() => {
    loadDeliveries();
  }, [loadDeliveries]);

  const addDelivery = (delivery: DeliveryType | null) => {
    if (delivery) {
        setDeliveries(prevDeliveries => [...prevDeliveries, delivery]);
    }
  };

  const [delivery, setDelivery] = useState({
    remarks: '',
    quantity: 1,
    delivery_receipt_number: '', // delivery_receipt_number
    product_order_number: '', // product_order_number
    purchase_request_number: '', // purchase_request_number
    capex_number: '' // capex 
  });

  // Handle changes in any input
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (name: any, value: any) => {
    setDelivery(prevState => ({
      ...prevState,
      [name]: value, // Update the property based on the input's name
    }));
  };

  const [selectedOption, setSelectedOption] = useState("employee");

  const handleDelivery = async () => {
    if (!selectedMaterial) return;

    try {
      const response = await axios.post(`${getVersion()}/delivery`, {
        ...delivery,
        material_id: selectedMaterial?.id,
        supplier_id: supplierPopOver.selected_id,
        user_type: 'employee',
        requestor_id: selectedOption === 'employee' ? employeePopOver.selected_detail.id : storePopOver.selected_detail.id,
      });
      if (response.status >= 200 && response.status < 300) {
        addDelivery({
          id: response.data?.delivery?.id,
          description: selectedMaterial.item_description,
          serial_number: selectedMaterial.serial_number,
          asset_number: selectedMaterial.asset_number,
          quantity: delivery.quantity,
          unit: selectedMaterial.uom,
          remarks: delivery.remarks,
          delivery_receipt_number: delivery.delivery_receipt_number,
          product_order_number: delivery.product_order_number,
          purchase_request_number: delivery.purchase_request_number,
          capex_number: delivery.capex_number,
        });
        toast.success(response.data?.message || 'Successfully created delivery!.');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
          toast.error(err.response?.data?.message || 'Something went wrong');
        } else {
          toast.error('Something went wrong');
      }
    }
  }

  const [supplierPopOver, setSupplierPopOver] = useState<{searchTerm: string, isOpen: boolean, results: SupplierType[], selected: string, selected_id: number}>({
    searchTerm: '',
    isOpen: false,
    results: [],
    selected: '',
    selected_id: 0,
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

  const handleNext = () => {
    if (!selectedMaterial) {
      toast.error('Please select a product');
      return;
    }
    setOpenModal(false);
    setOpenNextModal(true);
  }

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
              onClick={() => {
                if (!supplierPopOver.selected || !delivery.delivery_receipt_number || !delivery.product_order_number || !delivery.purchase_request_number || !delivery.capex_number) {
                  toast.error('Please complete required details for delivery');
                  return;
                }
                setOpenModal(true);
              }}
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
                              onSelect={(selected) => setSupplierPopOver((prevState) => ({ ...prevState, isOpen: false, selected: prevState.selected === selected ? "" : selected, selected_id: prevState.selected === selected ? 0 : supplier.id }))}
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
              <Input id="DR" value={delivery.delivery_receipt_number} onChange={(e) => handleChange('delivery_receipt_number', e.target.value)} className=" focus:border-none" required />
            </div>
            <div>
              <Label htmlFor="PO">
                Product Order No. <span className=" text-red-500">*</span>
              </Label>
              <Input
                id="PO"
                type="text"
                className=" focus:border-none"
                value={delivery.product_order_number}
                onChange={(e) => handleChange('product_order_number', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="PR">
                Purchase Request No. <span className=" text-red-500">*</span>
              </Label>
              <Input
                id="PR"
                type="text"
                value={delivery.purchase_request_number}
                onChange={(e) => handleChange('purchase_request_number', e.target.value)}
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
                type="text"
                value={delivery.capex_number}
                onChange={(e) => handleChange('capex_number', e.target.value)}
                className=" focus:border-none"
                required
              />
            </div>
          </div>
          <div className="mt-4 space-y-2 flex flex-col h-full relative">
            <div className="border-2 rounded-lg flex p-2 items-center space-x-3 ">
              <div className="relative w-1/3">
                <Input
                  type="search"
                  placeholder="Search Delivery Number / Product Description"
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
                  {deliveries.map((delivery) => (
                    <TableRow className="h-8" key={delivery.id}>
                      <TableCell>{delivery.id}</TableCell>
                      <TableCell>{delivery.description}</TableCell>
                      <TableCell>{delivery.serial_number}</TableCell>
                      <TableCell>{delivery.asset_number}</TableCell>
                      <TableCell>{delivery.quantity}</TableCell>
                      <TableCell>{delivery.unit}</TableCell>
                      <TableCell>{delivery.remarks}</TableCell>
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
                      onClick={() => setCurrentPage(currentPage - 1)}
                    />
                  </PaginationItem>
                )}
                {Array.from({ length: maxPage }, (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      onClick={() => setCurrentPage(index + 1)}
                      className={currentPage === index + 1 ? "bg-gray-200" : ""}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {currentPage < maxPage && (
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() => setCurrentPage(currentPage + 1)}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
      {openModal && <SelectMaterialModal
        open={openModal}
        onClose={() => {
          setSelectedMaterial(null);
          setOpenModal(false);
        }}
        onNext={handleNext}
        selectMaterial={setSelectedMaterial} 
        selectedMaterial={selectedMaterial}
      />}
      {openNextModal && <AssignToModal
        open={openNextModal}
        onClose={() => {
          setOpenNextModal(false);
          setEmployeePopOver({
            searchTerm: '',
            isOpen: false,
            results: [],
            selected: '',
            selected_detail: {
              id: 0,
              name: '',
              company: '',
            }
          });
          setStorePopOver({
            searchTerm: '',
            isOpen: false,
            results: [],
            selected: '',
            selected_detail: {
              id: 0,
              name: '',
              company: '',
            }
          });
          setSelectedMaterial(null);
        }}
        material={selectedMaterial}
        onBack={() => {
          handleBack();
          setEmployeePopOver({
            searchTerm: '',
            isOpen: false,
            results: [],
            selected: '',
            selected_detail: {
              id: 0,
              name: '',
              company: '',
            }
          });
          setStorePopOver({
            searchTerm: '',
            isOpen: false,
            results: [],
            selected: '',
            selected_detail: {
              id: 0,
              name: '',
              company: '',
            }
          });
          setSelectedMaterial(null);
        }}
        employeePopOver={employeePopOver}
        setEmployeePopOver={setEmployeePopOver}
        storePopOver={storePopOver}
        setStorePopOver={setStorePopOver}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        delivery={delivery}
        setDelivery={setDelivery}
        handleDelivery={handleDelivery}
      />}
    </>
  );
}

export default Deliveries;
