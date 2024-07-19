import { IoMdClose } from "react-icons/io";
import { Input } from "@/Components/ui/input";


function AddStore() {
  return (
    <div className="bg-black bg-opacity-75 w-screen h-screen flex justify-center items-center">
      <div className="bg-white w-[30%] flex flex-col">
      <div className="flex flex-col py-4">
          <div className="flex w-full justify-between px-3 py-1">
            <p className="text-xl font-poppins font-semibold">Add Store</p>
            <IoMdClose size={25} />
          </div>
          <hr className="border-1 border-black w-[95%] mx-auto" />
        </div>
      </div>
    </div>
  );
}

export default AddStore;
