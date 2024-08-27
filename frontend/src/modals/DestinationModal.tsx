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

function DestinationModal({ open, onClose, onBack }: DestinationModalProps) {
    const [selectedOption, setSelectedOption] = useState("employee");

    if (!open) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4 ">
                <div className="flex flex-col w-1/3 bg-slate-50 rounded-2xl p-6">
                    <div className="flex items-center justify-between w-full border-b-2 border-black">
                        <h1 className="font-extrabold text-xl">Assign To</h1>
                        <Button className="text-black bg-transparent hover:bg-transparent p-0" onClick={onClose}>
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
                    {selectedOption === "employee" && (
                        <div className="flex flex-col mt-5 space-y-2">
                            <div className="flex flex-row w-full">
                                <div className="space-y-1 w-1/2">
                                    <Label htmlFor="employeeId">Employee ID</Label>
                                    <Input id="employeeId" className="focus:border-none" />
                                </div>
                            </div>
                            <div className="flex flex-row w-full space-x-2">
                                <div className="space-y-1 w-full">
                                    <Label htmlFor="employeeStoreName">Store Name</Label>
                                    <Input id="employeeStoreName" disabled className="focus:border-none" />
                                </div>
                                <div className="space-y-1 w-full">
                                    <Label htmlFor="employeeCompany">Company</Label>
                                    <Input id="employeeCompany" disabled className="focus:border-none" />
                                </div>
                            </div>
                            <div className="flex flex-row w-full space-x-2">
                                <div className="space-y-1 w-full">
                                    <Label htmlFor="employeeRequestorName">Requestor Name</Label>
                                    <Input id="employeeRequestorName" type="text" className="focus:border-none" />
                                </div>
                                <div className="space-y-1 w-full">
                                    <Label htmlFor="employeeUsername">Username</Label>
                                    <Input id="employeeUsername" type="text" className="focus:border-none" />
                                </div>
                            </div>
                        </div>
                    )}
                    {selectedOption === "store" && (
                        <div className="flex flex-col mt-5 space-y-2">
                            <div className="flex flex-row w-full">
                                <div className="space-y-1 w-1/2">
                                    <Label htmlFor="costCenter">Cost Center</Label>
                                    <Input id="costCenter" className="focus:border-none" />
                                </div>
                            </div>
                            <div className="flex flex-row w-full space-x-2">
                                <div className="space-y-1 w-full">
                                    <Label htmlFor="storeName">Store Name</Label>
                                    <Input id="storeName" disabled className="focus:border-none" />
                                </div>
                                <div className="space-y-1 w-full">
                                    <Label htmlFor="company">Company</Label>
                                    <Input id="company" disabled className="focus:border-none" />
                                </div>
                            </div>
                            <div className="flex flex-row w-full space-x-2">
                                <div className="space-y-1 w-full">
                                    <Label htmlFor="request">Requestor Name</Label>
                                    <Input id="request" type="text" className="focus:border-none" />
                                </div>
                                <div className="space-y-1 w-full">
                                    <Label htmlFor="user">Username</Label>
                                    <Input id="user" type="text" className="focus:border-none" />
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="space-x-2 mt-5 flex justify-end">
                        <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white" onClick={onBack}>
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

export default DestinationModal;

