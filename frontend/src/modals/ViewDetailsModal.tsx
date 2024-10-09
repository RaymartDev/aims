import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import ReleaseType from "@/interface/release";
import { formatDateAsString, formatReference, formatReleaseStatus } from "@/lib/utils";

interface ViewDetailsModalProps {
    open: boolean;
    onClose: () => void;
    release: ReleaseType | null;
}

function ViewDetailsModal({ open, onClose, release }: ViewDetailsModalProps) {

    const headerHeight = 72;


    if (!open) return null;

    return(
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4">
            <div className="flex flex-col w-4/6 2xl:w-3/6 bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between w-full border-b-2 border-black">
                    <h1 className="font-extrabold text-xl">View Details</h1>
                    <Button className="text-black bg-transparent hover:bg-transparent p-0" onClick={onClose}><X size={30}/></Button>
                </div>
                <div className="flex flex-col justify-start mt-5 space-y-2">
                    <div className="space-x-2 flex justify-between">
                        <div className="space-y-1 w-1/2">
                            <h1>DR Number</h1>
                            <Input className="h-14" disabled value={formatReference(release?.release_number || 0)}></Input>
                        </div>
                        <div className="space-y-1 w-1/2">
                            <h1>Status</h1>
                            <Input disabled value={formatReleaseStatus(release?.status || 0)}></Input>
                        </div>
                    </div>
                    <div className="space-x-2 flex">
                        <div className="space-y-1 w-3/5">
                            <h1>Shipped By</h1>
                            <Input disabled value={release?.shipped_by?.name || ''}></Input>
                        </div>
                        <div className="space-y-1 w-2/5">
                            <h1>Shipped Date</h1>
                            <Input disabled value={release?.shipped_by ? formatDateAsString(new Date(release.shipped_by.date)) : ''}></Input>
                        </div>
                    </div>
                    <div className="space-x-2 flex">
                        <div className="space-y-1 w-3/5">
                            <h1>Received By</h1>
                            <Input disabled value={release?.received_by?.name || ''}></Input>
                        </div>
                        <div className="space-y-1 w-2/5">
                            <h1>Received Date</h1>
                            <Input disabled value={release?.received_by ? formatDateAsString(new Date(release.received_by.date)) : ''}></Input>
                        </div>
                    </div>
                </div>
                <div className="overflow-y-auto mt-5" style={{ maxHeight: `calc(100vh - ${headerHeight + 270}px)` }}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>DR Number</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Remarks</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {release && release.details.map(item => (
                                <TableRow key={item.detail_id}>
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
        </div>
    );
}

export default ViewDetailsModal