import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { X } from "lucide-react";

interface ShippedModalProps {
    open: boolean;
    onClose: () => void;
}

function ShippedModal({ open, onClose }: ShippedModalProps) {
    if (!open) return null;

    return(
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4">
            <div className="flex flex-col w-1/2 2xl:w-1/4 bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between w-full border-b-2 border-black">
                    <h1 className="font-extrabold text-xl">Shipped By</h1>
                    <Button className="text-black bg-transparent hover:bg-transparent p-0" onClick={onClose}><X size={30}/></Button>
                </div>
                <div className="flex flex-col justify-start mt-5 space-y-2">
                    <div className="space-x-2 flex">
                        <div className="space-y-1 w-3/5">
                            <h1>DR Number</h1>
                            <Input disabled></Input>
                        </div>
                        <div className="space-y-1 w-2/5">
                            <h1>Shipped Date</h1>
                            <Input type="date"></Input>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <h1>Employee Number</h1>
                        <Input></Input>
                    </div>
                    <div className="space-y-1">
                        <h1>Name</h1>
                        <Input></Input>
                    </div>
                    <div className="space-y-1">
                        <h1>Cost Number</h1>
                        <Input disabled></Input>
                    </div>
                    <div className="space-y-1">
                        <h1>Department</h1>
                        <Input disabled></Input>
                    </div>
                    <div className="space-y-1">
                        <h1>Company</h1>
                        <Input disabled></Input>
                    </div>
                </div>
                <div className="space-x-2 mt-5 flex justify-end">
                <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white" onClick={onClose}><span>Cancel</span></Button>
                <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white"><span>Update</span></Button>
                </div>
            </div>
        </div>
    );
}

export default ShippedModal