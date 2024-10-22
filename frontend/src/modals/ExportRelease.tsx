/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { X, Loader } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { useState } from "react";

interface ExportReleaseProps {
  open: boolean;
  onClose: () => void;
  link: string;
}

function ExportRelease({ open, onClose, link }: ExportReleaseProps) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-75 flex justify-center z-50 items-center ${open ? 'block' : 'hidden'}`}>
      <div className="bg-slate-50 flex flex-col border border-black shadow-xl rounded-xl px-4 py-3">
        <div className="w-full flex justify-between px-2 py-2 border-b-2 border-gray-400">
          <h1 className="text-lg text-black font-bold">EXPORT DATA</h1>
          <X size={30} className="cursor-pointer" onClick={onClose} />
        </div>
        <div className="flex flex-col gap-2 p-4">
          <div className="flex flex-col gap-4">
            <label className="font-semibold text-black flex items-center gap-4">
              From Date:
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border px-2 py-1 rounded-lg"
              />
            </label>
            <label className="font-semibold text-black flex items-center gap-5">
              To Date:
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border px-2 py-1 rounded-lg"
              />
            </label>
          </div>
        </div>
        <div className="w-full flex justify-center gap-5 px-3 py-2">
          <Button
            className="bg-hoverCream text-fontHeading font-semibold hover:text-white px-5 py-3 items-center"
            disabled={loading}
          >
            {loading ? <Loader className="animate-spin" /> : "DOWNLOAD"}
          </Button>
          <Button
            className="bg-hoverCream text-fontHeading font-semibold hover:text-white px-5 py-3"
            onClick={onClose}
          >
            CANCEL
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ExportRelease;
