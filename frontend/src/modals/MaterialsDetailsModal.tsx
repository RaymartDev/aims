/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
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
import type MaterialType from "@/interface/material";
import { formatCurrency, formatDateAsString } from "@/lib/utils";

interface MaterialsDetailsModalProps {
    onClose: () => void;
    material: MaterialType | null;
}

function MaterialsDetailsModal({ onClose, material }: MaterialsDetailsModalProps) {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4">
            <div className="flex flex-col w-2/5 2xl:w-2/3 bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between w-full border-b-2 border-black">
                    <h1 className="font-extrabold text-xl">Material Details</h1>
                    <Button
                        className="text-black bg-transparent hover:bg-transparent p-0"
                        onClick={() => {
                            onClose();
                          }}
                    >
                        <X size={30} />
                    </Button>
                </div>
                <div
                    className="mt-5 overflow-y-auto"
                    style={{ maxHeight: `calc(100vh - ${70 + 270}px)` }}
                >
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Material Code</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Item Code</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Material Type</TableHead>
                                <TableHead>Cost</TableHead>
                                <TableHead>Date Entry</TableHead>
                                <TableHead>Active Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>{material?.material_code || ""}</TableCell>
                                <TableCell>{material?.item_description || ""}</TableCell>
                                <TableCell>{material?.item_code || ""}</TableCell>
                                <TableCell>{material?.category || ""}</TableCell>
                                <TableCell>{material?.material_type || ""}</TableCell>
                                <TableCell>
                                    {formatCurrency(material?.unit_cost || 0)}
                                </TableCell>
                                <TableCell>
                                    {formatDateAsString(
                                        new Date(material?.date_entry || "")
                                    )}
                                </TableCell>
                                <TableCell>{material?.active_status ? 'Active' : 'Inactive'}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div className="mt-5 flex justify-end">
                    <Button className=" w-32 bg-hoverCream text-fontHeading font-semibold hover:text-white">Select</Button>
                </div>
            </div>
        </div>
    );
}

export default MaterialsDetailsModal;
