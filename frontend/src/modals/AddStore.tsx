import { IoMdClose } from "react-icons/io";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

function AddStore() {
  return (
    <div className="bg-black bg-opacity-75 w-screen h-screen flex justify-center items-center">
      <div className="bg-white w-[30%] flex flex-col px-2 rounded-lg shadow-lg">
        <div className="flex flex-col">
          <div className="flex w-full justify-between px-3 py-2">
            <p className="text-xl font-poppins font-semibold">Add Store</p>
            <IoMdClose size={30} />
          </div>
          <hr className="border-1 border-black w-[95%] mx-auto" />
        </div>
        <div className="flex flex-col gap-4 py-4">
          <div className="w-[95%] mx-auto">
            <p className="text-[#697386] text-sm">Company</p>
            <Input type="text" className="rounded-lg border-black" />
          </div>
          <div className="w-[95%] mx-auto">
            <p className="text-[#697386] text-sm">Store Name</p>
            <Input type="text" className="rounded-lg border-black" />
          </div>
          <div className="w-[95%] mx-auto">
            <p className="text-[#697386] text-sm">Cost Center Code</p>
            <Input type="text" className="rounded-lg border-black" />
          </div>
          <div className="w-[95%] mx-auto">
            <p className="text-[#697386] text-sm">Address</p>
            <Input type="text" className="rounded-lg border-black" />
          </div>
          <div className="flex justify-end gap-4 pt-4 pb-4 px-4">
            <Button className="bg-hoverCream font-semibold text-fontHeading">
              Cancel
            </Button>
            <Button className="bg-hoverCream font-semibold text-fontHeading">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStore;
