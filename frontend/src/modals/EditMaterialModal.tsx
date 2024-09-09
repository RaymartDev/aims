import React from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
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

interface EditMaterialModalProps {
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
    { value: "projector", label: "Projector" }
    ];

function EditMaterialModal ({ open, onClose }: EditMaterialModalProps) {
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

    return(
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
            <div className="flex flex-col w-2/5 2xl:w-1/3 bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between w-full border-b-2 border-black">
                    <h1 className="font-extrabold text-xl">Edit Material</h1>
                    <Button className="text-black bg-transparent hover:bg-transparent p-0" onClick={onClose}><X size={30} /></Button>
                </div>
                <div className="flex flex-col justify-start mt-5 space-y-2">
                    <div className="space-y-1">
                        <p className="text-sm text-[#697386]">Item Description</p>
                        <Input className="focus:border-none border-black"></Input>
                    </div>
                    <div className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Brand Model</p>
                            <Input className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                    <div className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-1/2">
                            <p className="text-sm text-[#697386]">Unit Cost</p>
                            <Input className="focus:border-none border-black" type="number"></Input>
                        </div>
                        <div className="space-y-1 w-1/2">
                            <p className="text-sm text-[#697386]">Category</p>
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
                    </div>
                    <div className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Material Code</p>
                            <Input className="focus:border-none border-black" type="number"></Input>
                        </div>
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Item Code</p>
                            <Input className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                    <div className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Material Con</p>
                            <Select>
                                <SelectTrigger className="border-black focus:border-none">
                                    <SelectValue placeholder="Select Material Con"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="req">Required</SelectItem>
                                        <SelectItem value="n/a">N/A</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Material Type</p>
                            <Select>
                                <SelectTrigger className="border-black focus:border-none">
                                    <SelectValue placeholder="Select Type"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="ou">Original Unit</SelectItem>
                                        <SelectItem value="billing">Billing</SelectItem>
                                        <SelectItem value="du">Demo Unit</SelectItem>
                                        <SelectItem value="su">Service Unit</SelectItem>
                                        <SelectItem value="fl">For Loading</SelectItem>
                                        <SelectItem value="fr">For Repair</SelectItem>
                                        <SelectItem value="rep">Repaired</SelectItem>
                                        <SelectItem value="pu">Pull Out</SelectItem>
                                        <SelectItem value="pt">P. Transfer</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">UOM Type</p>
                            <Input className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                </div>
                <div className="space-x-2 mt-5 flex justify-end">
                    <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white" onClick={onClose}><span>Cancel</span></Button>
                    <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white"><span>Save</span></Button>
                </div>
            </div>
        </div>
    );
}

export default EditMaterialModal