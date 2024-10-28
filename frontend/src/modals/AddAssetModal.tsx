import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Checkbox } from "@/Components/ui/checkbox";
import './design.css'
import { formatReference } from "@/lib/utils";
interface AddAssetModalProps {
    onClose: () => void;
    itemList: {
        detail_id: number;
        material_id: number;
        release_number: number;
        desc: string;
        quantity: number;
        remarks: string;
        item_code?: string;
        material_code?: string;
        uom?: string;
        serial?: string;
        cost?: number;
    }[];
    reference: number;
    addAll: (selectedRelease: number[]) => void;
}

function AddAssetModal({ onClose, itemList, reference, addAll }: AddAssetModalProps) {
    const headerHeight = 72;

    const [selectedMaterials, setSelectedMaterials] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);


    const handleRowClick = (id: number) => {
        if (selectedMaterials.includes(id)) {
            setSelectedMaterials(selectedMaterials.filter(item => item !== id));
        } else {
            setSelectedMaterials([...selectedMaterials, id]);
        }
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedMaterials([]);
        } else {
            setSelectedMaterials(itemList.map(item => item.detail_id));
        }
        setSelectAll(!selectAll);
    };

    return(
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4">
            <div className="flex flex-col w-1/2 bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between w-full">
                    <h1 className="font-extrabold text-2xl">Add Asset</h1>
                    <Button className="text-black bg-transparent hover:bg-transparent p-0" onClick={onClose}><X size={30}/></Button>
                </div>
                <div className="flex justify-between mt-5 ">
                    <div className="flex flex-row items-center w-3/4">
                        <h1 className="w-1/6">DR Number</h1>
                        <h1 className="border px-3 py-2 rounded-lg bg w-2/6">{formatReference(reference)}</h1>
                    </div>
                    <div className="flex items-center">
                        <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white" onClick={handleSelectAll}>
                            <span>{selectAll ? "Unselect All" : "Select All"}</span>
                        </Button>
                    </div>
                </div>
                <div className="mt-5 overflow-y-auto" style={{ maxHeight: `calc(100vh - ${headerHeight + 270}px)` }}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead><span className="sr-only">Checkbox</span></TableHead>
                                <TableHead>Item Code</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Serial Code</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Unit</TableHead>
                                <TableHead>Cost</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {itemList.map(asset => (
                                <TableRow key={asset.detail_id}
                                    onClick={() => handleRowClick(asset.detail_id)}
                                    className={selectedMaterials.includes(asset.detail_id) ? "bg-cream" : "cursor-pointer"}>
                                    <TableCell><Checkbox checked={selectedMaterials.includes(asset.detail_id)} /></TableCell>
                                    <TableCell>{asset.item_code || ''}</TableCell>
                                    <TableCell>{asset.desc}</TableCell>
                                    <TableCell>{asset.serial || ''}</TableCell>
                                    <TableCell>{asset.quantity}</TableCell>
                                    <TableCell>{asset.uom || ''}</TableCell>
                                    <TableCell>{asset.cost || 0}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex justify-end space-x-5 mt-5">
                    <Button className="w-32 bg-hoverCream text-fontHeading font-semibold hover:text-white" onClick={onClose}>Cancel</Button>
                    <Button onClick={() => {
                        if (selectedMaterials.length > 0) {
                            addAll(selectedMaterials);
                            onClose();
                        } 
                    }} className="w-32 bg-hoverCream text-fontHeading font-semibold hover:text-white">Add</Button>
                </div>
            </div>
        </div>
    );
}

export default AddAssetModal;
