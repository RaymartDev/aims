/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
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
import type MaterialType from "@/interface/material";
import EditMaterialModal from "./EditMaterialModal";
import DeleteConfirmation from "./DeleteConfirmation";
import { formatCurrency, formatDateAsString } from "@/lib/utils";

interface SearchProuctModalProps {
    onClose: () => void;
    material: MaterialType | null;
}

function SearchProductModal({ onClose, material }: SearchProuctModalProps) {
    const [materials, setMaterials] = useState<MaterialType[]>([]);
    const [editMaterial, setEditMaterial] = useState<MaterialType | null>(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const updateMaterial = (updatedMaterial: MaterialType | null) => {
        if (updatedMaterial) {
            setMaterials((prevMaterials) =>
                prevMaterials.map((material) =>
                    material.id === updatedMaterial.id ? updatedMaterial : material
                )
            );
            setEditMaterial(null);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4">
            <div className="flex flex-col w-2/5 2xl:w-2/3 bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between w-full border-b-2 border-black">
                    <h1 className="font-extrabold text-xl">View Product Details</h1>
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
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
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
                                <TableCell>Active</TableCell>
                                <TableCell align="center">
                                    <Button
                                        className="bg-transparent text-black hover:text-white"
                                        onClick={() => {
                                            setEditMaterial(material);
                                            setOpenEditModal(true);
                                        }}
                                    >
                                        <Pencil />
                                    </Button>
                                    <Button
                                        className="bg-transparent text-black hover:text-white"
                                        onClick={() => setOpenDeleteModal(true)}
                                    >
                                        <Trash />
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Button className="bg-transparent text-fontHeading hover:text-white">
                                                <MoreHorizontal />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>
                                                {material?.active_status
                                                    ? "Deactivate"
                                                    : "Activate"}
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
            {openEditModal && (
                <EditMaterialModal
                    updateMaterial={updateMaterial}
                    material={editMaterial}
                    onClose={() => setOpenEditModal(false)}
                />
            )}
            {openDeleteModal && (
                <DeleteConfirmation
                    open={openDeleteModal}
                    onClose={() => setOpenDeleteModal(false)}
                />
            )}
        </div>
    );
}

export default SearchProductModal;
