import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { X } from "lucide-react";

interface AssetEntryModalProps {
    open: boolean;
    onClose: () => void;
}

function AssetEntryModal({ open, onClose }: AssetEntryModalProps) {
    if (!open) return null;

    return(
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4">
            <div className="flex flex-col w-1/2 bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between w-full border-b-2 border-black">
                    <h1 className="font-extrabold text-xl">Asset Entry</h1>
                    <Button className="text-black bg-transparent hover:bg-transparent p-0" onClick={onClose}><X size={30}/></Button>
                </div>
                <div className="flex flex-row mt-5 space-x-5 w-full">
                    <div className="flex flex-col w-1/2 space-y-2">
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Brand Model</p>
                            <Input className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Serial Number</p>
                            <Input className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Unit</p>
                            <Input className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Remarks</p>
                            <Input className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                    <div className="flex flex-col w-1/2 h-full space-y-2">
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Category</p>
                            <Input className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Add Description</p>
                            <Textarea className="focus:border-none border-black min-h-40 max-h-40"></Textarea>
                        </div>
                        <div className="space-x-2 flex justify-end pt-2">
                            <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white">Add Qty</Button>
                            <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white">Reset</Button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default AssetEntryModal