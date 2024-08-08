import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useState } from "react";
import POSModal from "@/modals/POSModal";

function DeliveryReceipt() {
  const [openPOSModal, setOpenPOSModal] = useState(false);
  
  return (
    <>
      <div className="flex h-full">
        <div className="flex flex-col h-full  ">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Delivery Receipt</h1>
            <p className="text-sm font-semibold text-[#9E9E9E]">
              Delivery / Delivery Receipt
            </p>
          </div>
          <div className="flex w-full justify-start pl-10 gap-8 2xl:gap-20 pt-10">
            <div className="flex gap-6">
              <div className="flex flex-col">
                <p className="text-sm">Reference Number</p>
                <Input className="focus:outline-none w-80" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm">Requestor Name</p>
                <Input className="focus:border-none" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm">Cost Center Code</p>
                <Input className="focus:border-none" />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-10">
            <Button className="bg-hoverCream text-fontHeading border hover:text-white" onClick={() => setOpenPOSModal(true)}> + Add Item</Button>
          </div>
        </div>
        </div>
      <POSModal open={openPOSModal} onClose={() => setOpenPOSModal(false)}/>
    </>
  );
}

export default DeliveryReceipt;
