/* eslint-disable @typescript-eslint/no-unsafe-member-access */
function Downloadpdf() {
  const items = [
    {
      name: "KINGSTON 64GB USB FLASH DRIVE",
      quantity: 4,
      unit: "PC",
      status: "NA",
      code: "OU",
    },
    {
      name: "KINGSTON 64GB USB FLASH DRIVE",
      quantity: 4,
      unit: "PC",
      status: "NA",
      code: "OU",
    },
    {
      name: "KINGSTON 64GB USB FLASH DRIVE",
      quantity: 4,
      unit: "PC",
      status: "NA",
      code: "OU",
    },
    {
      name: "KINGSTON 64GB USB FLASH DRIVE",
      quantity: 4,
      unit: "PC",
      status: "NA",
      code: "OU",
    },
    {
      name: "KINGSTON 64GB USB FLASH DRIVE",
      quantity: 4,
      unit: "PC",
      status: "NA",
      code: "OU",
    },
  ];

  const filledItems = [
    ...items,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ...Array(11 - items.length).fill({
      name: "N/A",
      quantity: "",
      unit: "",
      status: "",
      code: "",
    }),
  ];

  return (
    <div className="w-full">
      <div className="flex justify-center mx-auto">
        <div className="w-full">
          <div className="w-full justify-end flex px-6">
            <p className="text-3xl font-bold">3289131</p>
          </div>
          <div className="flex text-[10px] pl-20 pt-4 bg-red-100">
            <p className="w-[325px] bg-blue-200">KFC Taguig Tagaytay Quezon</p>
            <p className="w-[190px]">Company ni janloyd</p>
            <p className="w-[120px]">03/16/03</p>
            <p className="">17:02</p>
          </div>
          <div className="flex text-[10px] pl-16 pt-3">
            <p className="w-[800px]">
              Blk 6 lot 11 everlasting st. Dolmar Golden Hills
            </p>
            <p>100232123</p>
          </div>
          <div className="pt-6 text-[8px]">
            <table className="w-full table-auto border-none">
              <tbody>
                {filledItems.map((item, index) => (
                  <tr
                    key={index}
                    className={
                      item.name === "N/A" ? "text-gray-400 text-[8px]" : ""
                    }
                  >
                    <td className="border-none px-4 text-[8px]">
                      {item.name !== "N/A" ? index + 1 : ""}
                    </td>
                    <td className="border-none px-4 text-sm text-[8px]">
                      {item.name}
                    </td>
                    <td className="border-none px-4 text-sm text-[8px]">
                      {item.quantity}
                    </td>
                    <td className="border-none px-4 text-sm text-[8px]">
                      {item.unit}
                    </td>
                    <td className="border-none px-4 text-sm text-[8px]">
                      {item.status}
                    </td>
                    <td className="border-none px-4 text-sm text-[8px]">
                      {item.code}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-4 text-sm px-10">
            <p>Guard Release:</p>
            <input
              type="text"
              className="bg-transparent border-b border-black"
            />
          </div>
          <div className="flex text-sm px-10 justify-between">
            <div className="flex">
              <div className="flex gap-4 text-sm">
                <p>Time:</p>
                <input
                  type="text"
                  className="bg-transparent border-b border-black w-24"
                />
              </div>
              <div className="flex gap-4 text-sm">
                <p>Date:</p>
                <input
                  type="text"
                  className="bg-transparent border-b border-black w-24"
                />
              </div>
            </div>
            <div className="flex gap-4 text-sm">
              <p className="text-sm">comment</p>
              <p>DR#444527</p>
            </div>
          </div>
          <div className="px-10 pt-10 flex justify-between text-sm">
            <p className="text-lg">ALFRED</p>
            <p className="font-bold">LLOYD LEVIN REI S. PANGAN</p>
          </div>
          <div className="flex gap-4 px-10 pt-10 text-sm">
            <p>2024-10-10</p>
            <p>10:51</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Downloadpdf;
