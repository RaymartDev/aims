import { useEffect, useState } from "react";
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button";
import { Plus, Search } from "lucide-react";
import { Label } from "@/Components/ui/label"
import { Textarea } from "@/Components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import SelectMaterialModal from "@/modals/SelectMaterialModal";

const deliveries = [
    { id: 1, drNumber: "Leansel Nico", desc: "IT Department", serialNumber: "503604218", assetNumber: "IT Asset", quantity: "Registered", unit: "OU", remarks: "OU KFC - BACLARAN" },
    { id: 2, drNumber: "100230457", desc: "Jane Doe", serialNumber: "Finance", assetNumber: "503604219", quantity: "Registered", unit: "OU", remarks: "OU KFC - BACLARAN" },
    { id: 3, drNumber: "100230458", desc: "John Smith", serialNumber: "Marketing", assetNumber: "503604220", quantity: "Registered", unit: "OU", remarks: "OU KFC - BACLARAN"  },
    { id: 4, drNumber: "100230458", desc: "John Smith", serialNumber: "Marketing", assetNumber: "503604220", quantity: "Registered", unit: "OU", remarks: "OU KFC - BACLARAN" },
    { id: 5, drNumber: "100230458", desc: "John Smith", serialNumber: "Marketing", assetNumber: "503604220", quantity: "Registered", unit: "OU", remarks: "OU KFC - BACLARAN" },
    { id: 6, drNumber: "100230458", desc: "John Smith", serialNumber: "Marketing", assetNumber: "503604220", quantity: "Registered", unit: "OU", remarks: "OU KFC - BACLARAN" },
    { id: 7, drNumber: "100230458", desc: "John Smith", serialNumber: "Marketing", assetNumber: "503604220", quantity: "Registered", unit: "OU", remarks: "OU KFC - BACLARAN" },
    { id: 8, drNumber: "100230458", desc: "John Smith", serialNumber: "Marketing", assetNumber: "503604220", quantity: "Registered", unit: "OU", remarks: "OU KFC - BACLARAN" },
    { id: 9, drNumber: "100230458", desc: "John Smith", serialNumber: "Marketing", assetNumber: "503604220", quantity: "Registered", unit: "OU", remarks: "OU KFC - BACLARAN" },
    { id: 10, drNumber: "100230458", desc: "kMAOTE", serialNumber: "Marketing", assetNumber: "503604220", quantity: "Registered", unit: "OU", remarks: "OU KFC - BACLARAN" },
    { id: 11, drNumber: "100230458", desc: "SABAW", serialNumber: "Marketing", assetNumber: "503604220", quantity: "Registered", unit: "OU", remarks: "OU KFC - BACLARAN" },
    { id: 12, drNumber: "Leansel Nico", desc: "IT Department", serialNumber: "503604218", assetNumber: "IT Asset", quantity: "Registered", unit: "OU", remarks: "OU KFC - BACLARAN" },
    { id: 13, drNumber: "100230457", desc: "Jane Doe", serialNumber: "Finance", assetNumber: "503604219", quantity: "Registered", unit: "OU", remarks: "OU KFC - BACLARAN" },
    { id: 14, drNumber: "100230458", desc: "John Smith", serialNumber: "Marketing", assetNumber: "503604220", quantity: "Registered", unit: "OU", remarks: "OU KFC - BACLARAN" },
    { id: 15, drNumber: "100230458", desc: "John Smith", serialNumber: "Marketing", assetNumber: "503604220", quantity: "Registered", unit: "OU", remarks: "OU KFC - BACLARAN" },
    { id: 16, drNumber: "100230458", desc: "John Smith", serialNumber: "Marketing", assetNumber: "503604220", quantity: "Registered", unit: "OU", remarks: "OU KFC - BACLARAN" },
    { id: 17, drNumber: "100230458", desc: "John Smith", serialNumber: "Marketing", assetNumber: "503604220", quantity: "Registered", unit: "OU", remarks: "OU KFC - BACLARAN" },
    { id: 18, drNumber: "100230458", desc: "John Smith", serialNumber: "Marketing", assetNumber: "503604220", quantity: "Registered", unit: "OU", remarks: "OU KFC - BACLARAN" },
    { id: 19, drNumber: "100230458", desc: "John Smith", serialNumber: "Marketing", assetNumber: "503604220", quantity: "Registered", unit: "OU", remarks: "OU KFC - BACLARAN" },
    { id: 20, drNumber: "100230458", desc: "John Smith", serialNumber: "Marketing", assetNumber: "503604220", quantity: "Registered", unit: "OU", remarks: "OU KFC - BACLARAN" },
];

