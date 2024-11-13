
import { Button } from "@/Components/ui/button";
import { X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Input } from "@/Components/ui/input";
import type ReturnType from "@/interface/return";
import { formatCost, formatReference } from "@/lib/utils";

interface ViewReturnModalProps {
    onClose: () => void;
    returnReport: ReturnType | null;
}

function ViewReturnModal ({ onClose, returnReport }: ViewReturnModalProps) {

    const headerHeight = 72;

    return ( 
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4">
            <div className="flex flex-col w-3/5 2xl:w-1/2 bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between w-full border-b-2 border-black">
                    <h1 className="font-extrabold text-xl">View Return Details</h1>
                    <Button className="text-black bg-transparent hover:bg-transparent p-0" onClick={onClose}><X size={30}/></Button>
                </div>
                <div className="flex flex-col justify-start mt-5 space-y-4">
                    <div className="flex flex-row w-full">
                        <div className="w-1/2 space-x-2 flex flex-row">
                            <h1 className="font-semibold flex items-center">DR Number</h1>
                            <Input className="text-red-700 w-1/2" readOnly value={formatReference(returnReport?.release_number || 0)}/>
                        </div>
                        <div className="w-1/2 space-x-2 flex flex-row">
                            <h1 className="font-semibold flex items-center">AR Number</h1>
                            <Input className="text-red-700 w-1/2" readOnly value={formatReference(returnReport?.return_number || 0)}/>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h1 className="font-bold text-lg">Assigned To</h1>
                        <div className="flex flex-row w-full">
                            <div className="w-1/2 space-x-2 flex">
                                <h1 className="flex items-center">Name</h1>
                                <Input readOnly value={returnReport?.requestor.name || ''} className="focus:border-none border-black w-1/2"/>
                            </div>
                            <div className="w-1/2 space-x-2 flex ">
                                <h1 className="flex items-center">Employee Number</h1>
                                <Input readOnly value={returnReport?.requestor.employee_no || ''} className="focus:border-none border-black w-1/2"/>
                            </div>
                        </div>
                        <div className="flex flex-row w-1/2 space-x-2">
                            <h1 className="flex items-center w-full">Cost Center Code</h1>
                            <Input readOnly value={returnReport?.requestor.cost_center_code || ''} className="focus:border-none border-black"/>
                        </div>
                    </div>
                    <div>
                        <h1 className="font-bold text-lg">Returned Items</h1>
                        <div className="mt-3 overflow-y-auto" style={{ maxHeight: `calc(100vh - ${headerHeight + 270}px)` }}>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Item Code</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Serial Code</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Unit</TableHead>
                                        <TableHead>Cost</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {returnReport && returnReport.details.map((detail) => (
                                    <TableRow key={detail.detail_id}>
                                        <TableCell>{detail.material_id}</TableCell>
                                        <TableCell>{detail.desc}</TableCell>
                                        <TableCell>{detail.serial_number}</TableCell>
                                        <TableCell>{detail.quantity}</TableCell>
                                        <TableCell>{detail.unit}</TableCell>
                                        <TableCell>{formatCost(detail.cost)}</TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ViewReturnModal;