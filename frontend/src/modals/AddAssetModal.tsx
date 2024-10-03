import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Checkbox } from "@/Components/ui/checkbox";

interface AddAssetModalProps {
    open: boolean;
    onClose: () => void;
}

const asset = [
    { id: 1, itemNumber: 100231, desc: "ASUS 16GB RAM / 512GB SSD", serialNumber: "4534231", quantity: "2", unit: "OU", cost: "45,000" },
    { id: 2, itemNumber: 100232, desc: "Dell XPS 13 8GB RAM / 256GB SSD", serialNumber: "6532342", quantity: "3", unit: "OU", cost: "35,000" },
    { id: 3, itemNumber: 100233, desc: "HP Envy 13 16GB RAM / 1TB SSD", serialNumber: "8534453", quantity: "1", unit: "OU", cost: "55,000" },
    { id: 4, itemNumber: 100234, desc: "MacBook Pro 14 16GB RAM / 512GB SSD", serialNumber: "9545564", quantity: "2", unit: "OU", cost: "120,000" },
    { id: 5, itemNumber: 100235, desc: "Lenovo ThinkPad X1 Carbon 8GB RAM / 256GB SSD", serialNumber: "1134543", quantity: "5", unit: "OU", cost: "60,000" },
    { id: 6, itemNumber: 100236, desc: "Acer Aspire 7 8GB RAM / 1TB HDD", serialNumber: "2233456", quantity: "4", unit: "OU", cost: "25,000" },
    { id: 7, itemNumber: 100237, desc: "Surface Laptop 3 16GB RAM / 512GB SSD", serialNumber: "3332567", quantity: "2", unit: "OU", cost: "85,000" },
    { id: 8, itemNumber: 100238, desc: "Alienware M15 32GB RAM / 1TB SSD", serialNumber: "4442678", quantity: "1", unit: "OU", cost: "150,000" },
    { id: 9, itemNumber: 100239, desc: "MSI Gaming Laptop 16GB RAM / 512GB SSD", serialNumber: "5552789", quantity: "3", unit: "OU", cost: "80,000" },
    { id: 10, itemNumber: 100240, desc: "Apple iMac 27-inch 16GB RAM / 1TB SSD", serialNumber: "6662890", quantity: "1", unit: "OU", cost: "140,000" },
    { id: 11, itemNumber: 100241, desc: "HP Pavilion 15 8GB RAM / 512GB SSD", serialNumber: "7772901", quantity: "4", unit: "OU", cost: "50,000" },
    { id: 12, itemNumber: 100242, desc: "Dell Inspiron 14 8GB RAM / 256GB SSD", serialNumber: "8883012", quantity: "3", unit: "OU", cost: "40,000" },
    { id: 13, itemNumber: 100243, desc: "Lenovo Yoga C940 16GB RAM / 1TB SSD", serialNumber: "9993123", quantity: "2", unit: "OU", cost: "90,000" },
    { id: 14, itemNumber: 100244, desc: "Asus ROG Zephyrus G14 16GB RAM / 512GB SSD", serialNumber: "1113234", quantity: "3", unit: "OU", cost: "110,000" },
    { id: 15, itemNumber: 100245, desc: "Microsoft Surface Pro 7 8GB RAM / 128GB SSD", serialNumber: "2223345", quantity: "5", unit: "OU", cost: "70,000" },
];


function AddAssetModal({ open, onClose }: AddAssetModalProps) {
    const headerHeight = 72;

    const getItemsPerPage = (height: number): number => {
        const availableHeight = height - headerHeight;
        if (availableHeight < 500) return 15;
        return 15;
    };

    const [currentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage(window.innerHeight));
    const [selectedMaterials, setSelectedMaterials] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(getItemsPerPage(window.innerHeight));
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const indexOfLastAsset = currentPage * itemsPerPage;
    const indexOfFirstAsset = indexOfLastAsset - itemsPerPage;
    const currentAsset = asset.slice(indexOfFirstAsset, indexOfLastAsset);

    const handleRowClick = (id: number) => {
        if (selectedMaterials.includes(id)) {
            setSelectedMaterials(selectedMaterials.filter(item => item !== id));
        } else {
            setSelectedMaterials([...selectedMaterials, id]);
        }
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedMaterials([]);
        } else {
            setSelectedMaterials(currentAsset.map(item => item.id));
        }
        setSelectAll(!selectAll);
    };

    if (!open) return null;

    return(
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-20 p-4">
            <div className="flex flex-col w-1/2 bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between w-full">
                    <h1 className="font-extrabold text-2xl">Add Asset</h1>
                    <Button className="text-black bg-transparent hover:bg-transparent p-0" onClick={onClose}><X size={30}/></Button>
                </div>
                <div className="flex justify-between mt-5 ">
                    <div className="flex flex-row items-center w-3/4">
                        <h1 className="w-1/6">DR Number</h1>
                        <h1 className="border px-3 py-2 rounded-lg bg w-2/6">100231</h1>
                    </div>
                    <div className="flex items-center">
                        <Button className="bg-hoverCream text-fontHeading font-semibold hover:text-white" onClick={handleSelectAll}>
                            <span>{selectAll ? "Unselect All" : "Select All"}</span>
                        </Button>
                    </div>
                </div>
                <div className="mt-5 overflow-y-auto" style={{ maxHeight: `calc(100vh - ${headerHeight + 270}px)` }}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead><span className="sr-only">Checkbox</span></TableHead>
                                <TableHead>Item Number</TableHead>
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
                                    <TableCell>{asset.itemNumber}</TableCell>
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
