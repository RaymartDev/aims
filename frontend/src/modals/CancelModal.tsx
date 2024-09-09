import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { useEffect, useState } from "react";
import { Checkbox } from "@/Components/ui/checkbox";

interface CancelModalProps {
    open: boolean;
    onClose: () => void;
}

const item = [
    { id: 1, itemNumber: "Leansel Nico", itemDesc: "IT Department", quantity: "503604218", unit: "IT Asset", serialNumber: "Registered", remarks: "N/A" },
    { id: 2, itemNumber: "100230457", itemDesc: "Jane Doe", quantity: "Finance", unit: "503604219", serialNumber: "Registered", remarks: "N/A" },
    { id: 3, itemNumber: "100230458", itemDesc: "John Smith", quantity: "Marketing", unit: "503604220", serialNumber: "Registered", remarks: "N/A"  },
    { id: 4, itemNumber: "100230458", itemDesc: "John Smith", quantity: "Marketing", unit: "503604220", serialNumber: "Registered", remarks: "N/A" },
    { id: 5, itemNumber: "100230458", itemDesc: "John Smith", quantity: "Marketing", unit: "503604220", serialNumber: "Registered", remarks: "N/A" },
    { id: 6, itemNumber: "100230458", itemDesc: "John Smith", quantity: "Marketing", unit: "503604220", serialNumber: "Registered", remarks: "N/A" },
    { id: 7, itemNumber: "100230458", itemDesc: "John Smith", quantity: "Marketing", unit: "503604220", serialNumber: "Registered", remarks: "N/A"   },
    { id: 8, itemNumber: "100230458", itemDesc: "John Smith", quantity: "Marketing", unit: "503604220", serialNumber: "Registered", remarks: "N/A" },
    { id: 9, itemNumber: "100230458", itemDesc: "John Smith", quantity: "Marketing", unit: "503604220", serialNumber: "Registered", remarks: "N/A" },
    { id: 10, itemNumber: "100230458", itemDesc: "kMAOTE", quantity: "Marketing", unit: "503604220", serialNumber: "Registered", remarks: "N/A" },
];

function CancelModal({ open, onClose }: CancelModalProps) {

    const headerHeight = 72;

    const getItemsPerPage = (height: number): number => {
        const availableHeight = height - headerHeight;
        if (availableHeight < 500) return 10;
        return 10;
    };
    const [currentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage(window.innerHeight));

    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(getItemsPerPage(window.innerHeight));
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItem= item.slice(indexOfFirstItem, indexOfLastItem);

    if (!open) return null;

    return(
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4 ">
            <div className="flex flex-col w-1/2 h-full bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between w-full border-b-2 border-black">
                    <h1 className="font-extrabold text-xl">Cancelled Item</h1>
                    <Button className="text-black bg-transparent hover:bg-transparent p-0" onClick={onClose}><X size={30}/></Button>
                </div>
                <div className="overflow-y-auto px-2">
                    <div className="flex flex-col justify-start mt-5 space-y-2">
                        <div className="space-y-1 w-1/2">
                            <h1>DR Number</h1>
                            <Input className="h-14" disabled></Input>
                        </div>

                        <div className="flex flex-row justify-between mt-3 space-x-2">
                            <div className="space-y-1 w-1/2">
                                <h1>Status</h1>
                                <Input className="focus:border-none"></Input>
                            </div>
                            <div className="space-y-1 w-1/2">
                                <h1>Date Out</h1>
                                <Input className="focus:border-none"></Input>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h1>Relead To</h1>
                            <Input className="focus:border-none"></Input>
                        </div>
                    
                        <div className="flex flex-row justify-between mt-3 space-x-2">
                            <div className="space-y-1 w-1/2">
                                <h1>Item Balance</h1>
                                <Input className="focus:border-none"></Input>
                            </div>
                            <div className="space-y-1 w-1/2">
                                <h1>Res Balance</h1>
                                <Input className="focus:border-none"></Input>
                            </div>
                        </div>
                        <div className="space-y-1 w-1/2">
                            <h1>Available Balance</h1>
                            <Input className="focus:border-none"></Input>
                        </div>
                    </div>
                    <div className="mt-5 flex justify-end">
                        <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white"><span>Select All</span></Button>
                    </div>
                    <div className="overflow-y-auto mt-5" style={{ maxHeight: `calc(100vh - ${headerHeight + 270}px)` }}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <Table><span className="sr-only">Checkbox</span></Table>
                                    <TableHead>DR Number</TableHead>
                                    <TableHead>Item Code</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Serial Number</TableHead>
                                    <TableHead>Remarks</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentItem.map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell><Checkbox id="item"></Checkbox></TableCell>
                                        <TableCell>{item.itemNumber}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.itemDesc}</TableCell>
                                        <TableCell>{item.unit}</TableCell>
                                        <TableCell>{item.serialNumber}</TableCell>
                                        <TableCell>{item.remarks}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
                
                <div className="space-x-2 mt-5 flex justify-end">
                    <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white"><span>Save</span></Button>
                    <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white" onClick={onClose}><span>Cancel</span></Button>
                </div>
            </div>
        </div>
    );
}

export default CancelModal