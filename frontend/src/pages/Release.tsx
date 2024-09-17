import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useState } from "react";
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
import { Plus, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type MaterialType from "@/interface/material"
import { toast } from "react-toastify";


function DeliveryReceipt() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("employee");
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<MaterialType[]>([]);

  const handleItemSelect = (material: MaterialType) => {
    if (selectedItems.length < 11) {
      setSelectedItems((prevItems) => [...prevItems, material]);
      setOpenModal(false);
    } else {
      toast.error("You can only add up to 11 items.");
    }
  };

  const handleItemDelete = (index: number) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((_, i) => i !== index)
    );
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
                onValueChange={(value) => setSelectedOption(value)}
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
            <div className="flex flex-col justify-end space-y-2 w-1/2">
                <Label htmlFor="firstField">
                  {selectedOption === "employee"
                    ? "Employee Number"
                    : "Cost Center Number"}{" "}
                  <span className=" text-red-500">*</span>
                </Label>
                <Input className="focus:border-none w-full" />
              </div>
              <div className="flex flex-col justify-end space-y-2 w-1/2">
                <p className="text-sm">
                  Requestor Name <span className=" text-red-500">*</span>
                </p>
                <Input className="focus:border-none w-full" />
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
          onClick={() => navigate("/download")}>
            Print
          </Button>
        </div>
      </div>

      <SelectItemModal open={openModal} onClose={() => setOpenModal(false)} onItemSelect={handleItemSelect}/>
    </>
  );
}

export default DeliveryReceipt;
