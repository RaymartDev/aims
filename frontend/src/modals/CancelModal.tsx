/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { useState } from "react";
import { Checkbox } from "@/Components/ui/checkbox";
import type ReleaseType from "@/interface/release";
import { formatReference } from "@/lib/utils";
import './design.css';

interface CancelModalProps {
    open: boolean;
    onClose: () => void;
    release: ReleaseType | null;
    handleCancel: (request: any, id: number) => Promise<void>;
}

function CancelModal({ open, onClose, release, handleCancel }: CancelModalProps) {

    const headerHeight = 72;

    const [selectAll, setSelectAll] = useState(false);
    const [selectedMaterials, setSelectedMaterials] = useState<number[]>([]);
    const [releadTo, setReleadTo] = useState(release?.relead_to || '');
    const [date, setDate] = useState(
        release?.date_out ? new Date(release.date_out).toISOString().split("T")[0] : ""
      );

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
            setSelectedMaterials(release ? release?.details.map(item => item.material_id) : [0]);
        }
        setSelectAll(!selectAll);
    };

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
                        <div className="flex space-x-2">
                            <div className="space-y-1 w-1/2">
                                <h1>DR Number</h1>
                                <Input value={formatReference(release?.release_number || 0)} className="h-14" disabled></Input>
                            </div>
                            <div className="space-y-1 w-1/2">
                                <h1>Date Out</h1>
                                <Input value={date} onChange={(e) => setDate(e.target.value)} disabled={release?.status === 4} className="focus:border-none" type="Date"></Input>
                            </div>
                        </div>
                        
                        <div className="space-y-1">
                            <h1>ReLead To</h1>
                            <Input value={releadTo} onChange={(e) => setReleadTo(e.target.value)} disabled={release?.status === 4} className="focus:border-none"></Input>
                        </div>
                    </div>
                    {release?.status !== 4 && (<div className="mt-5 flex justify-end">
                        <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white" onClick={handleSelectAll}><span>{selectAll ? "Unselect All" : "Select All"}</span></Button>
                    </div>)}
                    <div className="overflow-y-auto mt-5" style={{ maxHeight: `calc(100vh - ${headerHeight + 270}px)` }}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <Table><span className="sr-only">Checkbox</span></Table>
                                    <TableHead>DR Number</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Remarks</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {release && release?.details.map(item => (
                                    <TableRow key={item.detail_id}
                                        onClick={() => {
                                          if (release.status !== 4) {
                                            handleRowClick(item.material_id);
                                          }
                                        }}
                                        className={selectedMaterials.includes(item.material_id) ? "bg-cream cursor-default" : "cursor-pointer"}>
                                        {release.status !== 4 && <TableCell><Checkbox id="item" checked={selectedMaterials.includes(item.material_id)}></Checkbox></TableCell>}
                                        <TableCell>{formatReference(release.release_number)}</TableCell>
                                        <TableCell>{item.desc}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.remarks}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
                
                {release?.status !== 4 && <div className="space-x-2 mt-5 flex justify-end">
                    <Button onClick={(e) => {
                        e.preventDefault();
                        handleCancel({
                            materialIds: selectedMaterials,
                            relead_to: releadTo,
                            date_out: date,
                        }, release?.id || 0);
                        setReleadTo('');
                        setDate('');
                        setSelectedMaterials([]);
                    }} className="bg-hoverCream text-fontHeading font-semibold hover:text-white"><span>Save</span></Button>
                    <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white" onClick={onClose}><span>Cancel</span></Button>
                </div>}
            </div>
        </div>
    );
}

export default CancelModal