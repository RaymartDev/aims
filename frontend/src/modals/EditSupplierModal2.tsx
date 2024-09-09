/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { X } from "lucide-react";
import type SupplierType from "@/interface/supplier";
import axios from "axios";
import { getVersion } from "@/lib/utils";
import { toast } from "react-toastify";

interface EditSupplierModal2Props {
    onClose: () => void;
    onBack: () => void;
    editSupplier: SupplierType | null;
    getEditDataByKey: (key: string) => string;
    handleEditDetailChange: (target: string, value: string) => void;
    clearEditData: () => void;
    updateSupplier: (id: number, supplier: SupplierType | null) => void;
}

function EditSupplierModal2 ({ onClose, onBack, getEditDataByKey, handleEditDetailChange, editSupplier, clearEditData, updateSupplier }: EditSupplierModal2Props) {

    const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${getVersion()}/supplier/update/${editSupplier?.id || 1}`, {
                supplier_code: getEditDataByKey('supplierCode'),
                company_name: getEditDataByKey('companyName'),
                address: getEditDataByKey('address'),
                contract_term: getEditDataByKey('contractTerm'),
                tin_number: getEditDataByKey('tinNumber'),
                contact_person: getEditDataByKey('contactPerson'),
                business_tel: getEditDataByKey('businessTel'),
                email_address: getEditDataByKey('emailAddress'),
                telefax_number: getEditDataByKey('teleFaxNumber'),
                zip_code: getEditDataByKey('zipCode'),
                mobile_number: getEditDataByKey('mobileNumber'),
                city_town: getEditDataByKey('cityTown'),
                province: getEditDataByKey('province'),
                remarks: getEditDataByKey('remarks')
            });
            if (response.status >= 200 && response.status < 300) { 
                toast.success(response.data?.message || 'Successfully updated supplier');
                onClose();
                updateSupplier(editSupplier?.id || 1, {
                    id: editSupplier?.id || 1,
                    supplier_code: getEditDataByKey('supplierCode'),
                    company_name: getEditDataByKey('companyName'),
                    address: getEditDataByKey('address'),
                    contract_term: getEditDataByKey('contractTerm'),
                    tin_number: getEditDataByKey('tinNumber'),
                    contact_person: getEditDataByKey('contactPerson'),
                    email: getEditDataByKey('email'),
                    mobile_number: getEditDataByKey('mobileNumber'),
                    business_number: getEditDataByKey('businessTel'),
                    teleFax: getEditDataByKey('teleFaxNumber'),
                    cityTown: getEditDataByKey('cityTown'),
                    province: getEditDataByKey('province'),
                    zip: getEditDataByKey('zipCode'),
                    remarks: getEditDataByKey('remarks'),
                })
                clearEditData();
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
                    <h1 className="font-extrabold text-xl">Edit Supplier Contact Details</h1>
                    <Button className="text-black bg-transparent hover:bg-transparent p-0" onClick={onClose}><X size={30}/></Button>
                </div>
                <div className="flex flex-col justify-start mt-5 space-y-2">
                    <div className="space-y-1">
                        <p className="text-sm text-[#697386]">Contact Person</p>
                        <Input value={getEditDataByKey('contactPerson')} onChange={(e) => handleEditDetailChange('contactPerson', e.target.value)} className="focus:border-none border-black"></Input>
                    </div>
                    <div className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-2/3">
                            <p className="text-sm text-[#697386]">Email Address</p>
                            <Input value={getEditDataByKey('emailAddress')} onChange={(e) => handleEditDetailChange('emailAddress', e.target.value)} className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-1/3">
                            <p className="text-sm text-[#697386]">Mobile Number</p>
                            <Input value={getEditDataByKey('mobileNumber')} onChange={(e) => handleEditDetailChange('mobileNumber', e.target.value)} className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                    <div  className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Business Telephone</p>
                            <Input value={getEditDataByKey('businessTel')} onChange={(e) => handleEditDetailChange('businessTel', e.target.value)} className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Telefax Number</p>
                            <Input value={getEditDataByKey('teleFaxNumber')} onChange={(e) => handleEditDetailChange('teleFaxNumber', e.target.value)} className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                    <div  className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">City/Town</p>
                            <Input value={getEditDataByKey('cityTown')} onChange={(e) => handleEditDetailChange('cityTown', e.target.value)} className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Province</p>
                            <Input value={getEditDataByKey('province')} onChange={(e) => handleEditDetailChange('province', e.target.value)} className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                    <div  className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-1/4">
                            <p className="text-sm text-[#697386]">Zip Code</p>
                            <Input value={getEditDataByKey('zipCode')} onChange={(e) => handleEditDetailChange('zipCode', e.target.value)} className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-3/4">
                            <p className="text-sm text-[#697386]">Remarks</p>
                            <Input value={getEditDataByKey('remarks')} onChange={(e) => handleEditDetailChange('remarks', e.target.value)} className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                </div>
                <div className="space-x-2 mt-5 flex justify-end">
                    <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white" onClick={onBack}><span>Back</span></Button>
                    <Button onClick={(e) => handleUpdate(e)} className="bg-hoverCream text-fontHeading font-semibold hover:text-white"><span>Save</span></Button>
                </div>
            </div>
        </div>
    );
}

export default EditSupplierModal2