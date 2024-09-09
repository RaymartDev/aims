import React from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
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
import { cn } from "@/lib/utils";

interface AssetEntryModalProps {
  open: boolean;
  onClose: () => void;
}

const categories = [
  { value: "cpu", label: "CPU" },
  { value: "laptop", label: "Laptop" },
  { value: "ac_adapter", label: "AC Adapter" },
  { value: "printer", label: "Printer" },
  { value: "pos_terminal", label: "POS Terminal" },
  { value: "cash_drawer", label: "Cash Drawer" },
  { value: "monitor", label: "Monitor" },
  { value: "keyboard", label: "Keyboard" },
  { value: "mouse", label: "Mouse" },
  { value: "power_cord", label: "Power Cord" },
  { value: "router", label: "Router" },
  { value: "camera", label: "Camera" },
  { value: "ssd_hdd", label: "SSD/HDD" },
  { value: "enclosure", label: "Enclosure" },
  { value: "fuse_box", label: "Fuse Box" },
  { value: "antenna", label: "Antenna" },
  { value: "avr_dvr", label: "AVR/DVR" },
  { value: "cable", label: "Cable" },
  { value: "battery", label: "Battery" },
  { value: "cartridge", label: "Cartridge" },
  { value: "motherboard", label: "Motherboard" },
  { value: "touch_panel", label: "Touch Panel" },
  { value: "projector", label: "Projector" },
];

function AssetEntryModal({ open, onClose }: AssetEntryModalProps) {
  const [openPopover, setOpenPopover] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");

  const handleSelect = (currentValue: string) => {
    setSelectedCategory(currentValue === selectedCategory ? "" : currentValue);
    setOpenPopover(false);
  };

  const filteredCategories = categories
    .filter((category) =>
      category.label.toLowerCase().includes(inputValue.toLowerCase())
    )
    .slice(0, 3);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4">
      <div className="flex flex-col w-1/2 bg-slate-50 rounded-2xl p-6">
        <div className="flex items-center justify-between w-full border-b-2 border-black">
          <h1 className="font-extrabold text-xl">Asset Entry</h1>
          <Button
            className="text-black bg-transparent hover:bg-transparent p-0"
            onClick={onClose}
          >
            <X size={30} />
          </Button>
        </div>
        <div className="flex flex-row mt-5 space-x-5 w-full">
          <div className="flex flex-col w-1/2 space-y-2">
            <div className="space-y-1 w-full">
              <p className="text-sm text-[#697386]">
                Brand Model <span className=" text-red-500">*</span>
              </p>
              <Input className="focus:border-none border-black"></Input>
            </div>
            <div className="space-y-1 w-full">
              <p className="text-sm text-[#697386]">
                Serial Number <span className=" text-red-500">*</span>
              </p>
              <Input className="focus:border-none border-black"></Input>
            </div>
            <div className="space-y-1 w-full">
              <p className="text-sm text-[#697386]">
                Unit <span className=" text-red-500">*</span>
              </p>
              <Input className="focus:border-none border-black"></Input>
            </div>
            <div className="space-y-1 w-full">
              <p className="text-sm text-[#697386]">
                Remarks <span className=" text-red-500">*</span>
              </p>
              <Input className="focus:border-none border-black"></Input>
            </div>
          </div>
          <div className="flex flex-col w-1/2 h-full space-y-2">
            <div className="space-y-1 w-full">
              <p className="text-sm text-[#697386]">
                Category <span className=" text-red-500">*</span>
              </p>
              <Popover open={openPopover} onOpenChange={setOpenPopover}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openPopover}
                    className="w-full justify-between border-black"
                  >
                    {selectedCategory
                      ? categories.find(
                          (category) => category.value === selectedCategory
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
                          {filteredCategories.map((category) => (
                            <CommandItem
                              key={category.value}
                              value={category.value}
                              onSelect={() => handleSelect(category.value)}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedCategory === category.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {category.label}
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
              <p className="text-sm text-[#697386]">
                Add Description <span className=" text-red-500">*</span>
              </p>
              <Textarea className="focus:border-none border-black min-h-40 max-h-40"></Textarea>
            </div>
            <div className="space-x-2 flex justify-end pt-2">
              <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white">
                Add Quantity
              </Button>
              <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white">
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssetEntryModal;
