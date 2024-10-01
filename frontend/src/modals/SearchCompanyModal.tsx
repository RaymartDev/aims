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
import type CompanyType from "@/interface/company";
import DeactivateConfirmation from "./DeactivateConfirmation";
import DeleteConfirmation from "./DeleteConfirmation";
import EditCompanyModal from './EditCompanyModal';
import { useState } from "react";

interface SearchCompanyModalProps {
  onClose: () => void;
  company: CompanyType | null;  
  handleDelete: () => void;
  handleToggle: () => void;
  updateCompany: (updatedCompany: CompanyType | null) => void;
}

function SearchCompanyModal({ onClose, company, handleDelete, handleToggle, updateCompany }: SearchCompanyModalProps) {
  
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeactivateOpen, setIsDeactivateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4">
      <div className="flex flex-col w-2/5 2xl:w-1/3 bg-slate-50 rounded-2xl p-6">
        <div className="flex items-center justify-between w-full border-b-2 border-black">
          <h1 className="font-extrabold text-xl">View Company Details</h1>
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
                        <TableHead>Company Name</TableHead>
                        <TableHead>Active Status</TableHead>
                        <TableHead><span className="sr-only">Actions</span></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                        <TableRow>
                            <TableCell>{company?.name || ""}</TableCell>
                            <TableCell>{company?.active_status ? 'Active' : 'Inactive'}</TableCell>
                            <TableCell align="center">
                                <Button className="bg-transparent text-black hover:text-white" onClick={() => setIsEditOpen(true)}><Pencil/>
                                </Button>
                                <Button className="bg-transparent text-black hover:text-white" onClick={() => setIsDeleteOpen(true)}><Trash/></Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Button className="bg-transparent text-fontHeading hover:text-white">
                                            <MoreHorizontal/>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => setIsDeactivateOpen(true)}>{company?.active_status ? 'Deactivate' : 'Activate'}</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                </TableBody>
            </Table>   
        </div>
      </div>
      <DeactivateConfirmation
        open={isDeactivateOpen}
        onClose={() => setIsDeactivateOpen(false)}
        active_status={company?.active_status || false}
        link={`company/toggle/${company?.id}`}
        handleToggle={handleToggle}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        open={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          onClose();
        }}
        link={`company/delete/${company?.id}`}
        handleDelete={handleDelete}
      />

      {/* Edit Company Modal */}
      {isEditOpen && (
        <EditCompanyModal
          updateCompany={updateCompany} // Pass the updateCompany function
          company={company} // Pass the current company
          onClose={() => setIsEditOpen(false)} // Close edit modal
        />
      )}
    </div>
  );
}

export default SearchCompanyModal;
