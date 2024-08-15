import { useEffect, useState } from "react";
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button";
import { Plus, Search } from "lucide-react";
import { Label } from "@/Components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import SelectMaterialModal from "@/modals/SelectMaterialModal";
import DestinationModal from "@/modals/DestinationModal";

const deliveries = [
    { id: 1, delivery: "1000", desc: "HP Probook 8GB RAM / 512GB SSD", serialNumber: "503604218", assetNumber: "503604220", quantity: "1", unit: "OU", remarks: "OU KFC - BACLARAN" },
    { id: 2, delivery: "1001", desc: "ASUS Predator 8GB RAM / 512GB SSD", serialNumber: "503604219", assetNumber: "503604221", quantity: "25", unit: "BILLING", remarks: "BILLING KFC - MAKATI" },
    { id: 3, delivery: "1002", desc: "HP Probook 8GB RAM / 512GB SSD", serialNumber: "503604220", assetNumber: "503604222", quantity: "10", unit: "DEMO", remarks: "DEMO KFC - QUEZON CITY" },
    { id: 4, delivery: "1003", desc: "ASUS Predator 8GB RAM / 512GB SSD", serialNumber: "503604221", assetNumber: "503604223", quantity: "5", unit: "OU", remarks: "OU KFC - BACLARAN" },
    { id: 5, delivery: "1004", desc: "HP Probook 8GB RAM / 512GB SSD", serialNumber: "503604222", assetNumber: "503604224", quantity: "15", unit: "BILLING", remarks: "BILLING KFC - MAKATI" },
    { id: 6, delivery: "1005", desc: "ASUS Predator 8GB RAM / 512GB SSD", serialNumber: "503604223", assetNumber: "503604225", quantity: "20", unit: "DEMO", remarks: "DEMO KFC - QUEZON CITY" },
    { id: 7, delivery: "1006", desc: "HP Probook 8GB RAM / 512GB SSD", serialNumber: "503604224", assetNumber: "503604226", quantity: "30", unit: "OU", remarks: "OU KFC - BACLARAN" },
    { id: 8, delivery: "1007", desc: "ASUS Predator 8GB RAM / 512GB SSD", serialNumber: "503604225", assetNumber: "503604227", quantity: "50", unit: "BILLING", remarks: "BILLING KFC - MAKATI" },
    { id: 9, delivery: "1008", desc: "HP Probook 8GB RAM / 512GB SSD", serialNumber: "503604226", assetNumber: "503604228", quantity: "8", unit: "DEMO", remarks: "DEMO KFC - QUEZON CITY" },
    { id: 10, delivery: "1009", desc: "ASUS Predator 8GB RAM / 512GB SSD", serialNumber: "503604227", assetNumber: "503604229", quantity: "12", unit: "OU", remarks: "OU KFC - BACLARAN" },
    { id: 11, delivery: "1010", desc: "HP Probook 8GB RAM / 512GB SSD", serialNumber: "503604228", assetNumber: "503604230", quantity: "6", unit: "BILLING", remarks: "BILLING KFC - MAKATI" },
    { id: 12, delivery: "1011", desc: "ASUS Predator 8GB RAM / 512GB SSD", serialNumber: "503604229", assetNumber: "503604231", quantity: "3", unit: "DEMO", remarks: "DEMO KFC - QUEZON CITY" },
    { id: 13, delivery: "1012", desc: "HP Probook 8GB RAM / 512GB SSD", serialNumber: "503604230", assetNumber: "503604232", quantity: "9", unit: "OU", remarks: "OU KFC - BACLARAN" },
    { id: 14, delivery: "1013", desc: "ASUS Predator 8GB RAM / 512GB SSD", serialNumber: "503604231", assetNumber: "503604233", quantity: "22", unit: "BILLING", remarks: "BILLING KFC - MAKATI" },
    { id: 15, delivery: "1014", desc: "HP Probook 8GB RAM / 512GB SSD", serialNumber: "503604232", assetNumber: "503604234", quantity: "14", unit: "DEMO", remarks: "DEMO KFC - QUEZON CITY" },
    { id: 16, delivery: "1015", desc: "ASUS Predator 8GB RAM / 512GB SSD", serialNumber: "503604233", assetNumber: "503604235", quantity: "7", unit: "OU", remarks: "OU KFC - BACLARAN" },
    { id: 17, delivery: "1016", desc: "HP Probook 8GB RAM / 512GB SSD", serialNumber: "503604234", assetNumber: "503604236", quantity: "28", unit: "BILLING", remarks: "BILLING KFC - MAKATI" },
    { id: 18, delivery: "1017", desc: "ASUS Predator 8GB RAM / 512GB SSD", serialNumber: "503604235", assetNumber: "503604237", quantity: "19", unit: "DEMO", remarks: "DEMO KFC - QUEZON CITY" },
    { id: 19, delivery: "1018", desc: "HP Probook 8GB RAM / 512GB SSD", serialNumber: "503604236", assetNumber: "503604238", quantity: "11", unit: "OU", remarks: "OU KFC - BACLARAN" },
    { id: 20, delivery: "1019", desc: "ASUS Predator 8GB RAM / 512GB SSD", serialNumber: "503604237", assetNumber: "503604239", quantity: "24", unit: "BILLING", remarks: "BILLING KFC - MAKATI" },
    { id: 21, delivery: "1020", desc: "HP Probook 8GB RAM / 512GB SSD", serialNumber: "503604238", assetNumber: "503604240", quantity: "18", unit: "DEMO", remarks: "DEMO KFC - QUEZON CITY" },
    { id: 22, delivery: "1021", desc: "ASUS Predator 8GB RAM / 512GB SSD", serialNumber: "503604239", assetNumber: "503604241", quantity: "35", unit: "OU", remarks: "OU KFC - BACLARAN" },
    { id: 23, delivery: "1022", desc: "HP Probook 8GB RAM / 512GB SSD", serialNumber: "503604240", assetNumber: "503604242", quantity: "45", unit: "BILLING", remarks: "BILLING KFC - MAKATI" },
    { id: 24, delivery: "1023", desc: "ASUS Predator 8GB RAM / 512GB SSD", serialNumber: "503604241", assetNumber: "503604243", quantity: "50", unit: "DEMO", remarks: "DEMO KFC - QUEZON CITY" },
    { id: 25, delivery: "1024", desc: "HP Probook 8GB RAM / 512GB SSD", serialNumber: "503604242", assetNumber: "503604244", quantity: "13", unit: "OU", remarks: "OU KFC - BACLARAN" },
    { id: 26, delivery: "1025", desc: "ASUS Predator 8GB RAM / 512GB SSD", serialNumber: "503604243", assetNumber: "503604245", quantity: "17", unit: "BILLING", remarks: "BILLING KFC - MAKATI" },
];


