/* eslint-disable @typescript-eslint/no-unsafe-member-access */
function Downloadpdf() {
    const items = [
      {
        name: "KINGSTON 64GB USB FLASH DRIVE",
        quantity: 4,
        unit: "PC",
        serialNO: "1000232133",
        remarks: "OU",
        status: "status",
      },
      {
        name: "KINGSTON 64GB USB FLASH DRIVE",
        quantity: 4,
        unit: "PC",
        serialNO: "1000232133",
        remarks: "OU",
        status: "status",
      },
      {
        name: "KINGSTON 64GB USB FLASH DRIVE",
        quantity: 4,
        unit: "PC",
        serialNO: "1000232133",
        remarks: "OU",
        status: "status",
      },
      {
        name: "KINGSTON 64GB USB FLASH DRIVE",
        quantity: 4,
        unit: "PC",
        serialNO: "1000232133",
        remarks: "OU",
        status: "status",
      },
      {
        name: "KINGSTON 64GB USB FLASH DRIVE",
        quantity: 4,
        unit: "PC",
        serialNO: "1000232133",
        remarks: "OU",
        status: "status",
      },
    ];
  
    const filledItems = [
      ...items,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ...Array(11 - items.length).fill({
        name: "\u200B", // Zero-width space
        quantity: "",
        unit: "",
        serialNO: "",
        remarks: "",
      }),
    ];
  
    return (
      <div className="w-full">
        <div className="flex justify-center mx-auto">
          <div className="w-full">
            <div className="w-full justify-end flex px-6 mt-[-5px]">
              <p className="text-3xl font-bold">3289131</p>
            </div>
            <div className="flex text-[10px] pl-20 pt-4">
              <p className="w-[325px]">KFC Taguig Tagaytay Quezon</p>
              <p className="w-[190px]">Company ni janloyd</p>
              <p className="w-[120px]">03/16/03</p>
              <p className="">17:02</p>
            </div>
            <div className="flex text-[10px] pl-20 pt-3">
              <p className="w-[800px]">
                Blk 6 lot 11 everlasting st. Dolmar Golden Hills
              </p>
              <p>1400</p>
            </div>
            <div className="pt-7">
              <table className="w-full table-auto pt-2">
                <tbody>
                  {filledItems.map((item, index) => (
                    <tr
                      key={index}
                      className={
                        item.name === "N/A" ? "text-gray-400 text-[8px]" : ""
                      }
                    >
                      <td className="px-2 text-[8px] w-[5%]">
                        {item.name !== "N/A" ? index + 1 : ""}
                      </td>
                      <td className="pl-2 text-sm text-[7px] w-[30%]">
                        {item.name}
                      </td>
                      <td className="pl-2 text-sm text-[7px]">
                        {item.quantity}
                      </td>
                      <td className="text-sm text-[7px]">
                        {item.unit}
                      </td>
                      <td className="text-sm pl-4 text-[7px]">
                        {item.serialNO}
                      </td>
                      <td className="pl-5 text-sm text-[7px]">
                        {item.remarks}
                      </td>
                      <td className="text-sm text-[7px]">
                        {item.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-sm px-24 mt-[-8px] flex gap-32">
              <input
                type="text"
                className="bg-transparent text-[12px] border-b border-black"
              />
              <input
                type="text"
                className="bg-transparent text-[12px] border-b border-black"
              />
            </div>
            <div className="flex gap-16 pt-4">
              <div className="ml-28">
                <input
                  type="text"
                  className="bg-transparent text-[12px] w-[250px] border-b border-black"
                />
              </div>
              <div className="ml-[-50px]">
                <input
                  type="text"
                  className="bg-transparent text-[12px] border-b border-black"
                />
              </div>
              <div>
                <input
                  type="text"
                  className="bg-transparent text-[12px] border-b border-black"
                />
              </div>
            </div>
            <div className="flex justify-between pt-4">
                <div className="flex pl-6 gap-8">
                  <input type="text" className="w-[75px] text-[12px] px-1 border-black border-b"/>
                  <input type="text" className="w-[75px] text-[12px] px-2 border-black border-b"/>
                </div>
                <div className="flex pl-20 gap-8">
                  <input type="text" className="w-[75px] text-[12px] px-1 border-b border-black"/>
                  <input type="text" className="w-[75px] text-[12px] px-2 border-b border-black"/>
                </div>
                <div className="flex pl-8 gap-8">
                  <input type="text" className="w-[75px] text-[12px] px-1 border-b border-black"/>
                  <input type="text" className="w-[75px] text-[12px] px-2 border-b border-black"/>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Downloadpdf;
  