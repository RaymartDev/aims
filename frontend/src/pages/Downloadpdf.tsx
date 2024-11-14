/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Item from "@/interface/drReleaseItem";
import { formatReference } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface ReleaseState {
  reference: number;
  selectedItems: Item[];
  selectedUser: {
    emp_no: string,
    cost_code: string;
    name: string;
    company: string;
  }
}

function Downloadpdf() {

  const [drState, setDRState] = useState<ReleaseState | null>(null);

  useEffect(() => {
    // Retrieve state from localStorage
    const storedState = localStorage.getItem('drState');
    if (storedState) {
      setDRState(JSON.parse(storedState));
    }
  }, []);
  const navigate = useNavigate();
  if (!drState) {
    navigate('/');
  }
  
  const { selectedItems, requestorName, code } = { selectedItems: drState?.selectedItems || [], requestorName: drState?.selectedUser.name || '', code: "" };
  
    const filledItems = [
      ...selectedItems,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ...Array(11 - selectedItems.length).fill({
        name: "\u200B", // Zero-width space
        quantity: "",
        uom: "",
        serial_number: "",
        remarks: "",
      }),
    ];

    const currentDate = new Date();

    const formattedDate = currentDate.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit"
    });

    const formattedTime = currentDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    })
  
    return (
      <div className="w-full">
        <div className="flex justify-center mx-auto">
          <div className="w-full">
            <div className="w-full justify-end flex px-6 mt-[-5px]">
              <p className="text-3xl font-bold">{formatReference(Number(drState?.reference || 0))}</p>
            </div>
            <div className="flex text-[10px] pl-20 pt-4">
              <p className="w-[325px]">{requestorName}</p>
              <p className="w-[190px]">{drState?.selectedUser.company || ''}</p>
              <p className="w-[120px]">{formattedDate}</p>
              <p className="">{formattedTime}</p>
            </div>
            <div className="flex text-[10px] pl-20 pt-3">
              <p className="w-[800px]">
                ADDRESS PART
              </p>
              <p>{code}</p>
            </div>
            <div className="pt-7">
              <table className="w-full table-auto pt-2">
                <tbody>
                  {filledItems.map((item, index) => (
                    <tr
                      key={index}
                      className={
                        item.item_description === "N/A" ? "text-gray-400 text-[8px]" : ""
                      }
                    >
                      <td className="px-2 text-[8px] w-[5%]">
                        {item.item_description !== "N/A" ? index + 1 : ""}
                      </td>
                      <td className="pl-2 text-sm text-[7px] w-[30%]">
                        {item.item_description}
                      </td>
                      <td className="pl-2 text-sm text-[7px]">
                        {item.item_description ? item.quantity || 1 : ''}
                      </td>
                      <td className="text-sm text-[7px]">
                        {item.uom}
                      </td>
                      <td className="text-sm pl-4 text-[7px]">
                        {item.item_code}
                      </td>
                      <td className="pl-5 text-sm text-[7px]">
                        {item.remarks}
                      </td>
                      <td className="text-sm text-[7px]">
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
  