import { X, Loader } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { useState } from "react";


interface DeleteConfirmationProps {
    open: boolean;
    onClose: () => void;
  }
  
  function DeleteConfirmation({ open, onClose}: DeleteConfirmationProps) {
    const [loading, setLoading] = useState(false);
  
    return (
      <div className={`fixed inset-0 bg-black bg-opacity-75 flex justify-center z-50 items-center ${open ? 'block' : 'hidden'}`}>
        <div className="bg-slate-50 flex flex-col border border-black shadow-xl rounded-xl px-4 py-3">
          <div className="w-full flex justify-between px-2 py-2 border-b-2 border-gray-400">
            <h1 className="text-lg text-black font-bold">DELETE CONFIRMATION</h1>
            <X size={30} className="cursor-pointer" onClick={onClose} />
          </div>
          <div className="flex flex-col gap-2 p-4">
            <div className="text-center">
              <h1 className="text-lg font-bold">Are you sure you want to delete this?</h1>
            </div>
          </div>
          <div className="w-full flex justify-center gap-5 px-3 py-2">
          <Button
              className="bg-hoverCream text-fontHeading font-semibold hover:text-white px-5 py-3 items-center"
              onClick={() => {
                setLoading(true);
              }}
            >
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                "YES"
              )}
              </Button>
            <Button
              className="bg-hoverCream text-fontHeading font-semibold hover:text-white px-5 py-3"
              onClick={onClose}
            >
              NO
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  export default DeleteConfirmation;
  
