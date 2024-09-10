import { IoMdClose } from "react-icons/io";
import { ImSpinner } from "react-icons/im";
import { useState } from "react";


interface DeleteConfirmationProps {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
    message: string;
  }
  
  function DeleteConfirmation({ open, onClose, onDelete, message }: DeleteConfirmationProps) {
    const [loading, setLoading] = useState(false);
  
    return (
      <div className={`fixed inset-0 flex justify-center items-center ${open ? 'block' : 'hidden'}`}>
        <div className="bg-white flex flex-col border border-gray-400 shadow-xl">
          <div className="w-full flex justify-between px-2 py-2 border-b border-gray-400">
            <h1 className="text-lg text-[#444b88] font-bold">DELETE RESUME</h1>
            <IoMdClose size={30} className="cursor-pointer" onClick={onClose} />
          </div>
          <div className="flex flex-col gap-2 p-4">
            <div className="text-center">
              <h1 className="text-lg font-bold">{message}</h1>
            </div>
          </div>
          <div className="w-full flex justify-end gap-5 px-3 py-2">
            <button
              className="text-lg py-1 px-3 border-2 border-[#444b88] text-[#444b88] hover:bg-[#bad2ff]"
              onClick={onClose}
            >
              NO
            </button>
            <button
              className="text-lg py-1 px-3 border-2 border-red-500 text-red-500 hover:bg-red-300"
              onClick={() => {
                setLoading(true);
                onDelete();
              }}
            >
              {loading ? (
                <ImSpinner className="animate-spin mr-2" />
              ) : (
                "YES, DELETE THIS RESUME"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default DeleteConfirmation;
  
