/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/Components/ui/button";
import { X } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import type InventoryType from "@/interface/inventory";
import { formatDateAsString } from "@/lib/utils";

interface SearchInventoryModalProps {
    onClose: () => void;
    inventory: InventoryType | null;
}

function SearchInventoryModal({ onClose, inventory }: SearchInventoryModalProps) {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4">
            <div className="flex flex-col w-2/5 2xl:w-2/3 bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between w-full border-b-2 border-black">
                    <h1 className="font-extrabold text-xl">View Inventory Details</h1>
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
                                <TableHead>Material Code</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Total Balance</TableHead>
                                <TableHead>Remaining Balance</TableHead>
                                <TableHead>Quantity Out</TableHead>
                                <TableHead>Available</TableHead>
                                <TableHead>Return</TableHead>
                                <TableHead>Unit</TableHead>
                                <TableHead>Material Type</TableHead>
                                <TableHead>Cost</TableHead>
                                <TableHead>Date Entry</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>{inventory?.material_code || ""}</TableCell>
                                <TableCell>{inventory?.description || ""}</TableCell>
                                <TableCell>{inventory?.total_balance || ""}</TableCell>
                                <TableCell>{inventory?.remaining_balance || ""}</TableCell>
                                <TableCell>{inventory?.quantity_out || ""}</TableCell>
                                <TableCell>{inventory?.available || ""}</TableCell>
                                <TableCell>{inventory?.return || ""}</TableCell>
                                <TableCell>{inventory?.unit || ""}</TableCell>
                                <TableCell>{inventory?.material_type || ""}</TableCell>
                                <TableCell>{inventory?.cost || ""}</TableCell>
                                <TableCell>{formatDateAsString(new Date(inventory?.date_entry || ""))}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>   
                </div>
            </div>

        </div>
    );
}

export default SearchInventoryModal;