function Deliveries() {
    const [openModal, setOpenModal] = useState(false);
    const [openNextModal, setOpenNextModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

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

    const filteredDeliveries = deliveries.filter(deliveries =>
        deliveries.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastDeliveries = currentPage * itemsPerPage;
    const indexOfFirstDeliveries = indexOfLastDeliveries - itemsPerPage;
    const currentDeliveries= filteredDeliveries.slice(indexOfFirstDeliveries, indexOfLastDeliveries);

    const handleNextModal = () => {
        setOpenModal(false);
        setOpenNextModal(true);
    };

    const handleBack = () => {
        setOpenNextModal(false);
        setOpenModal(true);
    };


    return(
        <>
            <div className="flex flex-col h-full">
                <div className="flex flex-row justify-between w-full">
                    <div>
                        <h1 className="text-2xl font-bold">Deliveries</h1>
                        <p className="text-sm font-semibold text-[#9E9E9E]">Warehouse / Deliveries</p>
                    </div>
                    <div className="flex items-end">
                        <Button className="bg-hoverCream text-fontHeading hover:text-white font-semibold" onClick={() => setOpenModal(true)}>
                            <Plus size={20}/><span className="text-sm">Add Delivery</span>
                        </Button>
                    </div>
                </div>
                <div className="mt-6 flex-grow overflow-y-auto pl-2">
                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 mb-10">
                        <div>
                            <Label htmlFor="supplier">Supplier Name</Label>
                            <Input id="supplier" type="Text" className=" focus:border-none"/>
                        </div>
                        <div>
                            <Label htmlFor="DR">Delivery Receipt No.</Label>
                            <Input id="DR" className=" focus:border-none"/>
                        </div>
                        <div>
                            <Label htmlFor="PO">Product Order No.</Label>
                            <Input id="PO" type="Number" className=" focus:border-none"/>
                        </div>
                        <div>
                            <Label htmlFor="PR">PR No.</Label>
                            <Input id="PR" type="Number"  className=" focus:border-none"/>
                        </div>
                        <div>
                            <Label htmlFor="unit">Unit</Label>
                            <Input id="unit" type="Number" className=" focus:border-none"/>
                        </div>
                        <div>
                            <Label htmlFor="Capex">Capex No.</Label>
                            <Input id="Capex" type="Number" className=" focus:border-none"/>
                        </div>
                        <div>
                            <Label htmlFor="date">Date Entry</Label>
                            <Input id="date" type="Date" className=" focus:border-none"/>
                        </div>
                        <div>
                            <Label htmlFor="warranty">End Warranty</Label>
                            <Input id="warranty" type="Date" className=" focus:border-none"/>
                        </div>
                    </div>
                    <div className="mt-4 space-y-2">
                        <div className="border-2 rounded-lg flex p-2 items-center space-x-3 ">
                            <h1 className="text-sm">Description</h1>
                            <div className="relative w-1/3">
                                <Input type="search" placeholder="Search Description" className="pl-12 border-2 focus:border-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}/>
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>   
                        </div>
                        <div className="border-2 rounded-lg">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Delivery Number</TableHead>
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
                                        <TableRow className="h-8" key={deliveries.id}>
                                            <TableCell>{deliveries.delivery}</TableCell>
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
            <SelectMaterialModal open={openModal} onClose={() => setOpenModal(false)} onNext={handleNextModal}/>
            <DestinationModal open={openNextModal} onClose={() => setOpenNextModal(false)} onBack={handleBack}/>
        </>
    );
}

export default Deliveries