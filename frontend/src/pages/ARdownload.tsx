/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { formatReference } from "@/lib/utils";
import { useEffect, useState } from "react";

interface DetailItem {
  detail_id: number;
  desc: string;
  release_number: number;
  material_id: number;
  quantity: number;
  remarks: string;
  material_code?: string;
  item_code?: string;
  uom?: string;
  serial?: string;
  cost?: number;
}

interface ReturnState {
  reference: number;
  returnItemList: DetailItem[];
  selectedUser: {
    emp_no: string;
    cost_code: string;
    name: string;
    company: string;
    department: string;
  };
  reason: string;
  remarks: string;
}
function ARdownload() {

  const [arState, setARState] = useState<ReturnState | null>(null);

  useEffect(() => {
    // Retrieve state from localStorage
    const storedState = localStorage.getItem('arState');
    if (storedState) {
      setARState(JSON.parse(storedState));
    }
  }, []);

  const selectedItems = arState?.returnItemList || [];

  const filledItems: DetailItem[] = [
    ...selectedItems,
    ...Array(11 - selectedItems.length).fill({
      description: "\u200B", // Zero-width space for empty rows
      detail_id: 0,
      release_number: 0,
      material_id: 0,
      quantity: '',
      remarks: '',
      material_code: 0,
      item_code: 0,
      uom: '',
      serial: '',
      cost: 0,
    }),
  ];

  const renderRow = (item: DetailItem, index: number) => (
    <div className="flex text-sm justify-start" key={index}>
      <p className="w-[50px]">{index + 1}</p>
      <p className="w-[240px]">{item.desc}</p>{" "}
      {/* Reduced width slightly */}
      <p className="w-[60px]">{item.quantity}</p>
      <p className="w-[60px]">{item.uom}</p>
      <p className="w-[200px]">{item.serial}</p>{" "}
      {/* Reduced width slightly */}
      <p className="w-[120px]">{''}</p>
      <p className="w-[150px]">{item.remarks}</p>{" "}
      {/* Increased width slightly */}
    </div>
  );

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div>
      <div className="flex justify-center text-2xl font-semibold">
        <p>Acknowledgement Receipt</p>
      </div>
      <div className="flex justify-center text-base">
        <p>Solutions Experts and Enablers Incorporated</p>
      </div>
      <div className="flex justify-center text-lg">
        <p>IT admin and supplies</p>
      </div>
      <div className="flex justify-center text-sm">
        <p>Tel:099212</p>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <p>Customer Name: {arState?.selectedUser.name || ''}</p>
          <div className="text-xl font-semibold">ARNo: {formatReference(arState?.reference || 0)}</div>
        </div>
        <div className="flex justify-between">
          <p>Employee No: {arState?.selectedUser.emp_no || ''}</p>
          <p>Date: 2024-2023</p>
        </div>
        <div className="flex justify-between">
          <p>Cost Center: {arState?.selectedUser.cost_code || ''}</p>
        </div>
        <div>
          <p>Company: {arState?.selectedUser.company || ''}</p>
        </div>
        <div>
          <p>Department: {arState?.selectedUser.department || ''}</p>
        </div>
      </div>

      <div className="pt-7">
        <div className="flex flex-col gap-2">
          <p>Other Remarks</p>
          <p className="pl-10 font-semibold">{arState?.remarks || ''}</p>
        </div>
        <div className="flex flex-col gap-2 pt-2">
          <p>Reason of Transfer</p>
          <p className="pl-10 font-semibold">-- {arState?.reason || ''}</p>
        </div>
      </div>

      <div className="pt-5">
        <p>
          Please acknowledge receipt of the following <br /> item/items below:
        </p>
        <div className="flex text-sm justify-start">
          <p className="w-[50px]">NO</p>
          <p className="w-[240px]">Description</p> {/* Match with renderRow */}
          <p className="w-[60px]">QTY</p> {/* Match with renderRow */}
          <p className="w-[60px]">Unit</p> {/* Match with renderRow */}
          <p className="w-[200px]">Serial Number</p>{" "}
          {/* Match with renderRow */}
          <p className="w-[120px]">Asset No</p> {/* Match with renderRow */}
          <p className="w-[150px]">Remarks</p> {/* Match with renderRow */}
        </div>
        {filledItems.map((item, index) => renderRow(item, index))}
      </div>

      <div className="pt-8">
        <div className="flex justify-between">
          <div className="flex flex-col items-start pl-5">
            <p>Returned By</p>
            <div className="border-b border-black w-[200px]"></div>
            <p className="text-sm">PRINT NAME SIGNATURE</p>
          </div>
          <div className="flex flex-col items-start pr-5">
            <p>Received By</p>
            <p className="font-bold">LEE MAJORS ANDAYA</p>
            <div className="flex gap-4 pt-2">
              <p>Time/Date:</p>
              <p>{formattedTime}</p>
              <p>{formattedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ARdownload;
