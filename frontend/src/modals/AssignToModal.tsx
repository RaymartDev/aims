
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"


const AssignToModal = () => {

    if (!open) return null;

    return (
        <div className="mt-8 border border-gray-700 rounded-lg p-4 w-fit">
                        <div className="flex flex-row  space-x-5">
                            <p>Destination/Transfer to</p>
                            <div className="flex ">
                                <RadioGroup defaultValue="employee" className="flex flex-row">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="employee" id="employee"/>
                                        <Label htmlFor="employee">Employee</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="store" id="store"/>
                                        <Label htmlFor="store">Store</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex space-x-5 mt-5">
                                <div>
                                    <Label htmlFor="costCenter">Cost Center</Label>
                                    <Input id="costCenter" placeholder="Cost Center" className="w-80 focus:border-none"/>
                                </div>
                                <div>
                                    <Label htmlFor="storeNo">Store Name</Label>
                                    <Input id="storeName" disabled className="w-80 focus:border-none"/>
                                </div>
                                <div>
                                    <Label htmlFor="company">Company</Label>
                                    <Input id="company" disabled className="w-80 focus:border-none"/>
                                </div>
                            </div>
                            <div className="flex space-x-5 mt-5">
                                <div>
                                    <Label htmlFor="request">Requestor Name</Label>
                                    <Input id="request" type="Text" className="w-96 focus:border-none"/>
                                </div>
                                <div>
                                    <Label htmlFor="user">Username</Label>
                                    <Input id="user" type="Text" className="w-96 focus:border-none"/>
                                </div>
                            </div>
                            
                        </div>
                    </div>
    )
}

export default AssignToModal