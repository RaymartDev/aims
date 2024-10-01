/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { X, Loader } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { useState } from "react";
import axios from "axios";
import { getVersion } from "@/lib/utils";
import { toast } from "react-toastify";

interface DeactivateConfirmationProps {
  open: boolean;
  onClose: () => void;
  active_status: boolean;
  link: string;
  handleToggle: () => void;
}

function DeactivateConfirmation({ open, onClose, active_status, link, handleToggle }: DeactivateConfirmationProps) {
  const [loading, setLoading] = useState(false);

  const handleDeactivateConfirmation = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(`${getVersion()}/${link || ''}`);
      if (response.status >= 200 && response.status < 300) {
        toast.success(response.data?.message || `Successfully ${active_status ? 'deactivated' : 'activated'} company`);
        handleToggle();
        setLoading(false);
        onClose();
      } else {
        setLoading(false);
        onClose();
      }
    }catch (err) {
      if (axios.isAxiosError(err)) {
          toast.error(err.response?.data?.message || 'Something went wrong');
        } else {
          toast.error('Something went wrong')
      }
      setLoading(false);
      onClose();
    }
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-75 flex justify-center z-50 items-center ${open ? 'block' : 'hidden'}`}>
      <div className="bg-slate-50 flex flex-col border border-black shadow-xl rounded-xl px-4 py-3">
        <div className="w-full flex justify-between px-2 py-2 border-b-2 border-gray-400">
          <h1 className="text-lg text-black font-bold">TOGGLE CONFIRMATION</h1>
          <X size={30} className="cursor-pointer" onClick={onClose} />
        </div>
        <div className="flex flex-col gap-2 p-4">
          <div className="text-center">
            <h1 className="text-lg font-bold">{`Toggle activate/deactivate?`}</h1>
          </div>
        </div>
        <div className="w-full flex justify-center gap-5 px-3 py-2">
          <Button
            className="bg-hoverCream text-fontHeading font-semibold hover:text-white px-5 py-3 items-center"
            onClick={(e) => handleDeactivateConfirmation(e)}
          >
            {loading ? <Loader className="animate-spin" /> : "YES"}
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

export default DeactivateConfirmation;
