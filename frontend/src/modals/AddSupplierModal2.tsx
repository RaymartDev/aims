import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { X } from "lucide-react";

interface AddSupplierModal2Props {
    open: boolean;
    onClose: () => void;
    onBack: () => void;
}

function AddSupplierModal2 ({ open, onClose, onBack }: AddSupplierModal2Props) {
    if (!open) return null;

    return(
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4">
            <div className="flex flex-col w-1/3 bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between w-full border-b-2 border-black">
                    <h1 className="font-extrabold text-xl">Supplier Contact Details</h1>
                    <Button className="text-black bg-transparent hover:bg-transparent p-0" onClick={onClose}><X size={30}/></Button>
                </div>
                <div className="flex flex-col justify-start mt-5 space-y-2">
                    <div className="space-y-1">
                        <p className="text-sm text-[#697386]">Contact Person</p>
                        <Input className="focus:border-none border-black"></Input>
                    </div>
                    <div className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-2/3">
                            <p className="text-sm text-[#697386]">Email Address</p>
                            <Input className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-1/3">
                            <p className="text-sm text-[#697386]">Mobile Number</p>
                            <Input className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                    <div  className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Business Telephone</p>
                            <Input className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Telefax Number</p>
                            <Input className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                    <div  className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">City/Town</p>
                            <Input className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Province</p>
                            <Input className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                    <div  className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-1/4">
                            <p className="text-sm text-[#697386]">Zip Code</p>
                            <Input className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-3/4">
                            <p className="text-sm text-[#697386]">Remarks</p>
                            <Input className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                </div>
                <div className="space-x-2 mt-5 flex justify-end">
                    <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white" onClick={onBack}><span>Back</span></Button>
                    <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white"><span>Save</span></Button>
                </div>
            </div>
        </div>
    );
}

export default AddSupplierModal2