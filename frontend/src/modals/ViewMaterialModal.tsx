/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-types */
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { X } from "lucide-react";
import type MaterialType from "@/interface/material";

interface ViewMaterialModalProps {
    onClose: () => void;
    material: MaterialType | null;
}

function ViewMaterialModal ({ onClose, material }: ViewMaterialModalProps) {

    return(
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
            <div className="flex flex-col w-2/5 2xl:w-1/3 bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between w-full border-b-2 border-black">
                    <h1 className="font-extrabold text-xl">View Material Details</h1>
                    <Button className="text-black bg-transparent hover:bg-transparent p-0" onClick={() => {
                        onClose();
                    }}><X size={30} /></Button>
                </div>
                <div className="flex flex-col justify-start mt-5 space-y-2">
                    <div className="space-y-1">
                        <p className="text-sm text-[#697386]">Item Description</p>
                        <Input value={material?.item_description || ''} readOnly className="focus:border-none border-black"></Input>
                    </div>
                    <div className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Brand Model</p>
                            <Input value={material?.brand_model || ''} readOnly className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                    <div className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-1/2">
                            <p className="text-sm text-[#697386]">Unit Cost</p>
                            <Input value={material?.unit_cost || 0} readOnly className="focus:border-none border-black" type="number"></Input>
                        </div>
                        <div className="space-y-1 w-1/2">
                            <p className="text-sm text-[#697386]">Category</p>
                            <Input value={material?.category || ''} readOnly className="focus:border-none border-black" type="number"></Input>
                        </div>
                    </div>
                    <div className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Material Code</p>
                            <Input value={material?.material_code || ''} readOnly className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Item Code</p>
                            <Input value={material?.item_code || ''} readOnly className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                    <div className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Material Con</p>
                            <Input value={(material?.material_con === 'Y' ? 'Required' : 'N/A') || ''} readOnly className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Material Type</p>
                            <Input value={material?.material_type || ''} readOnly className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                    <div className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">UOM Type</p>
                            <Input value={material?.uom || ''} readOnly className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                </div>
                <div className="space-x-2 mt-5 flex justify-end">
                    <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white" onClick={() => {
                        onClose();
                    }}><span>Cancel</span></Button>
                </div>
            </div>
        </div>
    );
}

export default ViewMaterialModal