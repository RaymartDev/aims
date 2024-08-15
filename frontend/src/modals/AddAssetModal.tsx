import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Search, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Checkbox } from "@/Components/ui/checkbox";

interface AddAssetModalProps {
    open: boolean;
    onClose: () => void;
}

const asset = [
    {id: 1, drNumber: 100231, desc: "ASUS 16GB RAM / 512GB SSD", serialNumber: "4534231", quantity: "2", unit: "OU", cost: "45,000" },
    {id: 2, drNumber: 100232, desc: "Dell 27-inch Monitor", serialNumber: "5678432", quantity: "5", unit: "EA", cost: "12,000" },
    {id: 3, drNumber: 100233, desc: "Logitech Wireless Mouse", serialNumber: "9876543", quantity: "10", unit: "EA", cost: "1,200" },
    {id: 4, drNumber: 100234, desc: "HP LaserJet Pro Printer", serialNumber: "3456712", quantity: "3", unit: "EA", cost: "15,000" },
    {id: 5, drNumber: 100235, desc: "Acer Aspire Laptop", serialNumber: "2387465", quantity: "2", unit: "EA", cost: "35,000" },
    {id: 6, drNumber: 100236, desc: "Apple MacBook Pro", serialNumber: "1239845", quantity: "1", unit: "EA", cost: "120,000" },
    {id: 7, drNumber: 100237, desc: "Samsung Galaxy Tab", serialNumber: "9987452", quantity: "4", unit: "EA", cost: "25,000" },
    {id: 8, drNumber: 100238, desc: "Sony Noise Cancelling Headphones", serialNumber: "8761234", quantity: "6", unit: "EA", cost: "8,000" },
    {id: 9, drNumber: 100239, desc: "Lenovo ThinkPad", serialNumber: "1098765", quantity: "3", unit: "EA", cost: "55,000" },
    {id: 10, drNumber: 100240, desc: "Cisco Router", serialNumber: "4532761", quantity: "4", unit: "EA", cost: "10,500" },
    {id: 11, drNumber: 100241, desc: "Seagate 2TB External Hard Drive", serialNumber: "9837624", quantity: "8", unit: "EA", cost: "7,500" },
    {id: 12, drNumber: 100242, desc: "Microsoft Surface Pro", serialNumber: "3459872", quantity: "2", unit: "EA", cost: "65,000" },
    {id: 13, drNumber: 100243, desc: "JBL Portable Speaker", serialNumber: "4512367", quantity: "7", unit: "EA", cost: "4,500" },
    {id: 14, drNumber: 100244, desc: "Canon EOS Camera", serialNumber: "7654321", quantity: "2", unit: "EA", cost: "50,000" },
    {id: 15, drNumber: 100245, desc: "Wacom Drawing Tablet", serialNumber: "5698743", quantity: "3", unit: "EA", cost: "18,000" },
];

function AddAssetModal({ open, onClose }: AddAssetModalProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const headerHeight = 72;

    const getItemsPerPage = (height: number): number => {
        const availableHeight = height - headerHeight;
        if (availableHeight < 500) return 15;
        return 15;
    };

    const [currentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage(window.innerHeight));
    const [selectedMaterials, setSelectedMaterials] = useState<number[]>([]);

    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(getItemsPerPage(window.innerHeight));
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const filteredAsset = asset.filter(asset =>
        asset.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastAsset = currentPage * itemsPerPage;
    const indexOfFirstAsset = indexOfLastAsset - itemsPerPage;
    const currentAsset = filteredAsset.slice(indexOfFirstAsset, indexOfLastAsset);

    const handleRowClick = (id: number) => {
        if (selectedMaterials.includes(id)) {
            setSelectedMaterials(selectedMaterials.filter(item => item !== id));
        } else {
            setSelectedMaterials([...selectedMaterials, id]);
        }
    };

    if (!open) return null;

    return(
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4">
            <div className="flex flex-col w-1/2 bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between w-full">
                    <h1 className="font-extrabold text-2xl">Add Asset</h1>
                    <Button className="text-black bg-transparent hover:bg-transparent p-0" onClick={onClose}><X size={30}/></Button>
                </div>
                <div className="flex flex-row items-center space-x-2 mt-5 w-3/4">
                    <h1 className="w-1/6">DR Number</h1>
                    <div className="relative w-5/6">
                        <Input type="search" placeholder="Search DR Number" className="pl-12 border-2 focus:border-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}/>
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>   
                </div>
                <div className="mt-5 overflow-y-auto" style={{ maxHeight: `calc(100vh - ${headerHeight + 270}px)` }}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead><span className="sr-only">Checkbox</span></TableHead>
                                <TableHead>DR Number</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Serial Number</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Unit</TableHead>
                                <TableHead>Cost</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentAsset.map(asset => (
                                <TableRow key={asset.id}
                                    onClick={() => handleRowClick(asset.id)}
                                    className={selectedMaterials.includes(asset.id) ? "bg-hoverCream" : "cursor-pointer"}>
                                    <TableCell><Checkbox checked={selectedMaterials.includes(asset.id)} /></TableCell>
                                    <TableCell>{asset.drNumber}</TableCell>
                                    <TableCell>{asset.desc}</TableCell>
                                    <TableCell>{asset.serialNumber}</TableCell>
                                    <TableCell>{asset.quantity}</TableCell>
                                    <TableCell>{asset.unit}</TableCell>
                                    <TableCell>{asset.cost}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex justify-end space-x-5 mt-5">
                    <Button className="w-32 bg-hoverCream text-fontHeading font-semibold hover:text-white" onClick={onClose}>Cancel</Button>
                    <Button className="w-32 bg-hoverCream text-fontHeading font-semibold hover:text-white">Add</Button>
                </div>
            </div>
        </div>
        
    );
}

export default AddAssetModal;
