/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/Components/ui/button";
import { MoreHorizontal, Pencil, Trash, X } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import type EmployeeType from "@/interface/employee";
import { formatDateAsString } from "@/lib/utils";

interface SearchEmployeeModalProps {
    onClose: () => void;
    employee: EmployeeType | null;
}

function SearchEmployeeModal({ onClose, employee }: SearchEmployeeModalProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4">
            <div className="flex flex-col w-2/5 2xl:w-2/3 bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between w-full border-b-2 border-black">
                    <h1 className="font-extrabold text-xl">View Employee Details</h1>
                    <Button
                        className="text-black bg-transparent hover:bg-transparent p-0"
                        onClick={() => {
                            onClose();
                          }}
                    >
                        <X size={30} />
                    </Button>
                </div>
                <div className="mt-5 overflow-y-auto overflow-x-auto" style={{ maxHeight: `calc(100vh - ${70 + 270}px)` }}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee Number</TableHead>
                                <TableHead>First Name</TableHead>
                                <TableHead>Last Name</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Cost Code</TableHead>
                                <TableHead>Division</TableHead>
                                <TableHead>Company</TableHead>
                                <TableHead>Date Hired</TableHead>
                                <TableHead>Registered Status</TableHead>
                                <TableHead>Active Status</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                                <TableRow>
                                    <TableCell>{employee?.employee_no || ""}</TableCell>
                                    <TableCell>{employee?.first_name || ""}</TableCell>
                                    <TableCell>{employee?.last_name || ""}</TableCell>
                                    <TableCell>{employee?.department_name || ""}</TableCell>
                                    <TableCell>{employee?.cost_center_code || ""}</TableCell>
                                    <TableCell>{employee?.division || ""}</TableCell>
                                    <TableCell>{employee?.company_name || ""}</TableCell>
                                    <TableCell>{formatDateAsString(new Date(employee?.date_hired || ""))}</TableCell>
                                    <TableCell>{employee?.registered_status ? 'Registered' : 'Not Registered'}</TableCell>
                                    <TableCell>{employee?.active_status ? 'Active' : 'Inactive'}</TableCell>
                                    <TableCell align="center" className="flex flex-row">
                                        <Button className="bg-transparent text-black hover:text-white"><Pencil/>
                                        </Button>
                                        <Button className="bg-transparent text-black hover:text-white"><Trash/></Button>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <Button className="bg-transparent text-fontHeading hover:text-white">
                                                    <MoreHorizontal/>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem>{employee?.active_status ? 'Deactivate' : 'Activate'}</DropdownMenuItem>
                                                <DropdownMenuItem disabled={employee?.registered_status}>Register</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                        </TableBody>
                    </Table>   
                </div>
            </div>
        </div>
    );
}

export default SearchEmployeeModal;
