/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { X } from "lucide-react";
import type EmployeeType from "@/interface/employee";
import { useState } from "react";
import axios from "axios";
import { getVersion } from "@/lib/utils";
import { toast } from "react-toastify";

interface UserRegistrationProps {
    onClose: () => void;
    employee: EmployeeType | null;
    registerEmployee: (id: number) => void;
}

function UserRegistration ({ employee, onClose, registerEmployee }: UserRegistrationProps) {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');

    const handleRegister = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${getVersion()}/user/register`, {
                registrationType: 'employee',
                employee_id: employee?.id || 1,
                store_id: null,
                name: `${employee?.first_name} ${employee?.last_name}`,
                username,
                password,
                department: employee?.department_name,
                division: employee?.division,
                cost_center_code: employee?.cost_center_code,
                employee_number: employee?.employee_no,
                admin: 'y',
            })
            if (response.status >= 200 && response.status < 300) {
                toast.success(response.data?.message || 'Successfully registered employee');
                registerEmployee(employee?.id || 1);    
            }
            onClose();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message || 'Something went wrong');
              } else {
                toast.error('Something went wrong')
              }
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4">
            <div className="flex flex-col w-2/5 2xl:w-1/3 bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between w-full border-b-2 border-black">
                    <h1 className="font-extrabold text-xl">User Registration</h1>
                    <Button className="text-black bg-transparent hover:bg-transparent p-0" onClick={onClose}><X size={30}/></Button>
                </div>
                <div className="flex flex-col justify-start mt-5 space-y-2">
                    <div className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-3/4">
                            <p className="text-sm text-[#697386]">Name</p>
                            <Input value={`${employee?.first_name} ${employee?.last_name}`} disabled className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-1/3">
                            <p className="text-sm text-[#697386]">Employee Number</p>
                            <Input value={`${employee?.employee_no}`} disabled className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                    <div className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Username</p>
                            <Input value={username} onChange={(e) => setUsername(e.target.value)} className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Password</p>
                            <Input value={password} onChange={(e) => setPassword(e.target.value)} className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                    <div className="flex flex-row w-full space-x-2">
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Department</p>
                            <Input value={employee?.department_name} disabled className="focus:border-none border-black"></Input>
                        </div>
                        <div className="space-y-1 w-full">
                            <p className="text-sm text-[#697386]">Division</p>
                            <Input value={employee?.division} disabled className="focus:border-none border-black"></Input>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-[#697386]">Cost Center Code</p>
                        <Input value={employee?.cost_center_code} disabled className="focus:border-none border-black"></Input>
                    </div>
                </div>
                <div className="space-x-2 mt-5 flex justify-end">
                    <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white" onClick={onClose}><span>Cancel</span></Button>
                    <Button onClick={(e) => handleRegister(e)} className="bg-hoverCream text-fontHeading font-semibold hover:text-white"><span>Save</span></Button>
                </div>
            </div>
        </div>
    );
}

export default UserRegistration