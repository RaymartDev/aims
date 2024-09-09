import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { X } from "lucide-react";
import { Textarea } from "@/Components/ui/textarea";

interface AddSupplierModalProps {
    onClose: () => void;
    onNext: () => void;
    handleAddDetailChange: (target: string, value: string) => void;
    getAddDataByKey: (key: string) => string;
}

function AddSupplierModal ({ onClose, onNext, handleAddDetailChange, getAddDataByKey  }: AddSupplierModalProps) {

    return(
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4">
            <div className="flex flex-col w-2/5 2xl:w-1/3 bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between w-full border-b-2 border-black">
                    <h1 className="font-extrabold text-xl">Supplier Company Details</h1>
                    <Button className="text-black bg-transparent hover:bg-transparent p-0" onClick={onClose}><X size={30}/></Button>
                </div>
                <div className="flex flex-col justify-start mt-5 space-y-2">
                    <div className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-1/3">
                            <p className="text-sm text-[#697386]">Supplier Code</p>
                            <Input value={getAddDataByKey('supplierCode')} onChange={(e) => handleAddDetailChange('supplierCode', e.target.value)} className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-2/3">
                            <p className="text-sm text-[#697386]">Company Name</p>
                            <Input value={getAddDataByKey('companyName')} onChange={(e) => handleAddDetailChange('companyName', e.target.value)} className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-[#697386]">Address</p>
                        <Textarea value={getAddDataByKey('address')} onChange={(e) => handleAddDetailChange('address', e.target.value)} className="focus:border-none border-black"></Textarea>
                    </div>
                    <div className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Contract Term</p>
                            <Input value={getAddDataByKey('contractTerm')} onChange={(e) => handleAddDetailChange('contractTerm', e.target.value)} className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Tin Number</p>
                            <Input value={getAddDataByKey('tinNumber')} onChange={(e) => handleAddDetailChange('tinNumber', e.target.value)} className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                </div>
                <div className="space-x-2 mt-5 flex justify-end">
                    <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white" onClick={() => {
                        onClose();
                        handleAddDetailChange('supplierCode', '');
                        handleAddDetailChange('companyName', '');
                        handleAddDetailChange('address', '');
                        handleAddDetailChange('contractTerm', '');
                        handleAddDetailChange('handleAddDetailChange', '');
                    }}><span>Cancel</span></Button>
                    <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white" onClick={onNext}><span>Next</span></Button>
                </div>
            </div>
        </div>
    );
}

export default AddSupplierModal