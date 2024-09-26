import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { X } from "lucide-react";

interface DestinationModalProps {
  open: boolean;
  onClose: () => void;
  onBack: () => void;
}

function AssignToModal({ open, onClose, onBack }: DestinationModalProps) {
  const [selectedOption, setSelectedOption] = useState("employee");

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
          <div className="flex flex-col justify-start mt-5 space-y-2">
            <div>
              <Label htmlFor="firstField">
                {selectedOption === "employee"
                  ? "Employee Number "
                  : "Cost Center Number "}
                <span className=" text-red-500">*</span>
              </Label>
              <Input id="firstField" className="w-80 focus:border-none" />
            </div>
            <div className="flex flex-row w-full space-x-2">
              <div className="space-y-1 w-1/2">
                <Label htmlFor="name">
                  {selectedOption === "employee"
                    ? "Employee Name"
                    : "Store Name"}
                </Label>
                <Input id="name" className="focus:border-none" />
              </div>
              <div className="space-y-1 w-1/2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  disabled
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
