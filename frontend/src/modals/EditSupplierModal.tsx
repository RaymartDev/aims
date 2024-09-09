import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { X } from "lucide-react";
import { Textarea } from "@/Components/ui/textarea";
interface EditSupplierModalProps {
    onClose: () => void;
    onNext: () => void;
    getEditDataByKey: (key: string) => string;
    handleEditDetailChange: (target: string, value: string) => void;
    clearEditData: () => void;
}

function EditSupplierModal ({ onClose, onNext, getEditDataByKey, handleEditDetailChange, clearEditData  }: EditSupplierModalProps) {

    return(
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4">
            <div className="flex flex-col w-2/5 2xl:w-1/3 bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between w-full border-b-2 border-black">
                    <h1 className="font-extrabold text-xl">Edit Supplier Company Details</h1>
                    <Button className="text-black bg-transparent hover:bg-transparent p-0" onClick={() => {
                        onClose();
                        clearEditData();
                    }}><X size={30}/></Button>
                </div>
                <div className="flex flex-col justify-start mt-5 space-y-2">
                    <div className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-1/3">
                            <p className="text-sm text-[#697386]">Supplier Code</p>
                            <Input value={getEditDataByKey('supplierCode')} onChange={(e) => handleEditDetailChange('supplierCode', e.target.value)} className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-2/3">
                            <p className="text-sm text-[#697386]">Company Name</p>
                            <Input value={getEditDataByKey('companyName')} onChange={(e) => handleEditDetailChange('companyName', e.target.value)} className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-[#697386]">Address</p>
                        <Textarea value={getEditDataByKey('address')} onChange={(e) => handleEditDetailChange('address', e.target.value)} className="focus:border-none border-black"></Textarea>
                    </div>
                    <div className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Contract Term</p>
                            <Input value={getEditDataByKey('contractTerm')} onChange={(e) => handleEditDetailChange('contractTerm', e.target.value)} className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Tin Number</p>
                            <Input value={getEditDataByKey('tinNumber')} onChange={(e) => handleEditDetailChange('tinNumber', e.target.value)} className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                </div>
                <div className="space-x-2 mt-5 flex justify-end">
                    <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white" onClick={() => {
                        onClose();
                        clearEditData();
                    }}><span>Cancel</span></Button>
                    <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white" onClick={onNext}><span>Next</span></Button>
                </div>
            </div>
        </div>
    );
}

export default EditSupplierModal