import React from "react";

interface Item {
  description: string;
  qty: string | number;
  unit: string;
  serialNo: string;
  assetNo: string;
  remarks: string;
}

function ARdownload() {
  const selectedItems: Item[] = [
    {
      description: "Asus Predator Laptop",
      qty: 4,
      unit: "OU",
      serialNo: "0999999",
      assetNo: "424242",
      remarks: "Broken Adapter",
    },
    {
      description: "Asus",
      qty: 4,
      unit: "OU",
      serialNo: "0999999",
      assetNo: "424242",
      remarks: "Broken Adapter",
    },
  ];

  const filledItems: Item[] = [
    ...selectedItems,
    ...Array(11 - selectedItems.length).fill({
      description: "\u200B", // Zero-width space for empty rows
      qty: "",
      unit: "",
      serialNo: "",
      assetNo: "",
      remarks: "",
    }),
  ];

  const renderRow = (item: Item, index: number) => (
    <div className="flex text-sm justify-center" key={index}>
      <p className="w-[50px]">{index + 1}</p>
      <p className="w-[240px]">{item.description}</p>{" "}
      {/* Reduced width slightly */}
      <p className="w-[60px]">{item.qty}</p>
      <p className="w-[60px]">{item.unit}</p>
      <p className="w-[200px]">{item.serialNo}</p>{" "}
      {/* Reduced width slightly */}
      <p className="w-[120px]">{item.assetNo}</p>
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
          <p>Customer Name: Arjay Ortega</p>
          <div className="text-xl font-semibold">ARNo: 000294</div>
        </div>
        <div className="flex justify-between">
          <p>ID No: 440042</p>
          <p>Date: 2024-2023</p>
        </div>
        <div className="flex justify-between">
          <p>Cost Center: 2727w928</p>
          <p>Time: 15:12</p>
        </div>
        <div>
          <p>Company: Moneyport Edsa</p>
        </div>
        <div>
          <p>Department: Stam 2 Express</p>
        </div>
      </div>

      <div className="pt-7">
        <div className="flex flex-col gap-2">
          <p>Other Remarks</p>
          <p className="pl-10 font-semibold">Defective Adapter</p>
        </div>
        <div className="flex flex-col gap-2 pt-2">
          <p>Reason of Transfer</p>
          <p className="pl-10 font-semibold">-- Returned OU</p>
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
