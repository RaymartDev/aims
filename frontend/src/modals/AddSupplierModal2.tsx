/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { getVersion } from "@/lib/utils";
import axios from "axios";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import type SupplierType from "@/interface/supplier";

interface AddSupplierModal2Props {
    onClose: () => void;
    onBack: () => void;
    getAddDataByKey: (key: string) => string;
    handleAddDetailChange: (target: string, value: string) => void;
    addSupplier: (supplier: SupplierType | null) => void;
    clearAddData: () => void;
}

function AddSupplierModal2 ({ onClose, onBack, handleAddDetailChange, getAddDataByKey, addSupplier, clearAddData }: AddSupplierModal2Props) {

    const handleSave = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${getVersion()}/supplier`, {
                supplier_code: getAddDataByKey('supplierCode'),
                company: getAddDataByKey('companyName'),
                address: getAddDataByKey('address'),
                contract_term: getAddDataByKey('contractTerm'),
                tin_number: getAddDataByKey('tinNumber'),
                contact_person: getAddDataByKey('contactPerson'),
                email_address: getAddDataByKey('emailAddress'),
                mobile_number: getAddDataByKey('mobileNumber'),
                business_tel: getAddDataByKey('businessTel'),
                telefax_number: getAddDataByKey('teleFaxNumber'),
                city_town: getAddDataByKey('cityTown'),
                province: getAddDataByKey('province'),
                zip_code: getAddDataByKey('zipCode'),
                remarks: getAddDataByKey('remarks'),
            });
            if (response.status >= 200 && response.status < 300) {
                toast.success(response.data?.message || 'Successfully added supplier');
                addSupplier({
                    id: response.data.supplier?.id || 1,
                    supplier_code: getAddDataByKey('supplierCode'),
                    company_name: getAddDataByKey('companyName'),
                    address: getAddDataByKey('address'),
                    contract_term: getAddDataByKey('contractTerm'),
                    tin_number: getAddDataByKey('tinNumber'),
                    contact_person: getAddDataByKey('contactPerson'),
                    email: getAddDataByKey('emailAddress'),
                    mobile_number: getAddDataByKey('mobileNumber'),
                    business_number: getAddDataByKey('businessTel'),
                    teleFax: getAddDataByKey('teleFaxNumber'),
                    cityTown: getAddDataByKey('cityTown'),
                    province: getAddDataByKey('province'),
                    zip: getAddDataByKey('zipCode'),
                    remarks: getAddDataByKey('remarks'),
                });
                clearAddData();
                onClose();
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message || 'Something went wrong');
              } else {
                toast.error('Something went wrong')
              }
        }
    }

    return(
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4">
            <div className="flex flex-col w-2/5 2xl:w-1/3 bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between w-full border-b-2 border-black">
                    <h1 className="font-extrabold text-xl">Supplier Contact Details</h1>
                    <Button className="text-black bg-transparent hover:bg-transparent p-0" onClick={onClose}><X size={30}/></Button>
                </div>
                <div className="flex flex-col justify-start mt-5 space-y-2">
                    <div className="space-y-1">
                        <p className="text-sm text-[#697386]">Contact Person</p>
                        <Input value={getAddDataByKey('contactPerson')} onChange={(e) => handleAddDetailChange('contactPerson', e.target.value)} className="focus:border-none border-black"></Input>
                    </div>
                    <div className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-2/3">
                            <p className="text-sm text-[#697386]">Email Address</p>
                            <Input value={getAddDataByKey('emailAddress')} onChange={(e) => handleAddDetailChange('emailAddress', e.target.value)} className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-1/3">
                            <p className="text-sm text-[#697386]">Mobile Number</p>
                            <Input value={getAddDataByKey('mobileNumber')} onChange={(e) => handleAddDetailChange('mobileNumber', e.target.value)} className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                    <div  className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Business Telephone</p>
                            <Input value={getAddDataByKey('businessTel')} onChange={(e) => handleAddDetailChange('businessTel', e.target.value)} className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Telefax Number</p>
                            <Input value={getAddDataByKey('teleFaxNumber')} onChange={(e) => handleAddDetailChange('teleFaxNumber', e.target.value)} className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                    <div  className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">City/Town</p>
                            <Input value={getAddDataByKey('cityTown')} onChange={(e) => handleAddDetailChange('cityTown', e.target.value)} className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Province</p>
                            <Input value={getAddDataByKey('province')} onChange={(e) => handleAddDetailChange('province', e.target.value)} className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                    <div  className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-1/4">
                            <p className="text-sm text-[#697386]">Zip Code</p>
                            <Input value={getAddDataByKey('zipCode')} onChange={(e) => handleAddDetailChange('zipCode', e.target.value)} className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-3/4">
                            <p className="text-sm text-[#697386]">Remarks</p>
                            <Input value={getAddDataByKey('remarks')} onChange={(e) => handleAddDetailChange('remarks', e.target.value)} className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                </div>
                <div className="space-x-2 mt-5 flex justify-end">
                    <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white" onClick={onBack}><span>Back</span></Button>
                    <Button onClick={(e) => handleSave(e)} className="bg-hoverCream text-fontHeading font-semibold hover:text-white"><span>Save</span></Button>
                </div>
            </div>
        </div>
    );
}

export default AddSupplierModal2