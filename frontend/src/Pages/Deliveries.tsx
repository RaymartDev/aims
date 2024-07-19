import Layout from "@/Components/appLayout/Layout";
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";
import { Label } from "@/Components/ui/label"
import { Textarea } from "@/Components/ui/textarea"

function Deliveries() {
    return(
        <>
            <Layout>
                <div className="flex flex-row justify-between w-full">
                    <div>
                        <h1 className="text-2xl font-bold">Deliveries</h1>
                        <p className="text-sm font-semibold text-[#9E9E9E]">Inventory / Deliveries</p>
                    </div>
                    <Button className="bg-hoverCream text-fontHeading font-semibold"><Plus size={20}/><span className="text-sm">Add Employee</span></Button>
                </div>
                <div className="mt-6">
                    <div className="flex space-x-5">
                        <div>
                            <Label htmlFor="supplier">Supplier Name</Label>
                            <Input id="supplier" type="Text" placeholder="Supplier Name" className="w-80"/>
                        </div>
                        <div>
                            <Label htmlFor="DR">Delivery Reciept No.</Label>
                            <Input id="DR" type="Number" placeholder="Delivery Reciept No." className="w-80"/>
                        </div>
                        <div>
                            <Label htmlFor="PO">Product Order No.</Label>
                            <Input id="PO" type="Number" placeholder="Product Order No." className="w-80"/>
                        </div>
                        
                    </div>
                    <div className="flex space-x-5 mt-5">
                        <div>
                            <Label htmlFor="PR">PR No.</Label>
                            <Input id="PR" type="Number" placeholder="PR No." className="w-80"/>
                        </div>
                        <div>
                            <Label htmlFor="Capex">Delivery Reciept No.</Label>
                            <Input id="Capex" type="Number" placeholder="Capex No." className="w-80"/>
                        </div>
                        <div>
                            <Label htmlFor="date">Date Entry</Label>
                            <Input id="date" type="Date" placeholder="Date" className="w-80"/>
                        </div>
                    </div>
                    <div className="flex space-x-5 mt-5">
                        <div>
                            <Label htmlFor="desc">Description</Label>
                            <Textarea id="desc" placeholder="Description" className="w-80"/>
                        </div>
                        <div>
                            <Label htmlFor="itemCode">Item Code</Label>
                            <Input id="itemCode" type="Number" placeholder="Item Code" className="w-80"/>
                        </div>
                        <div>
                            <Label htmlFor="Mats">Material Code</Label>
                            <Input id="Mats" type="Number" placeholder="Material Code" className="w-80"/>
                        </div>
                    </div>
                    <div className="flex space-x-5 mt-5">
                        <div>
                            <Label htmlFor="unit">Unit</Label>
                            <Input id="unit" type="Number" placeholder="Unit" className="w-40"/>
                        </div>
                        <div>
                            <Label htmlFor="matType">Material Type</Label>
                            <Input id="matType" type="Text" placeholder="Material Type" className="w-60"/>
                        </div>
                        <div>
                            <Label htmlFor="remarks">Remarks</Label>
                            <Input id="remarks" type="Text" placeholder="Remarks" className="w-72"/>
                        </div>
                        <div>
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input id="quantity" type="Text" placeholder="Quantity" className="w-64"/>
                        </div>
                    </div>
                    <div className="flex space-x-5 mt-5">
                        <div>
                            <Label htmlFor="request">Requestor</Label>
                            <Input id="request" type="Text" placeholder="Requestor" className="w-96"/>
                        </div>
                        <div>
                            <Label htmlFor="user">User</Label>
                            <Input id="user" type="Text" placeholder="User" className="w-96"/>
                        </div>
                        <div>
                            <Label htmlFor="warranty">End Warranty</Label>
                            <Input id="warranty" type="Date" className="w-48"/>
                        </div>
                    </div>

                    <div className="mt-8 border border-gray-700 rounded-lg p-4">
                        <p>Destination/Transfer to</p>

                        <div>
                            <div className="flex space-x-5 mt-5">
                                <div>
                                    <Label htmlFor="company">Company</Label>
                                    <Input id="company" type="Text" placeholder="Company" className="w-80"/>
                                </div>
                                <div>
                                    <Label htmlFor="storeNo">Store Number</Label>
                                    <Input id="storeNo" type="Number" placeholder="Store Number" className="w-80"/>
                                </div>
                                <div>
                                    <Label htmlFor="costCenter">Cost Center</Label>
                                    <Input id="costCenter" type="Number" placeholder="Cost Center" className="w-80"/>
                                </div>
                            </div>
                            <div className="flex space-x-5 mt-5">
                                <div>
                                    <Label htmlFor="address">Address</Label>
                                    <Textarea id="address" placeholder="Address" className="w-96"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-5 mt-4">
                        <Button className="bg-hoverCream text-fontHeading font-semibold w-32">Cancel</Button>
                        <Button className="bg-hoverCream text-fontHeading font-semibold w-32">Save</Button>
                    </div>
                    
                </div>
            </Layout>
        </>
    );
}

export default Deliveries