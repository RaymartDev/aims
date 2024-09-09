/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { X } from "lucide-react";
import type EmployeeType from "@/interface/employee";
import { useEffect, useState } from "react";
import axios from "axios";
import { getVersion } from "@/lib/utils";
import { toast } from "react-toastify";

interface ViewEmployeeModalProps {
    employeeId: number;
    onClose: () => void;
}

function ViewEmployeeModal ({ employeeId, onClose }: ViewEmployeeModalProps) {
    const [employee, setEmployee] = useState<EmployeeType | null>(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`${getVersion()}/employee/${employeeId}`);
                if (response.status >= 200 && response.status < 300) {
                    setEmployee(response.data.employee);
                } else {
                    toast.error('Failed to fetch employee details');
                }
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    toast.error(err.response?.data?.message || 'Something went wrong');
                } else {
                    toast.error('Something went wrong');
                }
            }
        };

        fetchEmployee().catch(err => {
            console.error('Error fetching employee:', err);
        });
    }, [employeeId]);

    return(
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4">
            <div className="flex flex-col w-2/5 2xl:w-1/3 bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between w-full border-b-2 border-black">
                    <h1 className="font-extrabold text-xl">View Employee Details</h1>
                    <Button className="text-black bg-transparent hover:bg-transparent p-0" onClick={onClose}><X size={30}/></Button>
                </div>
                <div className="flex flex-col justify-start mt-5 space-y-2">
                    <div className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">First Name</p>
                            <Input value={employee?.first_name || ''} readOnly className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Last Name</p>
                            <Input value={employee?.last_name || ''} readOnly className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                    <div className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Employee Number</p>
                            <Input value={employee?.employee_no || ''} readOnly className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Cost Center Code</p>
                            <Input value={employee?.cost_center_code || ''} readOnly className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                    <div className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Company Name</p>
                            <Input value={employee?.company_name || ''} readOnly className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                    <div className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Department</p>
                            <Input value={employee?.department_name || ''} readOnly className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Division</p>
                            <Input value={employee?.division || ''} readOnly className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                </div>
                <div className="space-x-2 mt-5 flex justify-end">
                    <Button onClick={onClose} className="bg-hoverCream text-fontHeading font-semibold hover:text-white"><span>Close</span></Button>
                </div>
            </div>
        </div>
    );
}

export default ViewEmployeeModal;
