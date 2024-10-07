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
import type DeliveryType from "@/interface/delivery";

interface SearchDeliveriesModalProps {
  onClose: () => void;
  delivery: DeliveryType | null;  
}

function SearchDeliveriesModal({ onClose, delivery }: SearchDeliveriesModalProps) {
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4">
      <div className="flex flex-col w-2/5 2xl:w-1/3 bg-slate-50 rounded-2xl p-6">
        <div className="flex items-center justify-between w-full border-b-2 border-black">
          <h1 className="font-extrabold text-xl">View Deliveries Details</h1>
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
                        <TableHead>Delivery Number</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Serial Number</TableHead>
                        <TableHead>Asset Number</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Remarks</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>{delivery?.id}</TableCell>
                        <TableCell>{delivery?.description}</TableCell>
                        <TableCell>{delivery?.serial_number}</TableCell>
                        <TableCell>{delivery?.asset_number}</TableCell>
                        <TableCell>{delivery?.quantity}</TableCell>
                        <TableCell>{delivery?.unit}</TableCell>
                        <TableCell>{delivery?.remarks}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>   
        </div>
      </div>
    </div>
  );
}

export default SearchDeliveriesModal;
