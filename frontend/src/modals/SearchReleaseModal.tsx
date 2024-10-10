/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/Components/ui/button";
import { MoreHorizontal, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import type ReleaseType from "@/interface/release";
import { formatDateAsString, formatReference, formatReleaseStatus } from "@/lib/utils";


interface SearchReleaseModalProps {
  onClose: () => void;
  release: ReleaseType | null;
}

function SearchReleaseModal({ onClose, release}: SearchReleaseModalProps) {
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4">
      <div className="flex flex-col w-2/5 2xl:w-2/3 bg-slate-50 rounded-2xl p-6">
        <div className="flex items-center justify-between w-full border-b-2 border-black">
          <h1 className="font-extrabold text-xl">View Release Report Details</h1>
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
                        <TableHead>DR Number</TableHead>
                        <TableHead>Requestor Name</TableHead>
                        <TableHead>Employee Number</TableHead>
                        <TableHead>Cost Center Number</TableHead>
                        <TableHead>Shipped By</TableHead>
                        <TableHead>Shipped Date</TableHead>
                        <TableHead>Received By</TableHead>
                        <TableHead>Received Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead><span className="sr-only">Actions</span></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                        <TableRow>
                            <TableCell>{formatReference(release?.release_number ?? 0)}</TableCell>
                            <TableCell>{release?.requestor.name || ""}</TableCell>
                            <TableCell>{release?.requestor.employee_no || ""}</TableCell>
                            <TableCell>{release?.requestor.cost_center_code || ""}</TableCell>
                            <TableCell>{release?.shipped_by ? release.shipped_by.name : ''}</TableCell>
                            <TableCell>{release?.shipped_by ? formatDateAsString(new Date(release.shipped_by.date || "")) : ''}</TableCell>
                            <TableCell>{release?.received_by ? release.received_by.name : ''}</TableCell>
                            <TableCell>{release?.received_by ? formatDateAsString(new Date(release.received_by.date || "")) : ''}</TableCell>
                            <TableCell>{formatReleaseStatus(release?.status ?? 0)}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Button className="bg-transparent text-fontHeading hover:text-white">
                                            <MoreHorizontal/>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem disabled={release?.status === 1 || release?.status === 3 || release?.status === 4}>Shipped</DropdownMenuItem>
                                        <DropdownMenuItem disabled={release?.status === 2 || release?.status === 3 || release?.status === 4}>Received</DropdownMenuItem>
                                        <DropdownMenuItem disabled={release?.status === 4}>Cancel</DropdownMenuItem>
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

export default SearchReleaseModal;