function Deliveries() {
    const [openModal, setOpenModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

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

    const filteredDeliveries = deliveries.filter(deliveries =>
        deliveries.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastDeliveries = currentPage * itemsPerPage;
    const indexOfFirstDeliveries = indexOfLastDeliveries - itemsPerPage;
    const currentDeliveries= filteredDeliveries.slice(indexOfFirstDeliveries, indexOfLastDeliveries);

    return(
        <>
            <div className="flex flex-col h-full">
                <div className="flex flex-row justify-between w-full">
                    <div>
                        <h1 className="text-2xl font-bold">Deliveries</h1>
                        <p className="text-sm font-semibold text-[#9E9E9E]">Inventory / Deliveries</p>
                    </div>
                    <Button className="bg-hoverCream text-fontHeading hover:text-white" onClick={() => setOpenModal(true)}>
                        <Plus size={20}/><span className="text-sm">Add Delivery</span>
                    </Button>
                </div>
                <div className="mt-6 flex-grow overflow-y-auto pl-2">
                    <div className="flex flex-col gap-0 lg:gap-4 2xl:flex-row">
                    <div className="flex gap-4">
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
                    <div className="flex gap-4">
                        <div>
                            <Label htmlFor="PR">PR No.</Label>
                            <Input id="PR" type="Number" placeholder="PR No." className="w-80 focus:border-none"/>
                        </div>
                        <div>
                            <Label htmlFor="unit">Unit</Label>
                            <Input id="unit" type="Number" placeholder="Unit" className="w-40 focus:border-none"/>
                        </div>
                     </div>
                    </div>
                    <div className="flex flex-col gap-0 2xl:flex-row lg:gap-4 mt-5">
                        <div className="flex gap-4">
                        <div>
                            <Label htmlFor="Capex">Capex     No.</Label>
                            <Input id="Capex" type="Number" placeholder="Capex No." className="w-80 focus:border-none"/>
                        </div>
                        <div>
                            <Label htmlFor="desc">Description</Label>
                            <Textarea id="desc" placeholder="Description" className="w-80  focus:border-none"/>
                        </div>
                        <div>
                            <Label htmlFor="itemCode">Item Code</Label>
                            <Input id="itemCode" type="Number" placeholder="Item Code" className="w-80 focus:border-none"/>
                        </div>
                        </div>
                    <div className="flex gap-4">
                        <div>
                            <Label htmlFor="Mats">Material Code</Label>
                            <Input id="Mats" type="Number" placeholder="Material Code" className="w-80 focus:border-none"/>
                        </div>
                        <div>
                            <Label htmlFor="matType">Material Type</Label>
                            <Input id="matType" type="Text" placeholder="Material Type" className="w-60 focus:border-none"/>
                        </div>
                    </div>
                    </div>
                    <div className="flex flex-col gap-0 2xl:flex-row lg:gap-4 mt-5">
                        <div className="flex gap-4">
                        <div>
                            <Label htmlFor="remarks">Remarks</Label>
                            <Input id="remarks" type="Text" placeholder="Remarks" className="w-72 focus:border-none"/>
                        </div>
                        <div>
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input id="quantity" type="Text" placeholder="Quantity" className="w-64 focus:border-none"/>
                        </div>
                        <div>
                            <Label htmlFor="request">Requestor</Label>
                            <Input id="request" type="Text" placeholder="Requestor" className="w-96 focus:border-none"/>
                        </div>
                        </div>
                        <div className="flex gap-4">
                        <div>
                            <Label htmlFor="user">User</Label>
                            <Input id="user" type="Text" placeholder="User" className="w-96 focus:border-none"/>
                        </div>
                        </div>
                    </div>
                    <div className="flex space-x-5 mt-5">
                    <div>
                            <Label htmlFor="date">Date Entry</Label>
                            <Input id="date" type="Date" placeholder="Date" className="w-80 focus:border-none"/>
                        </div>
                        <div>
                            <Label htmlFor="warranty">End Warranty</Label>
                            <Input id="warranty" type="Date" className="w-48 focus:border-none"/>
                        </div>
                    </div>
                    <div className="flex flex-col 2xl:flex-row w-full gap-10">
                    <div className="mt-8 border border-gray-700 rounded-lg p-4 w-fit">
                        <p>Destination/Transfer to</p>
                        <div>
                            <div className="flex space-x-5 mt-5">
                                <div>
                                    <Label htmlFor="company">Company</Label>
                                    <Input id="company" type="Text" placeholder="Company" className="w-80 focus:border-none"/>
                                </div>
                                <div>
                                    <Label htmlFor="storeNo">Store Number</Label>
                                    <Input id="storeNo"  placeholder="Store Number" className="w-80 focus:border-none"/>
                                </div>
                                <div>
                                    <Label htmlFor="costCenter">Cost Center</Label>
                                    <Input id="costCenter" placeholder="Cost Center" className="w-80 focus:border-none"/>
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
                    <div className="flex justify-start lg:justify-end space-x-5 mt-4 items-end">
                        <Button className="bg-hoverCream text-fontHeading font-semibold w-32 hover:text-white">Cancel</Button>
                        <Button className="bg-hoverCream text-fontHeading font-semibold w-32 hover:text-white">Save</Button>
                    </div>
                    </div>
                    <div className="mt-4 space-y-2">
                        <div className="border-2 rounded-lg flex p-2 items-center space-x-3 ">
                            <h1 className="text-sm">Description</h1>
                            <div className="relative w-1/3">
                                <Input type="search" placeholder="Search..." className="pl-12 border-2 focus:border-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}/>
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
                                            <TableCell>{deliveries.drNumber}</TableCell>
                                            <TableCell>{deliveries.desc}</TableCell>
                                            <TableCell>{deliveries.serialNumber}</TableCell>
                                            <TableCell>{deliveries.assetNumber}</TableCell>
                                            <TableCell>{deliveries. quantity}</TableCell>
                                            <TableCell>{deliveries.unit}</TableCell>
                                            <TableCell>{deliveries.remarks}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
            <SelectMaterialModal open={openModal} onClose={() => setOpenModal(false)}/>
        </>
    );
}

export default Deliveries