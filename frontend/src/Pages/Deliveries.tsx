import { useEffect, useState } from "react";
import Layout from "@/Components/appLayout/Layout";
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button";
import { Plus, Search } from "lucide-react";
import { Label } from "@/Components/ui/label"
import { Textarea } from "@/Components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import SelectMaterialModal from "@/modals/SelectMaterialModal";

const deliveries = [
    { id: 1, companyName: "Leansel Nico", costCenter: "IT Department", storeName: "503604218", address: "IT Asset" },
    { id: 2, companyName: "100230457", costCenter: "Jane Doe", storeName: "Finance", address: "503604219" },
    { id: 3, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220" },
    { id: 4, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220" },
    { id: 5, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220" },
    { id: 6, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220" },
    { id: 7, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220",  },
    { id: 8, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220" },
    { id: 9, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220" },
    { id: 10, companyName: "100230458", costCenter: "kMAOTE", storeName: "Marketing", address: "503604220" },
    { id: 11, companyName: "100230458", costCenter: "SABAW", storeName: "Marketing", address: "503604220" },
    { id: 1, companyName: "Leansel Nico", costCenter: "IT Department", storeName: "503604218", address: "IT Asset" },
    { id: 2, companyName: "100230457", costCenter: "Jane Doe", storeName: "Finance", address: "503604219" },
    { id: 3, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220" },
    { id: 4, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220" },
    { id: 5, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220" },
    { id: 6, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220" },
    { id: 7, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220",  },
    { id: 8, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220" },
    { id: 9, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220" },
    { id: 10, companyName: "100230458", costCenter: "kMAOTE", storeName: "Marketing", address: "503604220" },
    { id: 11, companyName: "100230458", costCenter: "SABAW", storeName: "Marketing", address: "503604220" },
    { id: 1, companyName: "Leansel Nico", costCenter: "IT Department", storeName: "503604218", address: "IT Asset" },
    { id: 2, companyName: "100230457", costCenter: "Jane Doe", storeName: "Finance", address: "503604219" },
    { id: 3, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220" },
    { id: 4, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220" },
    { id: 5, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220" },
    { id: 6, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220" },
    { id: 7, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220",  },
    { id: 8, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220" },
    { id: 9, companyName: "100230458", costCenter: "John Smith", storeName: "Marketing", address: "503604220" },
    { id: 10, companyName: "100230458", costCenter: "kMAOTE", storeName: "Marketing", address: "503604220" },
    { id: 11, companyName: "100230458", costCenter: "SABAW", storeName: "Marketing", address: "503604220" },
];

function Deliveries() {
    const [openModal, setOpenModal] = useState(false);

    const headerHeight = 72;
    const itemHeight = 50;

    const getItemsPerPage = (height: number): number => {
        const availableHeight = height - headerHeight;
        if (availableHeight < 0) return 0;
        return Math.floor(availableHeight / itemHeight);
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

    const indexOfLastDeliveries = currentPage * itemsPerPage;
    const indexOfFirstDeliveries = indexOfLastDeliveries - itemsPerPage;
    const currentDeliveries= deliveries.slice(indexOfFirstDeliveries, indexOfLastDeliveries);

    return(
        <Layout>
            <div className="flex flex-col h-full">
                <div className="flex flex-row justify-between w-full">
                    <div>
                        <h1 className="text-2xl font-bold">Deliveries</h1>
                        <p className="text-sm font-semibold text-[#9E9E9E]">Inventory / Deliveries</p>
                    </div>
                    <Button className="bg-hoverCream text-fontHeading font-semibold" onClick={() => setOpenModal(true)}>
                        <Plus size={20}/><span className="text-sm">Add Delivery</span>
                    </Button>
                </div>
                <div className="mt-6 flex-grow overflow-y-auto pl-2">
                    <div className="flex space-x-5">
                        <div>
                            <Label htmlFor="supplier">Supplier Name</Label>
                            <Input id="supplier" type="Text" placeholder="Supplier Name" className="w-80 focus:border-none"/>
                        </div>
                        <div>
                            <Label htmlFor="DR">Delivery Reciept No.</Label>
                            <Input id="DR" type="Number" placeholder="Delivery Reciept No." className="w-80 focus:border-none"/>
                        </div>
                        <div>
                            <Label htmlFor="PO">Product Order No.</Label>
                            <Input id="PO" type="Number" placeholder="Product Order No." className="w-80 focus:border-none"/>
                        </div>
                        
                    </div>
                    <div className="flex space-x-5 mt-5">
                        <div>
                            <Label htmlFor="PR">PR No.</Label>
                            <Input id="PR" type="Number" placeholder="PR No." className="w-80 focus:border-none"/>
                        </div>
                        <div>
                            <Label htmlFor="Capex">Capex     No.</Label>
                            <Input id="Capex" type="Number" placeholder="Capex No." className="w-80 focus:border-none"/>
                        </div>
                        <div>
                            <Label htmlFor="date">Date Entry</Label>
                            <Input id="date" type="Date" placeholder="Date" className="w-80 focus:border-none"/>
                        </div>
                    </div>
                    <div className="flex space-x-5 mt-5">
                        <div>
                            <Label htmlFor="desc">Description</Label>
                            <Textarea id="desc" placeholder="Description" className="w-80 focus:border-none"/>
                        </div>
                        <div>
                            <Label htmlFor="itemCode">Item Code</Label>
                            <Input id="itemCode" type="Number" placeholder="Item Code" className="w-80 focus:border-none"/>
                        </div>
                        <div>
                            <Label htmlFor="Mats">Material Code</Label>
                            <Input id="Mats" type="Number" placeholder="Material Code" className="w-80 focus:border-none"/>
                        </div>
                    </div>
                    <div className="flex space-x-5 mt-5">
                        <div>
                            <Label htmlFor="unit">Unit</Label>
                            <Input id="unit" type="Number" placeholder="Unit" className="w-40 focus:border-none"/>
                        </div>
                        <div>
                            <Label htmlFor="matType">Material Type</Label>
                            <Input id="matType" type="Text" placeholder="Material Type" className="w-60 focus:border-none"/>
                        </div>
                        <div>
                            <Label htmlFor="remarks">Remarks</Label>
                            <Input id="remarks" type="Text" placeholder="Remarks" className="w-72 focus:border-none"/>
                        </div>
                        <div>
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input id="quantity" type="Text" placeholder="Quantity" className="w-64 focus:border-none"/>
                        </div>
                    </div>
                    <div className="flex space-x-5 mt-5">
                        <div>
                            <Label htmlFor="request">Requestor</Label>
                            <Input id="request" type="Text" placeholder="Requestor" className="w-96 focus:border-none"/>
                        </div>
                        <div>
                            <Label htmlFor="user">User</Label>
                            <Input id="user" type="Text" placeholder="User" className="w-96 focus:border-none"/>
                        </div>
                        <div>
                            <Label htmlFor="warranty">End Warranty</Label>
                            <Input id="warranty" type="Date" className="w-48 focus:border-none"/>
                        </div>
                    </div>

                    <div className="mt-8 border border-gray-700 rounded-lg p-4">
                        <p>Destination/Transfer to</p>

                        <div>
                            <div className="flex space-x-5 mt-5">
                                <div>
                                    <Label htmlFor="company">Company</Label>
                                    <Input id="company" type="Text" placeholder="Company" className="w-80 focus:border-none"/>
                                </div>
                                <div>
                                    <Label htmlFor="storeNo">Store Number</Label>
                                    <Input id="storeNo" type="Number" placeholder="Store Number" className="w-80 focus:border-none"/>
                                </div>
                                <div>
                                    <Label htmlFor="costCenter">Cost Center</Label>
                                    <Input id="costCenter" type="Number" placeholder="Cost Center" className="w-80 focus:border-none"/>
                                </div>
                            </div>
                            <div className="flex space-x-5 mt-5">
                                <div>
                                    <Label htmlFor="address">Address</Label>
                                    <Textarea id="address" placeholder="Address" className="w-96 focus:border-none"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-5 mt-4">
                        <Button className="bg-hoverCream text-fontHeading font-semibold w-32">Cancel</Button>
                        <Button className="bg-hoverCream text-fontHeading font-semibold w-32">Save</Button>
                    </div>
                    <div className="mt-4 space-y-2">
                        <div className="border-2 rounded-lg flex p-2 items-center space-x-3 ">
                            <h1 className="text-sm">Description</h1>
                            <div className="relative w-1/3">
                                <Input type="search" placeholder="Search..." className="pl-12 border-2 focus:border-none"/>
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>   
                        </div>
                        <div className="border-2 rounded-lg">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>DR No.</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Serial Number</TableHead>
                                        <TableHead>Asset Number</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Unit</TableHead>
                                        <TableHead>Remarks</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentDeliveries.map(deliveries => (
                                        <TableRow key={deliveries.id}>
                                            <TableCell>{deliveries.companyName}</TableCell>
                                            <TableCell>{deliveries.costCenter}</TableCell>
                                            <TableCell>{deliveries.storeName}</TableCell>
                                            <TableCell>{deliveries.address}</TableCell>
                                            <TableCell>{deliveries.address}</TableCell>
                                            <TableCell>{deliveries.address}</TableCell>
                                            <TableCell>{deliveries.address}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
            <SelectMaterialModal open={openModal} onClose={() => setOpenModal(false)}/>
        </Layout>
    );
}

export default Deliveries