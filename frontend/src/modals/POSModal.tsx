import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Plus, Search, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import AssetEntryModal from "./AssetEntryModal";

interface POSModalProps {
    open: boolean;
    onClose: () => void;
}

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
    { id: 16, itemNumber: "754211", itemDesc: "1", quantity: "HP Probook 8GB RAM / 512GB SSD", unit: "PC", serialNumber: "0971", remarks: "N/A" },
    { id: 17, itemNumber: "754211", itemDesc: "1", quantity: "HP Probook 8GB RAM / 512GB SSD", unit: "PC", serialNumber: "6839", remarks: "N/A" },
    { id: 18, itemNumber: "754211", itemDesc: "1", quantity: "HP Probook 8GB RAM / 512GB SSD", unit: "PC", serialNumber: "43345", remarks: "N/A"   },
    { id: 19, itemNumber: "754211", itemDesc: "1", quantity: "HP Probook 8GB RAM / 512GB SSD", unit: "PC", serialNumber: "324234", remarks: "N/A" },
    { id: 20, itemNumber: "754211", itemDesc: "1", quantity: "HP Probook 8GB RAM / 512GB SSD", unit: "PC", serialNumber: "2342", remarks: "N/A" },
];


function POSModal({ open, onClose }: POSModalProps) {
    const [openAssetModal, setOpenAssetModal] = useState(false);

    const headerHeight = 72;

    const getItemsPerPage = (height: number): number => {
        const availableHeight = height - headerHeight;
        if (availableHeight < 500) return 10;
        return 10;
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

    if (!open) return null;

    return(
        <>
            <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4">
                <div className="flex flex-col w-3/4 bg-slate-50 rounded-2xl p-6">
                    <div className="flex items-center justify-between w-full border-b-2 border-black">
                        <h1 className="font-extrabold text-xl">Point Of Sales</h1>
                        <Button className="text-black bg-transparent hover:bg-transparent p-0" onClick={onClose}><X size={30}/></Button>
                    </div>
                    <div className="flex flex-col justify-start mt-5 space-y-2">
                        <div className="flex flex-row w-full space-x-2 justify-between">
                            <div className="space-y-1 w-1/4">
                                <p className="text-sm text-[#697386]">Invoice Number</p>
                                <Input className="focus:border-none border-black"></Input>
                            </div>
                            <div className="space-x-2 flex items-center w-2/3">
                                <p className="text-xl text-fontHeading font-bold">Amount</p>
                                <Input className="focus:border-none border-black h-12" disabled></Input>
                            </div>
                        </div>
                        <div className="flex flex-row w-full space-x-2">
                            <div className="space-y-1 w-1/3">
                                <p className="text-sm text-[#697386]">ProductCD / Barcode</p>
                                <Input className="focus:border-none border-black"></Input>
                            </div>
                            <div className="space-y-1 w-2/3 ">
                                <p className="text-sm text-[#697386]">Description</p>
                                <Input className="focus:border-none border-black"></Input>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-[#697386]">Unit Price</p>
                                <Input className="focus:border-none border-black" ></Input>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-[#697386]">Quantity</p>
                                <Input className="focus:border-none border-black"></Input>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-[#697386]">Sub-total</p>
                                <Input className="focus:border-none border-black"></Input>
                            </div>
                            <div className="space-y-1 w-1/3">
                                <p className="text-sm text-[#697386]">Material Type</p>
                                <Input className="focus:border-none border-black"></Input>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-end mt-5">
                        <Button className="bg-hoverCream text-fontHeading border hover:text-white">
                            <Plus size={20}/><span className="text-sm">Add Item</span>
                        </Button>
                    </div>
                    <div className="flex flex-row w-full mt-5">
                        <div className="overflow-y-auto w-3/4" style={{ maxHeight: `calc(100vh - ${headerHeight + 270}px)` }}>
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
                                        <TableRow key={item.id}>
                                            <TableCell>{item.itemNumber}</TableCell>
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
                        <div className="w-1/4 border-2">
                            <div className="p-2">
                                <div className="relative w-full">
                                    <Input type="search" placeholder="Search..." className="pl-12 border-2 focus:border-none"/>
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                                <div>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Item</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {currentItem.map(item => (
                                                <TableRow key={item.id}>
                                                    <TableCell>{item.quantity}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody> 
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                        
                    <div className="w-full mt-5 flex justify-between">
                        <div className="space-x-2 flex items-end">
                            <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white" onClick={() => setOpenAssetModal(true)}>Asset</Button>
                            <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white">Print</Button>
                            <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white" onClick={onClose}>Cancel</Button>
                        </div>
                        <div className="w-1/4">
                            <div className="border p-2 border-black">
                                <div className="flex flex-row items-center space-x-1">
                                    <h1 className="text-sm">Total Amount:</h1>
                                    <h1>40000 PHP</h1>
                                </div>
                                <div className="flex flex-row items-center space-x-1">
                                    <h1 className="text-sm">Cash Tentered:</h1>
                                </div>
                                <div className="flex flex-row items-center space-x-1">
                                    <h1 className="text-sm">Change:</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AssetEntryModal open={openAssetModal} onClose={() => setOpenAssetModal(false)}/>
        </>
    );
}

export default POSModal