import { IoMdClose } from "react-icons/io";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

function AddSupplier2() {
  return (
    <div className="bg-black bg-opacity-75 w-screen h-screen flex justify-center items-center">
      <div className="bg-white w-[30%] rounded-lg">
        <div className="flex flex-col">
          <div className="flex w-full justify-between px-3 py-2">
            <p className="text-xl font-poppins font-semibold">Add Store</p>
            <IoMdClose size={30} />
          </div>
          <hr className="border-1 border-black w-[95%] mx-auto" />
        </div>
        <div className="flex flex-col gap-2 pt-4">
          <div className="w-[95%] mx-auto">
            <p className="text-[#697386] text-sm">Contact Person</p>
            <Input type="text" className="rounded-lg border-black" />
          </div>
          <div className="w-[95%] mx-auto flex gap-5">
            <div className="w-full">
              <p className="text-[#697386] text-sm">Mobile Number</p>
              <Input type="text" className="rounded-lg border-black" />
            </div>
            <div className="w-full">
              <p className="text-[#697386] text-sm">Business Telephone</p>
              <Input type="text" className="rounded-lg border-black" />
            </div>
          </div>
          <div className="w-[95%] mx-auto">
            <div className="w-[50%]">
              <p className="text-[#697386] text-sm">Telefax Number</p>
              <Input type="text" className="rounded-lg border-black" />
            </div>
          </div>
          <div className="w-[95%] mx-auto">
            <p className="text-[#697386] text-sm">Email Address</p>
            <Input type="text" className="rounded-lg border-black" />
          </div>
          <div className="w-[95%] mx-auto flex gap-4">
            <div className="w-full">
            <p className="text-sm text-[#697386]">Address</p>
            <textarea
              name="address"
              id=""
              className="border border-black w-full rounded-lg outline-none px-2 py-1"
            ></textarea>
            </div>
            <div className="w-full">
              <p className="text-[#697386] text-sm">City/Town</p>
              <Input type="text" className="rounded-lg border-black" />
            </div>
          </div>
          <div className="w-[95%] justify-start px-4 flex gap-5">
            <div className="w-[35%]">
              <p className="text-[#697386] text-sm">Zip Code</p>
              <Input type="text" className="rounded-lg border-black" />
            </div>
            <div className="w-[45%]">
              <p className="text-[#697386] text-sm">Province</p>
              <Input type="text" className="rounded-lg border-black" />
            </div>
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

export default AddSupplier2;
