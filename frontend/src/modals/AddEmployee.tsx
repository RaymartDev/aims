import { IoMdClose } from "react-icons/io";
import { Input } from "@/Components/ui/input";

function AddEmployee() {
  return (
    <div className="w-screen h-screen bg-black bg-opacity-75 flex justify-center items-center">
      <div className="bg-white w-[30%] flex flex-col">
        <div className="flex flex-col py-4">
          <div className="flex w-full justify-between px-3 py-1">
            <p className="text-xl font-poppins font-semibold">Add Employeee</p>
            <IoMdClose size={25} />
          </div>
          <hr className="border-1 border-black w-[95%] mx-auto" />
        </div>
        <div className="w-full mt-4 flex flex-col gap-4">
          <div className="flex justify-around">
            <span className="flex flex-col w-[45%]">
              <p className="text-sm text-[#697386]">First Name</p>
              <Input
                type="text"
                className=" w-full border border-black rounded-xl"
              />
            </span>
            <span className="w-[45%]">
              <p className="text-sm text-[#697386]">Last Name</p>
              <Input
                type="text"
                className=" w-full border border-black rounded-xl"
              />
            </span>
          </div>
          <div className="flex justify-around">
            <span className="flex flex-col w-[45%]">
              <p className="text-sm text-[#697386]">Employee Number</p>
              <Input
                type="text"
                className=" w-full border border-black rounded-xl"
              />
            </span>
            <span className="w-[45%]">
              <p className="text-sm text-[#697386]">Cost Center Code</p>
              <Input
                type="text"
                className=" w-full border border-black rounded-xl"
              />
            </span>
          </div>
          <div className="w-[95%] mx-auto">
            <p className="text-[#697386] text-sm">Company</p>
            <Input type="companyName" className="rounded-lg border-black" />
          </div>
          <div className="flex justify-around">
            <span className="flex flex-col w-[45%]">
              <p className="text-sm text-[#697386]">Department</p>
              <Input
                type="text"
                className=" w-full border border-black rounded-xl"
              />
            </span>
            <span className="w-[45%]">
              <p className="text-sm text-[#697386]">Division</p>
              <Input
                type="text"
                className=" w-full border border-black rounded-xl"
              />
            </span>
          </div>
          <div className="w-[45%] pl-4">
            <span>
                <p className="text-sm text-[#697386]">Date Entry</p>
            <Input type="date" className="border-black rounded-lg"/>
            </span>
          </div>
        </div>
        <div className="flex justify-end gap-4 pt-4 pb-4 px-4">
            <button className="border-black border px-4 font-semibold py-1 bg-[#FCE3C5] rounded-lg">Cancel</button>
            <button className="border-black border px-4 font-semibold py-1 bg-[#FCE3C5] rounded-lg">Save</button>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
