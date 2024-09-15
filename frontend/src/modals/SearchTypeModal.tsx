/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/Components/ui/button";
import { MoreHorizontal, Pencil, Trash, X } from "lucide-react";
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
import type TypeInterface from "@/interface/types";

interface SearchTypeModalProps {
  onClose: () => void;
  type: TypeInterface | null;
}

function SearchTypeModal({ onClose, type }: SearchTypeModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4">
      <div className="flex flex-col w-2/5 2xl:w-1/3 bg-slate-50 rounded-2xl p-6">
        <div className="flex items-center justify-between w-full border-b-2 border-black">
          <h1 className="font-extrabold text-xl">View Type Details</h1>
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
                <TableHead>Type Description</TableHead>
                <TableHead>Active Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{type?.description || ""}</TableCell>
                <TableCell>{type?.active_status ? 'Active' : 'Inactive'}</TableCell>
                <TableCell align="center">
                  <Button
                    className="bg-transparent text-black hover:text-white">
                    <Pencil />
                  </Button>
                  <Button className="bg-transparent text-black hover:text-white">
                    <Trash />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button className="bg-transparent text-fontHeading hover:text-white">
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>{type?.active_status ? 'Deactivate' : 'Activate'}</DropdownMenuItem>
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

export default SearchTypeModal;
