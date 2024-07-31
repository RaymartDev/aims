import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Plus, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";

const stores = [
    { id: 1, companyName: "Leansel Nico", costCenter: "IT Department", storeName: "503604218", address: "IT Asset", status: "Registered" },
    { id: 2, companyName: "100230457", costCenter: "Jane Doe", storeName: "Finance", address: "503604219", status: "Registered" },
    { id: 3, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered"  },
    { id: 4, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 5, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 6, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 7, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered"   },
    { id: 8, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 9, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 10, companyName: "100230458", costCenter: "kMAOTE", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 11, companyName: "100230458", costCenter: "SABAW", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 12, companyName: "Leansel Nico", costCenter: "IT Department", storeName: "503604218", address: "IT Asset", status: "Registered" },
    { id: 13, companyName: "100230457", costCenter: "Jane Doe", storeName: "Finance", address: "503604219", status: "Registered" },
    { id: 14, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 15, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 16, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 17, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 18, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered"   },
    { id: 19, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered" },
    { id: 20, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220", status: "Registered" },
];


function POSModal() {
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


    const indexOfLastStore = currentPage * itemsPerPage;
    const indexOfFirstStore = indexOfLastStore - itemsPerPage;
    const currentStore= stores.slice(indexOfFirstStore, indexOfLastStore);

    return(
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4">
            <div className="flex flex-col w-3/4 h-5/6 bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between w-full border-b-2 border-black">
                    <h1 className="font-extrabold text-xl">Supplier Company Details</h1>
                    <Button className="text-black bg-transparent hover:bg-transparent p-0"><X size={30}/></Button>
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
                <div className="mt-5 overflow-y-auto" style={{ maxHeight: `calc(100vh - ${headerHeight + 270}px)` }}>
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
                            {currentStore.map(stores => (
                                <TableRow key={stores.id}>
                                    <TableCell>{stores.companyName}</TableCell>
                                    <TableCell>{stores.storeName}</TableCell>
                                    <TableCell>{stores.costCenter}</TableCell>
                                    <TableCell>{stores.address}</TableCell>
                                    <TableCell>{stores.status}</TableCell>
                                    <TableCell>{stores.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>      
                <div className="w-full mt-5 flex justify-between">
                    <div className="space-x-2 flex items-end">
                        <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white">Asset</Button>
                        <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white">Print</Button>
                        <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white">Cancel</Button>
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
    );
}

export default POSModal