/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";
import type StoreType from "@/interface/store";
import { toast } from "react-toastify";
import axios from "axios";
import { getVersion } from "@/lib/utils";

interface AddStoreModalProps {
    onClose: () => void;
    addStore: (store: StoreType | null) => void;
}

function AddStoreModal({ onClose, addStore }: AddStoreModalProps) {
    const [companyName, setCompanyName] = useState('');
    const [name, setName] = useState('');
    const [costCode, setCostCode] = useState('');
    const [address, setAddress] = useState('');
    
    const clearData = () => {
        setCompanyName('');
        setName('');
        setCostCode('');
        setAddress('');
    }

    const handleSave = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${getVersion()}/store`, {
                company: companyName,
                name,
                cost_center_code: costCode,
                address: address,
            });
            if (response.status >= 200 && response.status < 300) {
                toast.success(response.data?.message || 'Successfully created store');
                addStore({
                    id: response.data?.store?.id || 1,
                    company_name: companyName,
                    name,
                    cost_center_code: costCode,
                    address,
                    registered_status: false,
                })
            }
            onClose();
            clearData();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message || 'Something went wrong');
              } else {
                toast.error('Something went wrong')
              }
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
            <div className="flex flex-col w-2/5 2xl:w-1/3 bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between w-full border-b-2 border-black">
                    <h1 className="font-extrabold text-xl">Add Store</h1>
                    <Button className="text-black bg-transparent hover:bg-transparent p-0" onClick={() => {
                        onClose();
                        clearData();
                    }}><X size={30} /></Button>
                </div>
                <div className="flex flex-col justify-start mt-5 space-y-2">
                    <div className="space-y-1">
                        <p className="text-sm text-[#697386]">Company</p>
                        <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="focus:border-none border-black"></Input>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-[#697386]">Store Name</p>
                        <Input value={name} onChange={(e) => setName(e.target.value)} className="focus:border-none border-black"></Input>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-[#697386]">Cost Center Code</p>
                        <Input value={costCode} onChange={(e) => setCostCode(e.target.value)} className="focus:border-none border-black"></Input>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-[#697386]">Address</p>
                        <Input value={address} onChange={(e) => setAddress(e.target.value)} className="focus:border-none border-black"></Input>
                    </div>
                </div>
                <div className="space-x-2 mt-5 flex justify-end">
                    <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white" onClick={() => {
                        onClose();
                        clearData();
                    }}><span>Cancel</span></Button>
                    <Button onClick={(e) => handleSave(e)} className="bg-hoverCream text-fontHeading font-semibold hover:text-white"><span>Save</span></Button>
                </div>
            </div>
        </div>
    );
}

export default AddStoreModal;
