import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import SelectItemModal from "@/modals/SelectItemModal";
import AssetEntryModal from "@/modals/AssetEntryModal";
import { Plus, Trash } from "lucide-react";

const itemList = [
  { id: 1, itemNumber: "215424", itemDesc: "HP Probook 8GB RAM / 512GB SSD", quantity: "", unit: "PC", serialNumber: "1234", remarks: "N/A" },
  { id: 2, itemNumber: "215425", itemDesc: "ASUS ROG 16GB RAM / 1TB SSD", quantity: "", unit: "PC", serialNumber: "5678", remarks: "New" },
  { id: 3, itemNumber: "215426", itemDesc: "Dell XPS 13 8GB RAM / 256GB SSD", quantity: "", unit: "PC", serialNumber: "9101", remarks: "Refurbished" },
  { id: 4, itemNumber: "215427", itemDesc: "Lenovo ThinkPad 16GB RAM / 512GB SSD", quantity: "", unit: "PC", serialNumber: "1121", remarks: "In Use" },
  { id: 5, itemNumber: "215428", itemDesc: "Apple MacBook Pro 16GB RAM / 512GB SSD", quantity: "", unit: "PC", serialNumber: "3141", remarks: "Damaged" },
  { id: 6, itemNumber: "215429", itemDesc: "HP EliteBook 8GB RAM / 1TB SSD", quantity: "", unit: "PC", serialNumber: "5161", remarks: "Under Repair" },
  { id: 7, itemNumber: "215430", itemDesc: "Microsoft Surface Pro 4GB RAM / 128GB SSD", quantity: "", unit: "PC", serialNumber: "7181", remarks: "Returned" },
  { id: 8, itemNumber: "215431", itemDesc: "Acer Aspire 8GB RAM / 256GB SSD", quantity: "", unit: "PC", serialNumber: "9202", remarks: "New" },
  { id: 9, itemNumber: "215432", itemDesc: "Samsung Galaxy Book 12GB RAM / 512GB SSD", quantity: "", unit: "PC", serialNumber: "1232", remarks: "N/A" },
  { id: 10, itemNumber: "215433", itemDesc: "Razer Blade 16GB RAM / 1TB SSD", quantity: "", unit: "PC", serialNumber: "3243", remarks: "Used" },
  { id: 11, itemNumber: "215434", itemDesc: "MSI GF63 8GB RAM / 512GB SSD", quantity: "", unit: "PC", serialNumber: "4254", remarks: "New" },
  { id: 12, itemNumber: "215435", itemDesc: "HP Pavilion 8GB RAM / 1TB SSD", quantity: "", unit: "PC", serialNumber: "5265", remarks: "In Use" },
  { id: 13, itemNumber: "215436", itemDesc: "Toshiba Tecra 4GB RAM / 256GB SSD", quantity: "", unit: "PC", serialNumber: "6276", remarks: "Returned" },
  { id: 14, itemNumber: "215437", itemDesc: "Sony Vaio 8GB RAM / 512GB SSD", quantity: "", unit: "PC", serialNumber: "7287", remarks: "Refurbished" },
  { id: 15, itemNumber: "215438", itemDesc: "Huawei MateBook 16GB RAM / 1TB SSD", quantity: "", unit: "PC", serialNumber: "8298", remarks: "New" },
];


function DeliveryReceipt() {
  const [openModal, setOpenModal] = useState(false);
  const [openAssetModal, setOpenAssetModal] = useState(false) 

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
  const currentItem= itemList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex flex-col w-full">
          <h1 className="text-2xl font-bold">Release</h1>
          <p className="text-sm font-semibold text-[#9E9E9E]">Order / Release</p>
        </div>
        <div className="flex w-full justify-between gap-8 2xl:gap-20 pt-10">
          <div className="flex gap-6">
            <div className="flex flex-col justify-end">
              <p className="text-sm">Reference Number</p>
              <Input className="focus:border-none w-64" />
            </div>
            <div className="flex flex-col justify-end">
              <p className="text-sm">Requestor Name</p>
              <Input className="focus:border-none w-64" />
            </div>
            <div className="flex flex-col justify-end">
              <p className="text-sm">Cost Center Code</p>
              <Input className="focus:border-none w-64" />
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-10">
            <Button className="bg-hoverCream text-fontHeading border hover:text-white font-semibold w-36"><Plus size={20}/><span className="text-sm">Scan Item</span></Button>
            <Button className="bg-hoverCream text-fontHeading border hover:text-white font-semibold w-36" onClick={() => setOpenModal(true)}><Plus size={20}/><span className="text-sm">Add Item</span></Button>
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
                        <TableHead><span className="sr-only">Actions</span></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentItem.map(itemList => (
                        <TableRow className="h-8" key={itemList.id}>
                            <TableCell >{itemList.itemNumber}</TableCell>
                            <TableCell>{itemList.itemDesc}</TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                className="w-16 focus:border-none h-7"
                              />
                            </TableCell>
                            <TableCell>{itemList.unit}</TableCell>
                            <TableCell>{itemList.serialNumber}</TableCell>
                            <TableCell>{itemList.remarks}</TableCell>
                            <TableCell><Button className="bg-white text-red-500 hover:text-white"><Trash/></Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        <div className="space-x-2 flex items-end mt-5">
          <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white w-36" onClick={() => setOpenAssetModal(true)}>Asset</Button>
          <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white w-36">Print</Button>
        </div>
      </div>
      
      <SelectItemModal open={openModal} onClose={() => setOpenModal(false)}/>
      <AssetEntryModal open={openAssetModal} onClose={() => setOpenAssetModal(false)}/>
    </>
  );
}

export default DeliveryReceipt;
