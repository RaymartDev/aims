/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import type TypeInterface from "@/interface/types";
import { X } from "lucide-react";

interface ViewTypeModalProps {
  onClose: () => void;
  type: TypeInterface | null;
}

function ViewTypeModal({ type, onClose }: ViewTypeModalProps) {
  
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
        <div className="flex flex-col justify-start mt-5 space-y-2">
          <div>
            <p className="text-sm text-[#697386]">
              Type <span className=" text-red-500">*</span>
            </p>
            <Input value={type?.description || ''} readOnly className="focus:border-none border-black"></Input>
          </div>
        </div>
        <div className="space-x-2 mt-5 flex justify-end">
          <Button
            className="bg-hoverCream text-fontHeading font-semibold hover:text-white"
            onClick={() => {
                onClose();
            }}
          >
            <span>Cancel</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ViewTypeModal;
