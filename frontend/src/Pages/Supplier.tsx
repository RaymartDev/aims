import Layout from "@/Components/appLayout/Layout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Plus, Search } from "lucide-react";

function Supplier() {
    return(
        <Layout>
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold">Supplier</h1>
                <p className="text-sm font-semibold text-[#9E9E9E]">Users / Supplier</p>
            </div>
            <div className="flex justify-center mt-10">
                <div className="flex flex-row justify-between w-full">
                    <div className="w-fit flex items-center justify-start ">
                        <h1 className=" text-fontHeading font-bold">All Supplier</h1>
                    </div>
                    <div className="flex flex-row w-6/12 space-x-2">
                        <div className="relative w-10/12">
                            <Input type="search" placeholder="Search..." className="pl-12 border-2"/>
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>   
                        <Button className="bg-hoverCream text-fontHeading border">
                            <Plus size={20}/><span className="text-sm">Add Supplier</span>
                        </Button>
                    </div>    
                </div>
            </div>
        </Layout>
    );
}

export default Supplier