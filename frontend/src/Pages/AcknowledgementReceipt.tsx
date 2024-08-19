import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import AddAssetModal from "@/modals/AddAssetModal";
import { Plus } from "lucide-react";
import { Textarea } from "@/Components/ui/textarea";

const item = [
  { id: 1, itemNumber: "215424", itemDesc: "1", quantity: "HP Probook 8GB RAM / 512GB SSD", unit: "PC", serialNumber: "1234", remarks: "N/A" },
  { id: 2, itemNumber: "215424", itemDesc: "2", quantity: "ASUS Predator 8GB RAM / 512GB SSD", unit: "PC", serialNumber: "1234", remarks: "N/A" },
  { id: 3, itemNumber: "215424", itemDesc: "1", quantity: "HP Probook 8GB RAM / 512GB SSD", unit: "PC", serialNumber: "2134", remarks: "N/A"  },
  { id: 4, itemNumber: "215424", itemDesc: "1", quantity: "ASUS Predator 8GB RAM / 512GB SSD", unit: "PC", serialNumber: "1234", remarks: "N/A" },
  { id: 5, itemNumber: "215424", itemDesc: "1", quantity: "ASUS Predator 8GB RAM / 512GB SSD", unit: "PC", serialNumber: "2132", remarks: "N/A" },
  { id: 6, itemNumber: "123456", itemDesc: "2", quantity: "HP Probook 8GB RAM / 512GB SSD", unit: "PC", serialNumber: "4321", remarks: "N/A" },
  { id: 7, itemNumber: "123456", itemDesc: "2", quantity: "HP Probook 8GB RAM / 512GB SSD", unit: "PC", serialNumber: "2412", remarks: "N/A"   },
  { id: 8, itemNumber: "123456", itemDesc: "2", quantity: "HP Probook 8GB RAM / 512GB SSD", unit: "PC", serialNumber: "2342", remarks: "N/A" },
  { id: 9, itemNumber: "123456", itemDesc: "2", quantity: "HP Probook 8GB RAM / 512GB SSD", unit: "PC", serialNumber: "2134", remarks: "N/A" },
  { id: 10, itemNumber: "123456", itemDesc: "3", quantity: "HP Probook 8GB RAM / 512GB SSD", unit: "PC", serialNumber: "2134", remarks: "N/A" },
  { id: 11, itemNumber: "123456", itemDesc: "1", quantity: "HP Probook 8GB RAM / 512GB SSD", unit: "PC", serialNumber: "2341", remarks: "N/A" },
  { id: 12, itemNumber: "754211", itemDesc: "1", quantity: "HP Probook 8GB RAM / 512GB SSD", unit: "PC", serialNumber: "5432", remarks: "N/A" },
  { id: 13, itemNumber: "754211", itemDesc: "2", quantity: "HP Probook 8GB RAM / 512GB SSD", unit: "PC", serialNumber: "4213", remarks: "N/A" },
  { id: 14, itemNumber: "754211", itemDesc: "1", quantity: "HP Probook 8GB RAM / 512GB SSD", unit: "PC", serialNumber: "4467", remarks: "N/A" },
  { id: 15, itemNumber: "754211", itemDesc: "1", quantity: "HP Probook 8GB RAM / 512GB SSD", unit: "PC", serialNumber: "6743", remarks: "N/A" },
];

function AcknowledgementReceipt() {
  const [openModal, setOpenModal] = useState(false);

  const headerHeight = 72;

  const getItemsPerPage = (height: number): number => {
    const availableHeight = height - headerHeight;
    if (availableHeight < 500) return 15;
    return 15;
};

  const [currentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage(window.innerHeight));

  useEffect(() => {
    const handleResize = () => {
        setItemsPerPage(getItemsPerPage(window.innerHeight));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
}, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem= item.slice(indexOfFirstItem, indexOfLastItem);
  
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex flex-col w-full">
          <h1 className="text-2xl font-bold">Return</h1>
          <p className="text-sm font-semibold text-[#9E9E9E]">Order / Return</p>
        </div>
        <div className="flex w-full justify-between gap-8 2xl:gap-20 pt-10">
          <div className="flex flex-row gap-6 w-2/3">
            <div className="flex flex-col w-2/3 space-y-3">
                <div className="flex space-x-5">
                  <div className="space-y-2 w-1/2">
                    <p className="text-sm">DR Number</p>
                    <Input className="focus:border-none" />
                  </div>
                  <div className="space-y-2 w-1/2">
                    <p className="text-sm">Tagged Item As</p>
                    <Input className="focus:border-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm">Reason Transfer</p>
                  <Input className="focus:border-none" />
                </div> 
            </div>
            <div className="flex flex-col w-2/5">
              <p className="text-sm">Remarks</p>
              <Textarea className="focus:border-none max-h-28 min-h-28" />
            </div>
          </div>
          <div className="flex justify-end items-end">
            <Button className="bg-hoverCream text-fontHeading border hover:text-white font-semibold" onClick={() => setOpenModal(true)}><Plus size={20}/><span className="text-sm">Add Asset</span></Button>
          </div>
        </div>
        <div className="overflow-y-auto mt-5" style={{ maxHeight: `calc(100vh - ${headerHeight + 270}px)` }}>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Item Number</TableHead>
                        <TableHead>Item Description</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Serial Number</TableHead>
                        <TableHead>Remarks</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentItem.map(item => (
                        <TableRow className="h-8" key={item.id}>
                            <TableCell >{item.itemNumber}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.itemDesc}</TableCell>
                            <TableCell>{item.unit}</TableCell>
                            <TableCell>{item.serialNumber}</TableCell>
                            <TableCell>{item.remarks}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        <div className="flex items-end mt-5">
          <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white">Print</Button>
        </div>
      </div>
  
      <AddAssetModal open={openModal} onClose={() => setOpenModal(false)}/>
    </>
  );
}

export default AcknowledgementReceipt;
