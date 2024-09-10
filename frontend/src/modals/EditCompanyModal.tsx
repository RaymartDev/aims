/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import type CompanyType from "@/interface/company";
import { getActiveStatus, getVersion } from "@/lib/utils";
import axios from "axios";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

interface EditCompanyModalProps {
    onClose: () => void;
    updateCompany: (company: CompanyType | null) => void;
    company: CompanyType | null;
}

function EditCompanyModal ({ onClose, updateCompany, company }: EditCompanyModalProps) {
    const [name, setName] = useState(company?.name || '');

    const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${getVersion()}/company/update/${company?.id || 1}`, {
              name,
            })
      
            if (response.status >= 200 && response.status < 300) {
              toast.success(response.data?.message || 'Successfully updated company');
              updateCompany({
                id: company?.id || 1,
                name,
                active_status: getActiveStatus(response.data?.company),
              })
              setName('');
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
                    <h1 className="font-extrabold text-xl">Edit Company</h1>
                    <Button className="text-black bg-transparent hover:bg-transparent p-0" onClick={onClose}><X size={30}/></Button>
                </div>
                <div className="flex flex-col justify-start mt-5 space-y-2">
                    <div>
                        <p className="text-sm text-[#697386]">Company Name</p>
                        <Input value={name} onChange={(e) => setName(e.target.value)} className="focus:border-none border-black"></Input>
                    </div>
                </div>
                <div className="space-x-2 mt-5 flex justify-end">
                    <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white" onClick={onClose}><span>Cancel</span></Button>
                    <Button onClick={(e) => handleUpdate(e)} className="bg-hoverCream text-fontHeading font-semibold hover:text-white"><span>Save</span></Button>
                </div>
            </div>
        </div>
    );
}

export default EditCompanyModal