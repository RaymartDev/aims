/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
import { toast } from "react-toastify";

interface DetailItem {
  detail_id: number;
  release_number: number;
  desc: string;
  material_id: number;
  quantity: number;
  remarks: string;
  material_code?: string;
  item_code?: string;
  uom?: string;
  serial?: string;
  cost?: number;
}

type ReturnQuantities = {
  [key: number]: number;
};

function AcknowledgementReceipt() {
  const [returnItemList, setReturnItemList] = useState<DetailItem[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [reference, setReference] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tag, setTag] = useState("Original Unit");
  const [remarks, setRemarks] = useState('');
  const [reason, setReason] = useState('');
  const [returnQuantities, setReturnQuantities] = useState<ReturnQuantities>(
    returnItemList.reduce((acc, item) => ({ ...acc, [item.detail_id]: 0 }), {})
  );
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch the maximum release number
    const fetchMaxReleaseNumber = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${getVersion()}/return-receipt/reference`); // API endpoint to fetch the release number
        setReference(response.data.reference); // Set the release number in state
      } catch (err) {
        toast.error('Failed to fetch release number'); // Set error if the API call fails
      } finally {
        setLoading(false);
      }
    };

    fetchMaxReleaseNumber(); // Call the function on component mount
  }, []);

  const handlePrint = () => {
    navigate('/ar/download');
  }

  const headerHeight = 72;

  const handleQuantityChange = (
    id: number,
    value: string,
    maxQuantity: number
  ) => {
    const numericValue = Number(value);
    const newValue = Math.max(0, Math.min(numericValue, maxQuantity));
    setReturnQuantities({ ...returnQuantities, [id]: newValue });
  };

  function deleteItem(detailIdToDelete: number) {
    setReturnItemList(prevList => prevList.filter(item => item.detail_id !== detailIdToDelete));
  }

  function addAllRelease(selectedMaterials: number[]) {
    // Filter itemList based on selected detail_ids in selectedMaterials
    const filteredItems = drPopOver.selectedRelease
      ? drPopOver.selectedRelease.details.filter(item => selectedMaterials.includes(item.detail_id))
      : [];
  
    // Get existing detail_id's in returnItemList to avoid duplicates
    setReturnItemList(prevList => {
      const existingIds = new Set(prevList.map(item => item.detail_id));
      const newItems = filteredItems.filter(item => !existingIds.has(item.detail_id));
      
      // Add only unique items to returnItemList
      return [...prevList, ...newItems];
    });
  }

  const handleSubmit = async () => {
    if (loading) return;

    try {
      const returnObj = {
        release_number: drPopOver.selectedRelease?.release_number || 0,
        return_number: reference,
        tag,
        requestor_id: drPopOver.selectedRelease?.requestor.user_id || 0,
        remarks,
        reason,
      }
      const returnQuantitiesArray = Object.entries(returnQuantities).map(([key, value]) => ({
        material_id: Number(key),
        quantity: value,
      }));

      const response = await axios.post(`${getVersion()}/return-receipt`, {
        return: returnObj,
        return_detail: returnQuantitiesArray,
        assigned_id: drPopOver.selectedRelease?.requestor.user_id || 0,
      });

      if (response.status >= 200 && response.status < 300) {
        toast.success(response.data?.message || 'Successfully created delivery!.');
        setReference((prevReference) => prevReference + 1);
        setDRPopOver({
          searchTerm: '',
          isOpen: false,
          results: [],
          selected: '',
          selectedRelease: null,
        })
        setRemarks('');
        setTag("Original Unit");
        setReason('');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
          toast.error(err.response?.data?.message || 'Something went wrong');
        } else {
          toast.error('Something went wrong');
      }
    }
  }

  const [drPopOver, setDRPopOver] = useState<{searchTerm: string, isOpen: boolean, results: ReleaseType[], selected: string, selectedRelease: ReleaseType | null}>({
    searchTerm: '',
    isOpen: false,
    results: [],
    selected: '',
    selectedRelease: null,
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
        <div className="flex flex-col w-full pt-10">
          <p className="text-lg font-semibold">Reference Number </p>
          <Input
            className="border-none w-full h-16 text-4xl text-red-700"
            disabled
            value={formatReference(reference)}
          />
        </div>
        <div className="flex w-full justify-between gap-8 2xl:gap-20 pt-10">
          <div className="flex flex-row gap-6 w-3/4">
            <div className="flex flex-row w-full space-x-5">
              <div className="w-2/3 space-y-2">
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
                                    onSelect={(selected) => setDRPopOver((prevState) => ({ ...prevState, isOpen: false, selected: prevState.selected === selected ? "" : selected, selectedRelease: prevState.selected === selected ? null : release }))}
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
                    <Select value={tag} onValueChange={setTag}>
                      <SelectTrigger className="focus:border-none">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Original Unit">Original Unit</SelectItem>
                          <SelectItem value="Billing">Billing</SelectItem>
                          <SelectItem value="Return Demo Unit">Return Demo Unit</SelectItem>
                          <SelectItem value="Return Service Unit">Return Service Unit</SelectItem>
                          <SelectItem value="Safekeep">Safekeep</SelectItem>
                          <SelectItem value="For Repair">For Repair</SelectItem>
                          <SelectItem value="Pull Out">Pull Out</SelectItem>
                          <SelectItem value="P. Transfer">P. Transfer</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm">
                    Reason for Transfer <span className=" text-red-500">*</span>
                  </p>
                  <Input value={reason} onChange={(e) => setReason(e.target.value)} className="focus:border-none" />
                </div>
              </div>
              <div className="flex flex-col w-full space-y-2">
                <p className="text-sm">
                  Remarks <span className=" text-red-500">*</span>
                </p>
                <Textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} className="focus:border-none max-h-28 min-h-28" />
              </div>
            </div>
          </div>
          <div className="flex justify-end items-end">
            <Button
              className="bg-hoverCream text-fontHeading border hover:text-white font-semibold w-36"
              onClick={() => {
                if (drPopOver.selected) {
                  setOpenModal(true);
                } else {
                  toast.error('Please select a delivery reference');
                }
              }}
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
              value={drPopOver.selectedRelease?.requestor.name || ''}
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
              value={drPopOver.selectedRelease?.requestor.employee_no || ''}
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
              value={drPopOver.selectedRelease?.requestor.cost_center_code || ''}
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
                <TableHead>Item Code</TableHead>
                <TableHead>Item Description</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Return</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Serial Code</TableHead>
                <TableHead>Remarks</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {returnItemList.length > 0 && returnItemList.map((item) => (
                <TableRow className="h-8" key={item.detail_id}>
                  <TableCell>{item.item_code}</TableCell>
                  <TableCell>{item.desc}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      className="w-16 focus:border-none h-7"
                      value={returnQuantities[item.material_id]}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.material_id,
                          e.target.value,
                          item.quantity
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>{item.uom || ''}</TableCell>
                  <TableCell>{item.serial || ''}</TableCell>
                  <TableCell>{item.remarks}</TableCell>
                  <TableCell>
                    <Button onClick={() => deleteItem(item.detail_id)} className="bg-white text-red-500 hover:text-white">
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
            className="bg-hoverCream text-fontHeading font-semibold hover:text-white w-36" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>

      {openModal && <AddAssetModal addAll={addAllRelease} reference={drPopOver.selectedRelease?.release_number || 0} onClose={() => setOpenModal(false)} itemList={drPopOver.selectedRelease?.details || []} />}
    </>
  );
}

export default AcknowledgementReceipt;
