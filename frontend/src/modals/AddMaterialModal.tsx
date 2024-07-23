import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { X } from "lucide-react";

interface AddMaterialModalProps {
    open: boolean;
    onClose: () => void;
    onNext: () => void;
}

function AddMaterialModal ({ open, onClose, onNext  }: AddMaterialModalProps) {
    if (!open) return null;

    return(
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
            <div className="flex flex-col w-1/3 bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between w-full border-b-2 border-black">
                    <h1 className="font-extrabold text-xl">Add Material</h1>
                    <Button className="text-black bg-transparent hover:bg-transparent p-0" onClick={onClose}><X size={30} /></Button>
                </div>
                <div className="flex flex-col justify-start mt-5 space-y-2">
                    <div className="space-y-1">
                        <p className="text-sm text-[#697386]">Item Description</p>
                        <Input className="focus:border-none border-black"></Input>
                    </div>
                    <div className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-2/3">
                            <p className="text-sm text-[#697386]">Brand Model</p>
                            <Input className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-1/3">
                            <p className="text-sm text-[#697386]">Category</p>
                            <Select>
                                <SelectTrigger className="border-black focus:border-none">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="CPU">CPU</SelectItem>
                                        <SelectItem value="Laptop">Laptop</SelectItem>
                                        <SelectItem value="AC Adapter">AC Adapter</SelectItem>
                                        <SelectItem value="Printer">Printer</SelectItem>
                                        <SelectItem value="POS Terminal">POS Terminal</SelectItem>
                                        <SelectItem value="Cash Drawer">Cash Drawer</SelectItem>
                                        <SelectItem value="Monitor">Monitor</SelectItem>
                                        <SelectItem value="Keyboard">Keyboard</SelectItem>
                                        <SelectItem value="Mouse">Mouse</SelectItem>
                                        <SelectItem value="Power Cord">Power Cord</SelectItem>
                                        <SelectItem value="Router">Router</SelectItem>
                                        <SelectItem value="Camera">Camera</SelectItem>
                                        <SelectItem value="SSD/HDD">SSD/HDD</SelectItem>
                                        <SelectItem value="Enclosure">Enclosure</SelectItem>
                                        <SelectItem value="Fuse Box<">Fuse Box</SelectItem>
                                        <SelectItem value="Antenna">Antenna</SelectItem>
                                        <SelectItem value="AVR/DVR">AVR/DVR</SelectItem>
                                        <SelectItem value="Cable">Cable</SelectItem>
                                        <SelectItem value="Battery">Battery</SelectItem>
                                        <SelectItem value="Carthridge">Carthridge</SelectItem>
                                        <SelectItem value="Motherboard">Motherboard</SelectItem>
                                        <SelectItem value="Touched Panel">Touched Panel</SelectItem>
                                        <SelectItem value="Projector">Projector</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Material Code</p>
                            <Input className="focus:border-none border-black"></Input>
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
                </div>
                <div className="space-x-2 mt-5 flex justify-end">
                    <Button className="bg-hoverCream text-fontHeading hover:text-white" onClick={onClose}><span>Cancel</span></Button>
                    <Button className="bg-hoverCream text-fontHeading hover:text-white" onClick={onNext}><span>Next</span></Button>
                </div>
            </div>
        </div>
    );
}

export default AddMaterialModal